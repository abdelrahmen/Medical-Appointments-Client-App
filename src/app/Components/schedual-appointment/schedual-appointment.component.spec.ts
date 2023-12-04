import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedualAppointmentComponent } from './schedual-appointment.component';

describe('SchedualAppointmentComponent', () => {
  let component: SchedualAppointmentComponent;
  let fixture: ComponentFixture<SchedualAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchedualAppointmentComponent]
    });
    fixture = TestBed.createComponent(SchedualAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
