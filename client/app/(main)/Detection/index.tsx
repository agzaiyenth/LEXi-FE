import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import CompletedScreen from './CompletedScreen';
import DetectionHomeScreen from './DetectionHomeScreen';
import TestScreen from './TestScreen';

export type DetectionSystemParamList = {
  DetectionHomeScreen: undefined;
  TestScreen: undefined;
  CompletedScreen: undefined;
};

const Stack = createStackNavigator<DetectionSystemParamList>();
const DetectionFlow = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DetectionHomeScreen" component={DetectionHomeScreen} />
      <Stack.Screen name="TestScreen" component={TestScreen} />
      <Stack.Screen name="CompletedScreen" component={CompletedScreen} />


    </Stack.Navigator>
  );
};

export default DetectionFlow;

