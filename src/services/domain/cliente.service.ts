import { HttpClient } from "@angular/common/http";
import { ClienteDTO } from "../../models/cliente.dto";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";
import { environment } from "../../environments/environment";
import { API_CONFIG } from "../../config/api.config";
import { ImageUtilService } from "../image-util.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ClienteService{
    constructor(
        public http : HttpClient,
        public storage: StorageService,
        public imageUtilService : ImageUtilService){
    }

    findByUser(user: string) : Observable<ClienteDTO>{
        return this.http.get<ClienteDTO>(`${environment.BASE_URL}/cliente/findbyuser?value=${user}`);
    }

    findAll() : Observable<ClienteDTO[]>{
        return this.http.get<ClienteDTO[]>(`${environment.BASE_URL}/cliente/list`);
    }
    
  getImageFromBucket(id:string) : Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/clientes/cp${id}.jpg`
    return this.http.get(url, {responseType:'blob'});
  }


  insert(obj : ClienteDTO){
   return this.http.post(
    `${environment.BASE_URL}/cliente/add`,
    obj,
    {
        observe: 'response',
        responseType: 'text'
    }
   )
  }

  uploadPicture(picture) {
    let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
    let formData : FormData = new FormData();
    formData.set('file', pictureBlob, 'file.png');
    return this.http.post(
        `${environment.BASE_URL}/clientes/picture`, 
        formData,
        { 
            observe: 'response', 
            responseType: 'text'
        }
    ); 
}

}