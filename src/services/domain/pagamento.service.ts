import { Injectable } from "@angular/core";
import { Carrinho } from "../../models/carrinho";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.dev";

@Injectable()
export class PagamentoService {
    constructor(public http : HttpClient){
    }

    insert(carrinho: Carrinho){
        return this.http.post(`${environment.BASE_URL}/pedidos/add`, carrinho)
    }
}