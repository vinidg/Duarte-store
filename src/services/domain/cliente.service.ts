import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ClienteDTO } from "../../models/cliente.dto";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../storage.service";
import { environment } from "../../environments/environment";

@Injectable()
export class ClienteService{
    constructor(
        public http : HttpClient,
        public storage: StorageService){
    }

    findByUser(user: string) : Observable<ClienteDTO>{
        return this.http.get<ClienteDTO>(`${environment.BASE_URL}/cliente/findbyuser?value=${user}`);
    }

    findAll() : Observable<ClienteDTO[]>{
        return this.http.get<ClienteDTO[]>(`${environment.BASE_URL}/cliente/list`);
    }
    
  getImageFromBucket(id:string) : Observable<any> {
    let url = 'https://images.unsplash.com/photo-1533736970669-7edc3f971be1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80';
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

}