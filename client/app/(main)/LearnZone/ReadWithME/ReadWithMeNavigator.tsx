// Create a new file for your navigation stack, and set up the stack navigator:

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Card from './Card';
import OnboardingScreen from './OnboardingScreen';

const Stack = createNativeStackNavigator();

const ReadWithMeNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Card">
      <Stack.Screen name="Card" component={Card} options={{ title: 'Card' }} />
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ title: 'Onboarding' }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default ReadWithMeNavigator;
