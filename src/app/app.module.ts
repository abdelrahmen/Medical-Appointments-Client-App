import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HeaderComponent } from './Components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentListComponent } from './Components/appointment-list/appointment-list.component';
import { SchedualAppointmentComponent } from './Components/schedual-appointment/schedual-appointment.component';
import { BookedAppointmentsComponent } from './Components/booked-appointments/booked-appointments.component';
import { MedicalHistoryComponent } from './Components/medical-history/medical-history.component';
import { EditMedicalHistoryComponent } from './Components/edit-medical-history/edit-medical-history.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    AppointmentListComponent,
    SchedualAppointmentComponent,
    BookedAppointmentsComponent,
    MedicalHistoryComponent,
    EditMedicalHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
