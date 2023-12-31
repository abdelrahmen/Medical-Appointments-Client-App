import { Injectable } from '@angular/core';
import { AppointmentDTO } from '../Models/AppointmentDTO';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, of, retry, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private httpClient: HttpClient) { }

  currentAppointmentsList: AppointmentDTO[] = [];

  handleErrors(err: HttpErrorResponse) {
    switch (err.status) {
      case 400:
        console.log(err);
        //alert(`${err?.error[0]["description"]}`)
        break;
      case 500:
        alert("internal server error");
        break;
      default:
        break;
    }
    console.log(err)
  }


  getOptions() {
    let options = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        //"Content-Type": "application/json",
        //"Cache-Control": "max-age=3600",
        //"Access-Control-Allow-Origin": "http://localhost:4200",
        //"ETag": "123456",
        //"Location": "https://example.com/new-resource",
        //"X-Content-Type-Options": "nosniff",
        //"X-Frame-Options": "DENY",
        //"Strict-Transport-Security": "max-age=31536000; includeSubDomains",
        //"X-Powered-By": "ASP.NET Core"
      })
    }
    return options;
  }

  getAvailableAppointments(page: number = 1, itemsPerPage: number = 10) {
    const params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('itemsPerPage', itemsPerPage.toString());
    return this.httpClient.get<AppointmentDTO[]>(`${environment.baseUrl}/api/appointments/available`, { params }).pipe(
      retry(2),
      tap((value) => this.currentAppointmentsList = value)
      // catchError((err, caught)=>{
      //   this.handleErrors(err);
      //   return of();
      // })
    );
  }

  bookAppointment(appointmentDTO?: AppointmentDTO) {
    return this.httpClient.put(`${environment.baseUrl}/api/appointments/book/${appointmentDTO?.appointmentID}`, appointmentDTO, this.getOptions()).pipe(
      // catchError((err)=>{
      //   this.handleErrors(err);
      //   return of();
      // })
    )
  }

  getSchedualledAppointments() {
    return this.httpClient.get<AppointmentDTO[]>(`${environment.baseUrl}/api/appointments/my-appointments`, this.getOptions()).pipe(
      // catchError((err)=>{
      //   this.handleErrors(err);
      //   return of();
      // })
    )
  }

  cancelAppointment(appointmentId: number) {
    return this.httpClient.put(`${environment.baseUrl}/api/appointments/${appointmentId}`, {}, this.getOptions()).pipe(
      // catchError((err)=>{
      //   this.handleErrors(err);
      //   return of();
      // })
    )
  }

}
