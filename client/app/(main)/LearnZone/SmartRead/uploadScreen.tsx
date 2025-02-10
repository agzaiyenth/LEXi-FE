import { AntDesign, FontAwesome } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import theme from '../../../../src/theme';
import { LearnZoneParamList } from './navigator';



import apiClient from '@/src/apiClient';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRouter } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');

interface File {
  uri: string;
  name: string;
  mimeType: string;
}


type NavigationProp = StackNavigationProp<LearnZoneParamList, 'UploadScreen', 'SmartReadMain'>;

const UploadScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const goToSpeechScreen = () => {
    console.log(navigation.getState());
    navigation.navigate('SpeechScreen');
    console.log('Navigating to Speech Screen');
  };

  const router = useRouter();
  const [uploadState, setUploadState] = useState('idle');
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'], // PDF & Word
      });

      if (!result.canceled && result.assets?.length > 0) {

        const fileData = result.assets[0];

        const fileSize = fileData.size || 0;

        if (fileSize > 4 * 1024 * 1024) {
          Toast.show({ type: 'error', text1: 'File Too Large', text2: 'Please upload a file smaller than 4MB.' });
        } else {
          setFileName(fileData.name);
          setUploadState('uploading');

          const file = {
            uri: fileData.uri,
            name: fileData.name,
            mimeType: fileData.mimeType || 'application/octet-stream', // Fallback mimeType if missing
          };

          uploadDocument(file);
        }
      }
    } catch (err) {
      console.error('Error picking file:', err);
      Toast.show({ type: 'error', text1: 'Error', text2: 'An error occurred while picking the file. Please try again.' });
    }
  };

  const uploadDocument = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.mimeType,
    } as any);

    setUploadState('uploading');
    try {
      const response = await apiClient.post('/smartRead/file/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Upload Response:', response.data);


      Toast.show({ type: 'success', text1: 'Success', text2: response.data.message });
      setUploadState('ready');
      router.navigate("/(main)/LearnZone/SmartRead/SmartReadMain")

    } catch (error) {
      console.error('Upload error:', error);
      Toast.show({ type: 'error', text1: 'Upload Failed.', text2: 'Could not upload the file. Please try again.' });
      setUploadState('idle');
    }
  };





  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <AntDesign name="arrowleft" size={24} color={theme.colors.blacks.medium} />
        <Text style={styles.headerText}>SmartRead</Text>
      </View>

      {/* Upload Section */}
      <View style={styles.uploadContainer}>
        {uploadState === 'idle' && (
          <>
            <Image
              source={require('@/assets/images/uploadIcon.png')}
              style={styles.uploadIcon}
              resizeMode="contain"
              accessible
              accessibilityLabel='Upload Icon'
            />
            <Text style={styles.fileTypesText}> PDF, and WORD formats, up to 4MB</Text>
            <TouchableOpacity
              style={styles.browseButton}
              onPress={pickDocument}
              accessible
              accessibilityLabel="Browse files to upload"
            >
              <Text style={styles.browseButtonText}>BROWSE FILES</Text>
            </TouchableOpacity>
          </>
        )}

        {uploadState === 'uploading' && (
          <>
            <ActivityIndicator size="large" color={theme.colors.primary.medium} />
            <Text style={styles.processingText}>
              "{fileName}" is getting ready for summarization...
            </Text>

          </>
        )}

        {/* TO DO add navigation to main screen */}
        {uploadState === 'ready' && (
          <>
            <FontAwesome name="check-circle" size={50} color="green" />
            <Text style={styles.successText}>
              "{fileName}" is ready for summarization!
            </Text>
            <TouchableOpacity
              style={styles.browseButton}
              onPress={() =>
                navigation.navigate('SmartReadMain')}
              accessible
              accessibilityLabel="Browse files to upload"
            >
              <Text style={styles.browseButtonText}>Go back to main screen</Text>
            </TouchableOpacity>
          </>
        )}


      </View>

      {/* Footer Section */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>UPLOAD YOUR FILES TO SUMMARIZE!</Text>
        <Image
          source={require('@/assets/images/icon-pointing.png')}
          style={styles.mascotIcon}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity
        style={styles.navigateButton}
        onPress={goToSpeechScreen}
      >
        <Text style={styles.navigateButtonText}>Go to Speech Screen</Text>
      </TouchableOpacity>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: theme.colors.primary.medium2,
    padding: theme.spacing.medium,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.large,
  },
  headerText: {
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
    marginLeft: theme.spacing.small,
    fontFamily: 'serif',
    color: theme.colors.background.beige,
  },
  uploadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.offWhite,
    borderRadius: 20,
    padding: theme.spacing.medium,
    borderWidth: 1,
    borderColor: theme.colors.primary.light,
  },
  uploadIcon: {
    width: 80,
    height: 80,
    marginBottom: theme.spacing.large,
  },
  fileTypesText: {
    textAlign: 'center',
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.primary.dark2,
    marginBottom: theme.spacing.large,
  },
  browseButton: {
    backgroundColor: theme.colors.primary.medium,
    borderRadius: 10,
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    justifyContent: 'center',
    alignItems: 'center',
  },
  browseButtonText: {
    color: theme.colors.background.beige,
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.large,
  },
  footerText: {
    fontSize: theme.fonts.sizes.small,
    fontWeight: '500',
    color: theme.colors.primary.dark1,
    marginBottom: theme.spacing.small,
  },
  mascotIcon: {
    width: screenWidth * 0.4,
    height: undefined,
    aspectRatio: 1,
  },

  processingText: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.primary.dark2,
    textAlign: 'center',
    marginTop: theme.spacing.medium,
  },

  successText: {
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
    color: theme.colors.primary.medium,
    textAlign: 'center',
  },

  extractedContent: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.primary.dark2,
    textAlign: 'center',
    marginTop: theme.spacing.medium,
  },
  navigateButton: {
    backgroundColor: theme.colors.primary.medium,
    borderRadius: 10,
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
    marginTop: theme.spacing.medium,
    alignSelf: 'center',
  },
  navigateButtonText: {
    color: theme.colors.background.beige,
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
  },

});

export default UploadScreen;


