import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    this.getAvailableAppointments(this.currentPage, this.itemsPerPage);
  }

  getAvailableAppointments(pageNumber: number, itemsPerPage: number) {
    this.appointmentService.getAvailableAppointments(pageNumber, itemsPerPage).subscribe({
      next:(value)=>{
        this.availableAppointments = value;
        this.isLoading = false;
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
  

  //------------pagination-----------------
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 10;
  // @Input() totalItems: number;
  // @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  // get totalPages(): number {
  //   return Math.ceil(this.totalItems / this.itemsPerPage);
  // }

  changePage(page: number): void {
    // if (page >= 1 && page <= this.totalPages) {
      this.isLoading = true;
      this.currentPage = page;
      this.getAvailableAppointments(this.currentPage, this.itemsPerPage);
      console.log(`current page: ${this.currentPage}`)
      // this.pageChanged.emit(page);
    // }
  }
}
