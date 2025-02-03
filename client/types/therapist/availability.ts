export interface AvailabilityDto {
    therapist : String;
    startTime : Date;
    endTime : Date;
    available : Boolean;
}

export interface IAvailability extends AvailabilityDto{
    id : String;
}