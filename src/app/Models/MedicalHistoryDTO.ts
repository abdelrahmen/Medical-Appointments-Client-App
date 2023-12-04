export interface MedicalHistoryDTO {
    medicalHistoryID: number;
    userId: string;
    dateOfEntry: Date;
    medicalCondition: string;
    medications?: string;
    allergies?: string;
    surgeries?: string;
    familyMedicalHistory?: string;
  }