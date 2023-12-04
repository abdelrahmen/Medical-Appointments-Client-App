import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MedicalHistoryDTO } from 'src/app/Models/MedicalHistoryDTO';
import { MedicalHistoryService } from 'src/app/Services/medical-history.service';

@Component({
  selector: 'app-edit-medical-history',
  templateUrl: './edit-medical-history.component.html',
  styleUrls: ['./edit-medical-history.component.css']
})
export class EditMedicalHistoryComponent {

  medicalHistoryForm: FormGroup;
  medicalHistory: MedicalHistoryDTO | undefined;

  constructor(private medicalHistoryService: MedicalHistoryService, private fb: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.medicalHistory = this.medicalHistoryService.medicalHistories.find(mh => mh.medicalHistoryID == Number(activatedRoute.snapshot.paramMap.get("medicalHistoryId")));
    this.medicalHistoryForm = this.fb.group({
      medicalHistoryID: [this.medicalHistory?.medicalHistoryID ?? "0"],
      medicalCondition: [this.medicalHistory?.medicalCondition ?? "", [Validators.required, Validators.maxLength(255)]],
      medications: [this.medicalHistory?.medications ?? "", [Validators.maxLength(255)]],
      allergies: [this.medicalHistory?.allergies ?? "", [Validators.maxLength(255)]],
      surgeries: [this.medicalHistory?.surgeries ?? "", [Validators.maxLength(255)]],
      familyMedicalHistory: [this.medicalHistory?.familyMedicalHistory ?? "", [Validators.maxLength(255)]],
    });
  }

  onSubmit() {
    if (this.medicalHistoryForm.valid) {
      this.medicalHistoryService.updateRecord(this.medicalHistoryForm.value).subscribe({
        next: (res)=>{
          console.log(res);
          history.back();
        },
        error: (err)=>{
          console.log(err);
        }
      })
    }
  }
}
