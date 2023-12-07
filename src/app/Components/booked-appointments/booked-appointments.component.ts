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

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentService.getSchedualledAppointments().subscribe({
      next: (appointments) => {
        this.scheduledAppointments = appointments;
      },
      error: (error) => {
        console.error('Error fetching scheduled appointments:', error);
      },
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
    this.appointmentService.cancelAppointment(appointmentId).subscribe({
      next: (res)=>{
        console.log(res);
        this.ngOnInit();
      }
    });
  }

  isLoading: boolean = true;

  showSnackBar: boolean=false;
  snackbarMessage:string="";
  openSnackBar(msg:string) {
    this.showSnackBar = true;
    this.snackbarMessage=msg;
    setTimeout(()=>this.showSnackBar=false, 3000);
  }
}
