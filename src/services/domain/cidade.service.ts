import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CidadeDTO } from "../../models/cidade.dto";
import { Observable } from "rxjs/Rx";
import { environment } from "../../environments/environment";

@Injectable()
export class CidadeService {

    constructor(public http: HttpClient) {
    }
    
    findAll(estado_id : string) : Observable<CidadeDTO[]> {
        return this.http.get<CidadeDTO[]>(`${environment.BASE_URL}/estados/${estado_id}/cidades`);
    }
}