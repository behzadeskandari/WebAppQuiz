import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private router: Router) { }

  //getter Function
  get isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  ///Setter Function
  set isValidated(value: any) {

  }

  register(credentials: any) {
    this.http.post<any>(`https://localhost:44364/api/account`, credentials).subscribe(res => {

      this.authenticate(res);

    });
  }

  login(credentials: any) {
    this.http.post<any>(`https://localhost:44364/api/account/login`, credentials).subscribe(res => {

      this.authenticate(res);

    });

  }

  authenticate(res : any) {

    localStorage.setItem('token', res)

    this.router.navigate(['/'])

  }

  logout() {
    localStorage.removeItem('token');

  }

}

