import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from "angular2-jwt";
import { environment } from "../environments/environment";
import { CarrinhoService } from "./domain/carrinho.service";

@Injectable()
export class AuthService{

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(public http: HttpClient, 
        public carrinhoService: CarrinhoService,
        public storage: StorageService){
    }
    authenticate(creds: CredenciaisDTO){
        return this.http.post(
        `${environment.BASE_URL}/login`,
        creds,
        {
            observe:'response',
            responseType: 'text'
        });
    }

    refreshToken(){
        return this.http.post(
        `${environment.BASE_URL}/auth/refresh_token`,
        {},
        {
            observe:'response',
            responseType: 'text'
        });
    }

    successfulLogin(authorizationValue : string){
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user)
        this.carrinhoService.criarCarrinhoApagar()
    }

    logout(){
        this.storage.setLocalUser(null);
    }
}