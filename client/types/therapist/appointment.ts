export interface AppointmentDto {
    userId: string;      
    therapistId: string; 
    availabilityId: string; 
    status?: string;   
}

export interface IAppointment extends AppointmentDto {
    appointmentId: string; 
}
