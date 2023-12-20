import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserRegisterVM } from '../ViewModels/UserRegister';
import { retry, tap } from 'rxjs';
import { UserLoginVM } from '../ViewModels/UserLogin';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getOptions() {

    let options = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        // "Content-Type": "application/json",
        //"Cache-Control": "max-age=3600",
        // "Access-Control-Allow-Origin": "http://localhost:4200",
        //"ETag": "123456",
        //"Location": "https://example.com/new-resource",
        //"X-Content-Type-getOptions()": "nosniff",
        //"X-Frame-getOptions()": "DENY",
        //"Strict-Transport-Security": "max-age=31536000; includeSubDomains",
        //"X-Powered-By": "ASP.NET Core"
      })
    }
    return options;
  }

  handleErrors(err: HttpErrorResponse) {
    switch (err.status) {
      case 400:
        alert(err.error[0]["description"])
        break;
      case 500:
        alert("internal server error");
        break;
      default:
        break;
    }
    console.log(err)
  }

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  register(user: UserRegisterVM) {
    return this.httpClient.post(`${environment.baseUrl}/api/account/register`, user, this.getOptions())
      .pipe(
      );
  }

  loginUser(user: UserLoginVM) {
    return this.httpClient.post(`${environment.baseUrl}/api/account/login`, user, this.getOptions()).pipe(
      tap((response: any) => {
        if (response?.token) {
          // Save the token to local storage
          localStorage.setItem("token", response.token);
          localStorage.setItem("expiresOn", response.expiresOn);
        }
      }),
    );
  }

  logout() {
    return this.httpClient.post(`${environment.baseUrl}/api/account/logout`, {}, this.getOptions()).pipe(
      tap({
        next: (res: any) => {
          console.log(res);
          if (res?.message == "Logout successful") {
            localStorage.setItem("token", "");
            localStorage.setItem("expiresOn", "");
            this.router.navigateByUrl("/home");
          }
        }
      }),
    );
  }

  isLoggedIn(): boolean {
    let expiresOn = localStorage.getItem("expiresOn") ?? "";
    let expiresOnConverted = new Date(expiresOn);
    let isExpired = expiresOnConverted < new Date();
    return !!(localStorage.getItem("token") && !isExpired);
  }
}
