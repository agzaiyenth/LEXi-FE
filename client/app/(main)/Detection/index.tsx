import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import DetectionHomeScreen from './DetectionHomeScreen';
import TestScreen from './TestScreen';
import ResultScreen from './ResultScreen';

export type DetectionSystemParamList = {
  DetectionHomeScreen: undefined; 
  TestScreen: undefined; 
  ResultScreen: undefined;
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
      <Stack.Screen name="ResultScreen" component={ResultScreen} />


    </Stack.Navigator>
  );
};

export default DetectionFlow;

