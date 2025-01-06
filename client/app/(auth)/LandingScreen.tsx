// app/(auth)/LandingScreen.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../../src/theme';
import GlobalStyles from '../../src/globalFont';
const { width: screenWidth } = Dimensions.get('window'); // Get the screen width

export default function LandingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo and Title Container */}
      <View style={styles.topContent}>
        {/* Logo */}
        <Image
          source={require('@/assets/images/auth/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        {/* Title */}
        <Text style={styles.heading}>Lexi</Text>
        <Text style={styles.text}>Learning is for everyone</Text>
      </View>

      {/* Center Image */}
      <View style={styles.centerContent}>
        <Image
          source={require('@/assets/images/auth/centerImage.png')}
          style={styles.centerImage}
          resizeMode="contain"
        />
      </View>

      {/* Button Container */}
      <View style={styles.buttonContainer}>
        {/* Login Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/(auth)/SignIn')}
        >

          <Text style={styles.buttonText}>Login</Text>

        </TouchableOpacity>

        {/* Register Button */}
        <TouchableOpacity
          style={[styles.button, styles.registerButton]}
          onPress={() => router.push('/(auth)/Signup')}
        >
          <Text style={styles.registerButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary.medium2,
  },
  topContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  centerContent: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
    color: theme.colors.background.beige,
  },
  heading: {
    fontSize: theme.fonts.sizes.extraLarge,
    fontWeight: 'bold',
    color: theme.colors.background.beige,
  },
  centerImage: {
    width: screenWidth,
    height: undefined,
    aspectRatio: 1,
  },
  button: {
    width: '100%',
    maxWidth: 300,
    paddingVertical: 15,
    backgroundColor: theme.colors.primary.medium,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: theme.colors.background.beige,
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: theme.colors.primary.medium2,
    borderWidth: 1,
    borderColor: theme.colors.primary.medium,
  },
  registerButtonText: {
    color: theme.colors.primary.medium,
    fontWeight: 'bold',
  },
});
