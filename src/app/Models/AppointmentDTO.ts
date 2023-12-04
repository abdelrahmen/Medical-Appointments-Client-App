export interface AppointmentDTO {
    appointmentID: number;
    doctorId: string;
    doctorName: string;
    speciality: string;
    patientId?: string;
    appointmentDateTime: Date;
    status: string; // e.g., Available, scheduled, canceled, completed
    notes: string;
  }