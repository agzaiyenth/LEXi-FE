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


    
export interface ProcessDocRequestDTO{
    fileId: number;
    blobUrl: string;
}







