import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EstadoDTO } from "../../models/estado.dto";
import { environment } from "../../environments/environment";
import { CidadeDTO } from "../../models/cidade.dto";
import { EnderecoDTO } from "../../models/endereco.dto";

@Injectable()
export class EnderecoService {
    
    constructor(public http: HttpClient) {
    }
    
    findAllEstados() : Observable<EstadoDTO[]> {
        return this.http.get<EstadoDTO[]>(`${environment.BASE_URL}/estados`);
    }

    findAllCidades(estado_id : string) : Observable<CidadeDTO[]> {
        return this.http.get<CidadeDTO[]>(`${environment.BASE_URL}/estados/${estado_id}/cidades`);
    }

    findEnderecosCliente(cliente_id: string) : Observable<EnderecoDTO[]> {
        return this.http.get<EnderecoDTO[]>(`${environment.BASE_URL}/enderecos/cliente/${cliente_id}`);
    }
}