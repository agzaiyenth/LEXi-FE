import apiClient from '@/src/apiClient';
import theme from '@/src/theme';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LearnZoneParamList } from './navigator';

const { width: screenWidth } = Dimensions.get('window');

interface File {
  uri: string;
  name: string;
  mimeType: string;
}

type NavigationProp = StackNavigationProp<LearnZoneParamList, 'UploadScreen', 'SmartReadMain'>;

const UploadScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  // State for file name, and modal controls.
  const [fileName, setFileName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  // modalStatus can be 'loading', 'success', or 'error'
  const [modalStatus, setModalStatus] = useState<'loading' | 'success' | 'error'>('loading');

  // Automatically navigate to SmartReadMain after a short delay if success or failure
  useEffect(() => {
    if (modalVisible && (modalStatus === 'success' || modalStatus === 'error')) {
      const timer = setTimeout(() => {
        setModalVisible(false);
        navigation.navigate('SmartReadMain');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [modalVisible, modalStatus]);

  // File picking
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ], // PDF & Word documents
      });

      if (!result.canceled && result.assets?.length > 0) {
        const fileData = result.assets[0];
        setFileName(fileData.name);
        const fileSize = fileData.size || 0;

        // Check file size (4MB max)
        if (fileSize > 4 * 1024 * 1024) {
          setModalStatus('error');
          setModalVisible(true);
        } else {
          setModalStatus('loading');
          setModalVisible(true);
          const file: File = {
            uri: fileData.uri,
            name: fileData.name,
            mimeType: fileData.mimeType || 'application/octet-stream',
          };
          uploadDocument(file);
        }
      }
    } catch (err) {
      console.error('Error picking file:', err);
      setModalStatus('error');
      setModalVisible(true);
    }
  };

  // File upload function
  const uploadDocument = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.mimeType,
    } as any);

    try {
      const response = await apiClient.post('/smartRead/file/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Upload Response:', response.data);
      setModalStatus('success');
    } catch (error) {
      console.error('Upload error:', error);
      setModalStatus('error');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity  onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle-outline" size={40} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Smart Read</Text>
      </View>

      {/* Upload Section */}
      <View style={styles.uploadContainer}>
        <Image
          source={require('@/assets/images/uploadIcon.png')}
          style={styles.uploadIcon}
          resizeMode="contain"
          accessible
          accessibilityLabel="Upload Icon"
        />
        <Text style={styles.fileTypesText}>PDF and WORD formats, up to 4MB</Text>
        <TouchableOpacity
          style={styles.browseButton}
          onPress={pickDocument}
          accessible
          accessibilityLabel="Browse files to upload"
        >
          <Text style={styles.browseButtonText}>BROWSE FILES</Text>
        </TouchableOpacity>
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

      {/* Custom Modal Popup */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {modalStatus === 'loading' && (
              <>
                <ActivityIndicator size="large" color={theme.colors.primary.medium} />
                <Text style={styles.modalText}>Uploading &quote;{fileName}&quote;...</Text>
              </>
            )}
            {modalStatus === 'success' && (
              <>
                <FontAwesome name="check-circle" size={70} color="green" />
                <Text style={styles.modalText}>Upload Successful!</Text>
              </>
            )}
            {modalStatus === 'error' && (
              <>
                <FontAwesome name="times-circle" size={70} color="red" />
                <Text style={styles.modalText}>Upload Failed!</Text>
              </>
            )}
          </View>
        </View>
      </Modal>
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
    fontSize: theme.fonts.sizes.large,   
    marginLeft: 80,   
    color: theme.colors.background.offWhite,
  },
  uploadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.beige,
    borderRadius: 20,
    padding: theme.spacing.medium,
    borderWidth: 1,
    borderColor: theme.colors.primary.light,
    top:20,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: theme.colors.background.offWhite,
    borderRadius: 20,
    padding: theme.spacing.large,
    alignItems: 'center',
  },
  modalText: {
    marginTop: theme.spacing.medium,
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.primary.medium,
    textAlign: 'center',
  },
});

export default UploadScreen;
