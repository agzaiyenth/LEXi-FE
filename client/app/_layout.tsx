// app/_layout.tsx
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
// import { SplashScreen } from 'expo-router'
import { Slot } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SessionProvider } from '@/src/ctx'
import Toast from 'react-native-toast-message';
import { useFonts } from 'expo-font'
import LoadingScreen from '@/src/components/loading'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router'

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync()

export default function RootLayout() {

 const [fontsLoaded] = useFonts({
    OpenDyslexic: require("@/assets/fonts/open-dyslexic.ttf"), 
  });

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <SessionProvider>
    <SafeAreaProvider>
     
        <Slot />
        <Toast />
    </SafeAreaProvider>
    </SessionProvider>
  )
}

