// app/_layout.tsx
import React from 'react'
import { View } from 'react-native'
import LoadingScreen from '@/src/components/loading'
import { SessionProvider } from '@/src/ctx'
import { useFonts } from 'expo-font'
import { Slot } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import OpenDyslexia from '@/assets/fonts/open-dyslexic.ttf'
import theme from '@/src/theme'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router'

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync()

export default function RootLayout() {

 const [fontsLoaded] = useFonts({
    OpenDyslexic: OpenDyslexia, 
  });

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <SessionProvider>
      <SafeAreaProvider>
        <View style={{ flex: 1, backgroundColor: theme.colors.primary.medium2 }}>
          <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background.offWhite }}>
            <Slot />
            <Toast />
          </SafeAreaView>
        </View>
      </SafeAreaProvider>
    </SessionProvider>
  )
}

