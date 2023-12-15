import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppointmentDTO } from 'src/app/Models/AppointmentDTO';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

isLoading: boolean = true;

  constructor(private appointmentService: AppointmentService, private authService: AuthService){}

  availableAppointments: AppointmentDTO[] = [];
  ngOnInit(): void {
    this.isLoading = true;
    this.appointmentService.getAvailableAppointments().subscribe({
      next:(value)=>{
        this.availableAppointments = value;
        this.isLoading = false;
        console.log("the ava ", this.availableAppointments);
      },
      error: (err: HttpErrorResponse)=>{
        console.log(`error: ${err.message}`);
        this.openSnackBar(err.message)
        this.isLoading = false;
      },
      complete: ()=>{
        console.log('completed!');
        this.isLoading = false;
      }
    }) 
  }

  checkAuthStatues() {
    if (!this.authService.isLoggedIn())
      this.openSnackBar("Please Login First")
  }

  showSnackBar: boolean=false;
  snackbarMessage:string="";
  openSnackBar(msg:string) {
    this.showSnackBar = true;
    this.snackbarMessage=msg;
    setTimeout(()=>this.showSnackBar=false, 3000);
  }
  
}
