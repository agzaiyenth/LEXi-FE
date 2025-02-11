// app/(main)/LearnZone/index.tsx
/*
This is the main index stack for the LearnZone .
It contains stack screens for the LearnZone .
*/

import React from 'react';
import VoxBuddy from './VoxBuddy'; 
import LearnMainScreen from './LearnMainScreen';
import { createStackNavigator } from '@react-navigation/stack';
import SmartRead from './SmartRead';

export type LearnZoneParamList = {
  LearnMain: undefined; 
  VoxBuddy: undefined; // No parameters for VoxBuddy
  SmartRead: undefined; // No parameters for SmartRead
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
      <Stack.Screen name="SmartRead" component={SmartRead} />


    </Stack.Navigator>
  );
};

export default LearnZone;
