import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { Carrinho } from "../models/carrinho";

@Injectable()
export class StorageService {
    

    getLocalUser() : LocalUser{
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if(usr == null){
            return null;
        }else{
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj : LocalUser)  {
        if(obj==null){
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }else{
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }
    
    getLocalCart() : Carrinho{
        let usr = localStorage.getItem(STORAGE_KEYS.carrinho);
        if(usr == null){
            return null;
        }else{
            return JSON.parse(usr);
        }
    }
    
    setLocalCart(obj : Carrinho)  {
        if(obj == null){
            localStorage.removeItem(STORAGE_KEYS.carrinho);
        }else{
            localStorage.setItem(STORAGE_KEYS.carrinho, JSON.stringify(obj));
        }
    }
}