export interface UpdateMedicalHistoryDTO {
    medicalHistoryID: number;
    medicalCondition: string;
    medications?: string;
    allergies?: string;
    surgeries?: string;
    familyMedicalHistory?: string;
  }
  