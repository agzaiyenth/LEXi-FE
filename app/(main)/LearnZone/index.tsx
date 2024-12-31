// app/(main)/LearnZone/index.tsx
import React from 'react';
import VoxBuddy from './VoxBuddy'; 
import LearnMainScreen from './LearnMainScreen';
import { createStackNavigator } from '@react-navigation/stack';

export type LearnZoneParamList = {
  LearnMain: undefined; // No parameters for the main screen
  VoxBuddy: undefined; // No parameters for VoxBuddy
};

const Stack = createStackNavigator<LearnZoneParamList>();

const LearnZone = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Disable headers for a cleaner look
      }}
    >
      <Stack.Screen name="LearnMain" component={LearnMainScreen} />
      <Stack.Screen name="VoxBuddy" component={VoxBuddy} />
    </Stack.Navigator>
  );
};

export default LearnZone;
