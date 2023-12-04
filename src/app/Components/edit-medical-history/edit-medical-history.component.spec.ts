import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMedicalHistoryComponent } from './edit-medical-history.component';

describe('EditMedicalHistoryComponent', () => {
  let component: EditMedicalHistoryComponent;
  let fixture: ComponentFixture<EditMedicalHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMedicalHistoryComponent]
    });
    fixture = TestBed.createComponent(EditMedicalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
