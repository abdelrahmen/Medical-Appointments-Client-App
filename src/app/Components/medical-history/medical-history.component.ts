import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MedicalHistoryDTO } from 'src/app/Models/MedicalHistoryDTO';
import { MedicalHistoryService } from 'src/app/Services/medical-history.service';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit {

  constructor(private medicalHistoryService: MedicalHistoryService, private fb: FormBuilder,) {
    this.medicalHistoryForm = this.fb.group({
      medicalCondition: ['', [Validators.required, Validators.maxLength(255)]],
      medications: ['', Validators.maxLength(255)],
      allergies: ['', Validators.maxLength(255)],
      surgeries: ['', Validators.maxLength(255)],
      familyMedicalHistory: ['', Validators.maxLength(255)]
    });
  }

  showAddForm: boolean = false;
  medicalHistoryForm: FormGroup;
  medicalhistories: MedicalHistoryDTO[] = [];

  ngOnInit(): void {
    this.showAddForm = false;
    this.loadMedicalHistories();

  }

  loadMedicalHistories(): void {
    this.medicalHistoryService.getAll().subscribe({
      next: (value) => {
        console.log("from service ",this.medicalHistoryService.medicalHistories);
        this.medicalhistories = value;
      },
      error: (err) => {
        console.log("from comp. ", err);
      }
    });
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  onSubmit(): void {
    if (this.medicalHistoryForm.valid) {
      console.log("button clicked");
      this.medicalHistoryService.addMedicalHistory(this.medicalHistoryForm.value).subscribe(
        {
          next: (res) => {
            console.log(res);
            console.log('Medical history record added successfully.');
            this.ngOnInit();
          },
          error: (error) => {
            console.error('Error adding medical history record:', error);
          },
          complete: () => {
            console.error('completed');
          }
        }
      );
    }
    console.log(this.medicalHistoryForm.value, this.medicalHistoryForm.valid);
  }

  isDeleteLoading: boolean = false;
  deleteRecord(recordId: number) {
    this.isDeleteLoading = true;
    this.medicalHistoryService.deleteRecord(recordId).subscribe({
      next: (res) => {
        this.ngOnInit();
        console.log("in deleteRecord func next", res);
        this.isDeleteLoading = false;
      },
      error: (err) => {
        console.log("in deleteRecord func err", err);
        this.isDeleteLoading = false;
      },
      complete: () => {
        console.log("completed from deleteRecord");
        this.isDeleteLoading = false;
      }
    });
  }
}
