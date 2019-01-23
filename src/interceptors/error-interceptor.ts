import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../services/storage.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage : StorageService){
    }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .catch((error,caught) => {
        let errorObj = error;
        console.log(errorObj);
        if(errorObj.error){
            errorObj = errorObj.error;
        }
        if(!errorObj.status){
            errorObj = JSON.parse(errorObj);
        }

        console.log("Erro encontrado pelo interceptor: ");
        console.log(errorObj);

        switch(errorObj.status){
            case 403:
            this.handle403();
            break;
        }

        return Observable.throw(error);
    }) as any;
  }
  handle403(){
      this.storage.setLocalUser(null);
  }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};