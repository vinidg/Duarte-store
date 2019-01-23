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
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrlBoot}/cliente/findbyuser?value=${user}`);
    }

    findAll() : Observable<ClienteDTO[]>{
        return this.http.get<ClienteDTO[]>(`${API_CONFIG.baseUrl}/cliente/list`);
    }
    
  getImageFromBucket(id:string) : Observable<any> {
    let url = 'http://naosei.com';
    return this.http.get(url, {responseType:'blob'});
  }
}