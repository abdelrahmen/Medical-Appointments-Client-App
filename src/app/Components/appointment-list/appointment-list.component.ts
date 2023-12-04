import { Component, OnInit } from '@angular/core';
import { AppointmentDTO } from 'src/app/Models/AppointmentDTO';
import { AppointmentService } from 'src/app/Services/appointment.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  constructor(private appointmentService: AppointmentService){}

  availableAppointments: AppointmentDTO[] = [];
  ngOnInit(): void {
    this.appointmentService.getAvailableAppointments().subscribe({
      next:(value)=>{
        this.availableAppointments = value;
        console.log("the ava ", this.availableAppointments);
      },
      error (err){
        console.log(`error: ${err}`)
      },
      complete: ()=>{
        console.log('completed!')
      }
    })
    
  }
  
}
