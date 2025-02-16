// app/(main)/LearnZone/index.tsx
/*
This is the main index stack for the LearnZone .
It contains stack screens for the LearnZone .
*/

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LearnMainScreen from './LearnMainScreen';
import ReadWithMe from './ReadWithME';
import SmartRead from './SmartRead';
import VoxBuddy from './VoxBuddy';

export type LearnZoneParamList = {
  LearnMain: undefined;
  VoxBuddy: undefined; // No parameters for VoxBuddy
  SmartRead: undefined; // No parameters for SmartRead
  ReadWithMe: undefined;
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


      <Stack.Screen name="ReadWithMe" component={ReadWithMe} />
    </Stack.Navigator>
  );
};

export default LearnZone;