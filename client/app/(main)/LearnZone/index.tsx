import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // If using expo-router, or use your navigation method
import React from 'react';
import theme from '../../../src/theme';

const LearnScreen = () => {
  const router = useRouter(); // Create router instance for navigation

  const navigateToSmartReadUpload = () => {
    router.push('/(main)/LearnZone/SmartRead/uploadScreen'); // Navigate to SmartReadUploadScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LearnScreen</Text>

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
    backgroundColor: theme.colors.background.offWhite, // Use off-white background
  },
  title: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: 'bold',
    color: theme.colors.blacks.medium, // Dark text for title
  },
  button: {
    marginTop: theme.spacing.large,
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.extraLarge,
    backgroundColor: theme.colors.primary.medium, // Use medium shade of primary color
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
