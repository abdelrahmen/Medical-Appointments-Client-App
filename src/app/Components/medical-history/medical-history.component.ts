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

  isLoading: boolean = false;


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
    this.isLoading = true;
    this.showAddForm = false;
    this.loadMedicalHistories();

  }

  loadMedicalHistories(): void {
    this.medicalHistoryService.getAll().subscribe({
      next: (value) => {
        console.log("from service ",this.medicalHistoryService.medicalHistories);
        this.medicalhistories = value;
        this.isLoading = false;
      },
      error: (err) => {
        this.openSnackBar(err?.message ?? err.statusText);
        this.isLoading = false;
      },
      complete: ()=>{
        this.isLoading = false;
      }
    });
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  onSubmit(): void {
    this.isLoading = true;
    if (this.medicalHistoryForm.valid) {
      console.log("button clicked");
      this.medicalHistoryService.addMedicalHistory(this.medicalHistoryForm.value).subscribe(
        {
          next: (res) => {
            console.log(res);
            console.log('Medical history record added successfully.');
            this.isLoading = false;
            this.ngOnInit();
          },
          error: (err) => {
            this.isLoading = false;
            this.openSnackBar(err?.message ?? err.statusText);         },
          complete: () => {
            this.isLoading = false;
          }
        }
      );
    }
    console.log(this.medicalHistoryForm.value, this.medicalHistoryForm.valid);
  }

  deleteRecord(recordId: number) {
    this.isLoading = true;
    this.medicalHistoryService.deleteRecord(recordId).subscribe({
      next: (res) => {
        this.ngOnInit();
        console.log("in deleteRecord func next", res);
        this.isLoading = false;
      },
      error: (err) => {
        this.openSnackBar(err?.message ?? err.statusText);
        this.isLoading = false;
      },
      complete: () => {
        console.log("completed from deleteRecord");
        this.isLoading = false;
      }
    });
  }

  showSnackBar: boolean=false;
  snackbarMessage:string="";
  openSnackBar(msg:string) {
    this.showSnackBar = true;
    this.snackbarMessage=msg;
    setTimeout(()=>this.showSnackBar=false, 3000);
  }
}
