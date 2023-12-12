import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MedicalHistoryDTO } from '../Models/MedicalHistoryDTO';
import { environment } from 'src/environments/environment';
import { catchError, of, tap } from 'rxjs';
import { CreateMedicalHistoryDTO } from '../Models/CreateMedicalHistoryDTO';
import { UpdateMedicalHistoryDTO } from '../ViewModels/UpdateMedicalHistoryDTO';

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService {
  medicalHistories: MedicalHistoryDTO[] = [];


  constructor(private httpClient: HttpClient) {
  }

  getOptions() {

    let options = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
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
  }


  getAll() {
    return this.httpClient.get<MedicalHistoryDTO[]>(`${environment.baseUrl}/api/medicalhistory`, this.getOptions()).pipe(
      // catchError((err, caught) => {
      //   this.handleErrors(err);
      //   return of();
      // }),
      tap(data => this.medicalHistories = data),
    )
  }

  addMedicalHistory(medicalHistoryDTO: CreateMedicalHistoryDTO) {
    return this.httpClient.post(`${environment.baseUrl}/api/medicalhistory`, medicalHistoryDTO, this.getOptions()).pipe(
      // catchError((err, caught) => {
      //   console.log(err);
      //   this.handleErrors(err);
      //   return of();
      // })
    );
  }

  deleteRecord(recordId: number) {
    return this.httpClient.delete(`${environment.baseUrl}/api/medicalhistory/${recordId}`, this.getOptions()).pipe(
      // catchError((err, caught) => {
      //   console.log(err);
      //   this.handleErrors(err);
      //   return of();
      // })
    );
  }

  updateRecord(medicalHistory: UpdateMedicalHistoryDTO){
    return this.httpClient.put(`${environment.baseUrl}/api/medicalhistory/${medicalHistory.medicalHistoryID}`, medicalHistory, this.getOptions()).pipe(
      // catchError((err, caught) => {
      //   console.log(err);
      //   this.handleErrors(err);
      //   return of();
      // })
    )
  }
}
