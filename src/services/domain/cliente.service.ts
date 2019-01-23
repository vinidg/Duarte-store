import {Injectable} from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ClienteDTO } from "../../models/cliente.dto";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService{
    constructor(
        public http : HttpClient,
        public storage: StorageService){
    }

    findByUser(user: string) : Observable<ClienteDTO>{
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization':'Bearer '+token});


        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrlBoot}/cliente/findbyuser?value=${user}`,
        {'headers':authHeader});
    }

    findAll() : Observable<ClienteDTO[]>{
        return this.http.get<ClienteDTO[]>(`${API_CONFIG.baseUrl}/cliente/list`);
    }
}