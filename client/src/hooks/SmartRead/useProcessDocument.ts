import { useState } from 'react';
import { Alert } from 'react-native';
import apiClient from "@/src/apiClient";
import { ProcessDocRequestDTO } from "@/src/types/SmartRead/Documents";
import Toast from 'react-native-toast-message';

export const useProcessDocument = () => {
  const [isProcessing, setIsProcessing] = useState(false);
   
  const processDocument = async ({ fileId, blobUrl }: ProcessDocRequestDTO) => {
    if (!fileId || !blobUrl) {
      
      Toast.show({type:'error', text1:'Processing Failed', text2:'File ID or Blob URL is missing.' });
      return;
    }
    console.log('Processing started for fileId:', fileId);

    try {
      
      const response = await apiClient.post('/smartRead/file/process', { fileId, blobUrl });

      if (response.status === 200) {
        console.log('Request sent successfully, document is being processed.');
        setIsProcessing(true);
      } else {
        Toast.show({type:'error', text1:'Processing Failed', text2:'Failed to initiate processing.' });
      }
      
    } catch (error: any) {
      console.error('Processing error:', error);
      Toast.show({type:'error', text1:'Processing Failed', text2:'An error occurred while processing the document.' });
    }
  };

  return { isProcessing, processDocument};
};
