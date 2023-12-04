import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserRegisterVM } from '../ViewModels/UserRegister';
import { catchError, of, retry, tap } from 'rxjs';
import { UserLoginVM } from '../ViewModels/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  options = {
    headers: new HttpHeaders({
      // "Content-Type": "application/json",
      //"Cache-Control": "max-age=3600",
      // "Access-Control-Allow-Origin": "http://localhost:4200",
      //"ETag": "123456",
      //"Location": "https://example.com/new-resource",
      //"X-Content-Type-Options": "nosniff",
      //"X-Frame-Options": "DENY",
      //"Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      //"X-Powered-By": "ASP.NET Core"
    })
  }

  handleErrors(err:HttpErrorResponse){
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

  constructor(private httpClient: HttpClient) {
  }
  
  register(user: UserRegisterVM) {
    return this.httpClient.post(`${environment.baseUrl}/api/account/register`, user, this.options)
    .pipe(
      catchError((err, caught) => {
        this.handleErrors(err);
        return of();
      }),
      retry(2)
    );
  }

  loginUser(user: UserLoginVM){
    return this.httpClient.post(`${environment.baseUrl}/api/account/login`, user, this.options).pipe(
      tap((response: any) => {
        if (response?.token) {
          // Save the token to local storage
          localStorage.setItem("token", response.token);
        }
      }),
      catchError((err, caught)=>{
        this.handleErrors(err);
        return of();
      })
    );


  }
}
