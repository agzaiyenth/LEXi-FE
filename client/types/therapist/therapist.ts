import { IAvailability } from "./availability";

export interface TherapistDto {
    name : String ;
    description : String ;
    image : String ;
    location : String ;
    contact : String ;

}

export interface ITherapist extends TherapistDto {
id : String;
availability : IAvailability[]
}
