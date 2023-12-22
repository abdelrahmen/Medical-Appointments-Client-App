import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentDTO } from 'src/app/Models/AppointmentDTO';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { BookAppointmentDTO } from 'src/app/Models/BookAppointmentDTO '
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-schedual-appointment',
  templateUrl: './schedual-appointment.component.html',
  styleUrls: ['./schedual-appointment.component.css']
})
export class SchedualAppointmentComponent {
  appointment?: AppointmentDTO;
  appintmentDTO?: BookAppointmentDTO;
  isLoading: boolean = true;

  constructor(private appointmentService: AppointmentService, private activatedRoute: ActivatedRoute, private router: Router) {

    this.appointment = this.appointmentService.currentAppointmentsList.find(a => a.appointmentID == Number(activatedRoute.snapshot.paramMap.get("appointmentId")));
    if (!this.appointment) {
      this.openSnackBar("no appointment found please try again");
      setTimeout(() => router.navigateByUrl("home"), 2000);
    }
    this.isLoading = false;
  }

  bookAppointment() {
    this.isLoading = true;
    this.appintmentDTO = {
      appointmentID: this.appointment?.appointmentID!,
      notes: this.appointment?.notes!,
    }
    this.appointmentService.bookAppointment(this.appointment).subscribe({
      next: (res) => {
        this.openSnackBar("booked Succefully");
        setTimeout(() => this.router.navigateByUrl("home"), 2000);
        this.isLoading = false;
      },
      error: (err:HttpErrorResponse) => {
        this.openSnackBar(err.error.error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }



  showSnackBar: boolean = false;
  snackbarMessage: string = "";
  openSnackBar(msg: string) {
    this.showSnackBar = true;
    this.snackbarMessage = msg;
    setTimeout(() => this.showSnackBar = false, 3000);
  }

}
