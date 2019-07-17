import { Injectable } from "@angular/core";
import { Carrinho } from "../../models/carrinho";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { PedidoDTO } from "../../models/pedido.dto";
import { Observable } from "rxjs";

@Injectable()
export class PedidoService {
    constructor(public http : HttpClient){
    }

    insert(carrinho: Carrinho){
        return this.http.post(`${environment.BASE_URL}/pedidos/add`, carrinho)
    }

    findByCliente(cliente_id: string): Observable<PedidoDTO[]>{
        return this.http.get<PedidoDTO[]>(`${environment.BASE_URL}/pedidos/cliente/${cliente_id}`)
    }

    findById(pedido_id: string): Observable<PedidoDTO>{
        return this.http.get<PedidoDTO>(`${environment.BASE_URL}/pedidos/${pedido_id}`)
    }
}