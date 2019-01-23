import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ClienteDTO } from "../../models/cliente.dto";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class ClienteService{
    constructor(public http : HttpClient){

    }
    findAll() : Observable<ClienteDTO[]>{
        return this.http.get<ClienteDTO[]>(`${API_CONFIG.baseUrl}/service/cliente/list`);
    }
}