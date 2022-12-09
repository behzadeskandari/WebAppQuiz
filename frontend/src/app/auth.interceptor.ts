import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: any, next: any) {
    var token = localStorage.getItem('token');


    var authRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    })
    console.log(req);
    return next.handle(authRequest);

  }


}
