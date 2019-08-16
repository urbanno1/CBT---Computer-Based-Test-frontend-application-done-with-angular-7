import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private route: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        
        if(req.headers.get('No-Auth') == "True")
        {
            return next.handle(req.clone());
        }
        
        if(localStorage.getItem('token') != null)
        {
            const clonedRequest = req.clone({
                headers: req.headers.set("Authorization", "Bearer "+localStorage.getItem('token'))
            });

            return next.handle(clonedRequest).pipe(
                tap(event => {
                  if (event instanceof HttpResponse) {
                  }
                },
                error =>{
                    if(error.status == 401)
                    this.route.navigateByUrl('/login-dashboard');
                    if(error.status == 403)
                    this.route.navigateByUrl('/forbidden');
                })
              );
        }
        else
       {
        this.route.navigateByUrl('/login-dashboard');
       }
    }

    getToken(){
        return localStorage.getItem('token');
    }
}
