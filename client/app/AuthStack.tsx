// app/AuthStack.tsx
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import LandingScreen from './(auth)/LandingScreen'
import SignInScreen from './(auth)/SignIn'
import SignUpScreen from './(auth)/Signup'


const Stack = createStackNavigator()

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  )
}
