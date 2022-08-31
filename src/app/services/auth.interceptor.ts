import { LoginService } from './login.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    constructor(private login: LoginService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add the Jwt token (Local Storage)
        let authRequest = req;
        const token = this.login.getToken();
        if(token!=null)
        {
            authRequest = authRequest.clone({setHeaders: {Authorization:`Bearer ${token}`},})
        }
        return next.handle(authRequest);
    }
}

export const AuthInterceptorProviders = [
    {
        provide:HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    }
]