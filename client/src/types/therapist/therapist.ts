import { IAvailability } from "./availability";

export interface TherapistDto {
    name: string;
    description: string;
    image: string;
    location: string;
    contact: string;
}

export interface ITherapist extends TherapistDto {
    therapistId: string; 
    availabilities: IAvailability[];
}
