import { HttpClient } from "@angular/common/http";
import { ProdutoDTO } from "../../models/produto.dto";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { ImageUtilService } from "../image-util.service";
import { API_CONFIG } from "../../config/api.config";
import { Injectable } from "@angular/core";

@Injectable()
export class ProdutoService {
    constructor(public http : HttpClient,
        public imageUtilService : ImageUtilService){
    }

    findById(produto_id: string) : Observable<ProdutoDTO> {
        return this.http.get<ProdutoDTO>(`${environment.BASE_URL}/produtos/${produto_id}`)
    }
    
    findByCategorias(categoria_id: string, page: number = 0, linesPerPage: number = 24): Observable<ProdutoDTO[]> {
        return this.http.get<ProdutoDTO[]>(`${environment.BASE_URL}/produtos/list?categorias=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`)
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/produtos/pr${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
      } 

    getSmallImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/produtos/pr${id}-small.jpg`
        return this.http.get(url, {responseType : 'blob'});
      } 

    uploadPicture(picture, produto_id: string) {
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData : FormData = new FormData();
        formData.set('file', pictureBlob, 'file.jpg');
        return this.http.put(
            `${environment.BASE_URL}/produtos/picture/${produto_id}`, 
            formData,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
}