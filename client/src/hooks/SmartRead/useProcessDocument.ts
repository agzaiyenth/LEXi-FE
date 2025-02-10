import { useState } from 'react';
import { Alert } from 'react-native';
import apiClient from "@/src/apiClient";
import { ProcessDocRequestDTO } from "@/types/SmartRead/Documents";

export const useProcessDocument = () => {
  const [isProcessing, setIsProcessing] = useState(false);
   
  const processDocument = async ({ fileId, blobUrl }: ProcessDocRequestDTO) => {
    if (!fileId || !blobUrl) {
      Alert.alert('Processing Failed', 'File ID or Blob URL is missing.');
      return;
    }
    console.log('Processing started for fileId:', fileId);

    try {
      
      const response = await apiClient.post('/smartRead/file/process', { fileId, blobUrl });

      if (response.status === 200) {
        console.log('Request sent successfully, document is being processed.');
        setIsProcessing(true);
      } else {
        Alert.alert('Processing Failed', 'Failed to initiate processing on the backend.');
      }
      
    } catch (error: any) {
      console.error('Processing error:', error);
      Alert.alert('Processing Failed', 'An error occurred while processing the document.');
    }
  };

  return { isProcessing, processDocument};
};



/*import { useCallback, useState } from "react";
import apiClient from "@/src/apiClient";
import { ProcessDocRequestDTO } from "@/types/SmartRead/Documents";
import { Alert } from 'react-native';

export const useProcessDocument = (fileId:number, blobUrl:string) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    //const processDocument = async (processData: ProcessDocRequestDTO) => {
    const processDocument = useCallback  (async ()  => {

        setLoading(true);
        setError(null);

        try {
            const response = await apiClient.post<ProcessDocRequestDTO>("/smartRead/file/process", {params :{ fileId:fileId , blobUrl:blobUrl}});


            if (response.status === 200) {
                console.log('Request sent successfully, document is being processed.');
                setIsProcessing(true);
              } else {
                Alert.alert('Processing Failed', 'Failed to initiate processing on the backend.');
              }
        } catch (err: any) {
            setError(err.response?.data?.message || "Error processeing the document.");
        } finally {
            setLoading(false);
        }
    },[fileId,blobUrl]);

    return { processDocument, loading, error ,isProcessing};
};*/
