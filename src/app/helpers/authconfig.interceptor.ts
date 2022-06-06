import { HttpInterceptor , HttpRequest , HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RootService } from "../services/root-service/root.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    constructor(
        private auth:RootService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {   
        req = req.clone({
            setHeaders:
            {
                Authorization: `Bearer ${this.auth.getToken()}`
            }
        })

        return next.handle(req)
    }
}