export interface FetchAllDocsDto {
    id:number;
    fileName: string;
    blobUrl: string;
    uploadedAt: Date;
    isProcessed: boolean;
   
}

export interface IDocument{
    
    id: number;
    fileName: string; 
    blobUrl:string; 
    uploadedAt: Date;
    expiryDate:Date;
    uploadedBy:string;
    isProcessed:boolean;
}

export interface FetchAllResponseDTO{
    
    id: number;
    fileName: string; 
    blobUrl:string; 
    uploadedAt: Date;
    processed:boolean;
}



export interface FetchDocResponseDTO{
    

}


    
export interface FetchDocRequestDTO{


}


    
export interface ProcessDocRequestDTO{
    fileId: number;
    blobUrl: string;
}







