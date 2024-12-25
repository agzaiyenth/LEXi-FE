// app/_layout.tsx
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
// import { SplashScreen } from 'expo-router'
import { Slot } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SessionProvider } from '../src/ctx'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router'

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  // const [loaded, error] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  //   ...FontAwesome.font,
  // })

  // // Handle font loading errors.
  // useEffect(() => {
  //   if (error) throw error
  // }, [error])

  // // Hide the splash screen when fonts are loaded.
  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync()
  //   }
  // }, [loaded])

  // if (!loaded) {
  //   return null
  // }

const Stack = createStackNavigator();
  return (
    <SessionProvider>
    <SafeAreaProvider>
     
        <Slot />
      
    </SafeAreaProvider>
    </SessionProvider>
  )
}

