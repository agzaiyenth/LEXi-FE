// app/(main)/LearnZone/SmartRead.tsx
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import SmartReadMain from './SmartRead/SmartReadMain';
import SpeechScreen from './SmartRead/speechScreen';
import UploadScreen from './SmartRead/uploadScreen';


export type LearnZoneParamList = {
  SpeechScreen: undefined;
  UploadScreen: undefined;
  SmartReadMain: undefined;
};

const Stack = createStackNavigator<LearnZoneParamList>();


const SmartRead = () => {
  return (

    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Disable headers for a cleaner look
      }}
    >
      <Stack.Screen name="SmartReadMain" component={SmartReadMain} />
      <Stack.Screen name="UploadScreen" component={UploadScreen} />
      <Stack.Screen name="SpeechScreen" component={SpeechScreen} />

    </Stack.Navigator>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SmartRead;
