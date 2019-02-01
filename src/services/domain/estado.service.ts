import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EstadoDTO } from "../../models/estado.dto";
import { Observable } from "rxjs/Rx";
import { environment } from "../../environments/environment";

@Injectable()
export class EstadoService {

    constructor(public http: HttpClient) {
    }
    
    findAll() : Observable<EstadoDTO[]> {
        return this.http.get<EstadoDTO[]>(`${environment.BASE_URL}/estados`);
    }
}