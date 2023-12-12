import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppointmentDTO } from 'src/app/Models/AppointmentDTO';
import { AppointmentService } from 'src/app/Services/appointment.service';

@Component({
  selector: 'app-booked-appointments',
  templateUrl: './booked-appointments.component.html',
  styleUrls: ['./booked-appointments.component.css']
})
export class BookedAppointmentsComponent implements OnInit {

  scheduledAppointments: AppointmentDTO[] = [];
  isLoading: boolean = true;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.appointmentService.getSchedualledAppointments().subscribe({
      next: (appointments) => {
        this.scheduledAppointments = appointments;
        this.isLoading = false;
      },
      error: (err) => {
        this.openSnackBar(err.message);
        this.isLoading = false;
      },
      complete: ()=>{
        this.isLoading = false;
      }
    }
    );
  }

  isElapsedAppointment(appointmentDateTime: Date): boolean{
    let appointmentDateTimeConverted = new Date(appointmentDateTime);
    let currentDate = new Date();
    return currentDate > appointmentDateTimeConverted;
  }

  isCanceled(appointmentStatus:string):boolean{
    return appointmentStatus=="Canceled";
  };

  cancelAppointmnet(appointmentId: number) {
    this.isLoading = true;
    this.appointmentService.cancelAppointment(appointmentId).subscribe({
      next: (res)=>{
        console.log(res);
        this.ngOnInit();
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse)=>{
        this.openSnackBar(err.message);
        this.isLoading = false;
      },
      complete: ()=>{
        this.isLoading = false;
      }
    });
  }

  

  showSnackBar: boolean=false;
  snackbarMessage:string="";
  openSnackBar(msg:string) {
    console.log("in open snack bar");
    this.showSnackBar = true;
    this.snackbarMessage=msg;
    setTimeout(()=>this.showSnackBar=false, 3000);
  }
}
