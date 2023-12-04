import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentDTO } from 'src/app/Models/AppointmentDTO';
import { AppointmentService } from 'src/app/Services/appointment.service';
import {BookAppointmentDTO} from 'src/app/Models/BookAppointmentDTO '

@Component({
  selector: 'app-schedual-appointment',
  templateUrl: './schedual-appointment.component.html',
  styleUrls: ['./schedual-appointment.component.css']
})
export class SchedualAppointmentComponent {
  appointment?: AppointmentDTO;
  appintmentDTO?: BookAppointmentDTO;

  constructor(private appointmentService: AppointmentService, private activatedRoute:ActivatedRoute){
    this.appointmentService.getAvailableAppointments().subscribe({
      next: (value)=>{
        this.appointment=value.find(a=>a.appointmentID==Number(activatedRoute.snapshot.paramMap.get("appointmentId")));
      },
    });
  }

  bookAppointment(){
    this.appintmentDTO = {
      appointmentID: this.appointment?.appointmentID!,
      notes: this.appointment?.notes!,
    }
    this.appointmentService.bookAppointment(this.appointment).subscribe({
      next: (res)=>{
        console.log(res);
      },
      error: (err)=>{
        console.log("error", err);
      },
      complete: ()=>{
        console.log("complete");
      }
    });
  }
  
}
