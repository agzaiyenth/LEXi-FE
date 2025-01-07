import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import theme from '../../../../src/theme';

const { width: screenWidth } = Dimensions.get('window');

const UploadScreen = () => {
    return (
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <AntDesign name="arrowleft" size={24} color={theme.colors.blacks.medium} />
          <Text style={styles.headerText}>SmartRead</Text>
        </View>
  
        {/* Upload Section */}
        <View style={styles.uploadContainer}>
          <Image
            source={require('@/assets/images/uploadIcon.png')}
            style={styles.uploadIcon}
            resizeMode="contain"
          />
          <Text style={styles.fileTypesText}> PDF, and WORD formats, up to 50MB</Text>
          <TouchableOpacity style={styles.browseButton}>
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
  });
  
  export default UploadScreen;
  

