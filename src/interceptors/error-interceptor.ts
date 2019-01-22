import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS
} from '@angular/common/http';

import { Observable } from 'rxjs/Rx';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

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
        return Observable.throw(error);
    }) as any;
  }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};