import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router'; 
import React from 'react';
import theme from '../../../src/theme';
import UploadScreen from './SmartRead/uploadScreen';

//Temporary LearnZone component to navigate to SmartReadUploadScreen

const LearnScreen = () => {
  const router = useRouter(); 
  const navigateToSmartReadUpload = () => {
    console.log('Navigating to SmartRead');
    router.push('/(main)/LearnZone/SmartRead/uploadScreen'); // Navigate to SmartReadUploadScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LearnZone</Text>

      {/* Button to navigate to SmartRead Upload */}
      <TouchableOpacity style={styles.button} onPress={navigateToSmartReadUpload}>
        <Text style={styles.buttonText}>Go to SmartRead</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.large,
    backgroundColor: theme.colors.background.offWhite, 
  },
  title: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: 'bold',
    color: theme.colors.blacks.medium, 
  },
  button: {
    marginTop: theme.spacing.large,
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.extraLarge,
    backgroundColor: theme.colors.primary.medium, 
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
  },
});

export default LearnScreen;
