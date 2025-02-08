export interface AvailabilityDto {
    therapistId: string;  
    startTime: string;   
    endTime: string;
    available: boolean;
}

export interface IAvailability extends AvailabilityDto {
    availabilitySlotId: string;
}