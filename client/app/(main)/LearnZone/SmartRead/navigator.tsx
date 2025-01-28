
import React from 'react';
import UploadScreen from './uploadScreen'; 
import SpeechScreen from './speechScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


export type LearnZoneParamList = {
  SpeechScreen: undefined; 
  UploadScreen: undefined; 
};

const Stack = createStackNavigator<LearnZoneParamList>();

const SpeechNav = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
            headerShown: false, // Disable headers for a cleaner look
        }}
        >
        <Stack.Screen name="UploadScreen" component={UploadScreen} />
        <Stack.Screen name="SpeechScreen" component={SpeechScreen} />

        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default SpeechNav;
