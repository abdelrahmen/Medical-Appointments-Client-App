import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { AppointmentListComponent } from './Components/appointment-list/appointment-list.component';
import { SchedualAppointmentComponent } from './Components/schedual-appointment/schedual-appointment.component';
import { BookedAppointmentsComponent } from './Components/booked-appointments/booked-appointments.component';
import { MedicalHistoryComponent } from './Components/medical-history/medical-history.component';
import { EditMedicalHistoryComponent } from './Components/edit-medical-history/edit-medical-history.component';
import { authGuard } from './Guards/auth.guard';
import { ProfileComponent } from './Components/profile/profile.component';

const routes: Routes = [
  {path: "", component: AppointmentListComponent},
  {path: "login-or-register", component: LoginComponent},
  {path: "home", component: AppointmentListComponent},
  {path: "profile", component: ProfileComponent, canActivate: [authGuard]},
  {path: "schedual/:appointmentId", component: SchedualAppointmentComponent, canActivate: [authGuard]},
  {path: "booked", component: BookedAppointmentsComponent, canActivate: [authGuard]},
  {path: "medical-history", component: MedicalHistoryComponent, canActivate: [authGuard]},
  {path: "medical-history/:medicalHistoryId", component: EditMedicalHistoryComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
