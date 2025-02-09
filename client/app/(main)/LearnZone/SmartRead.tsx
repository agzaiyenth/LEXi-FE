// app/(main)/LearnZone/SmartRead.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import UploadScreen from './SmartRead/uploadScreen';
import SpeechScreen from './SmartRead/speechScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SmartReadMain from './SmartRead/SmartReadMain';


export type LearnZoneParamList = {
  SpeechScreen: undefined; 
  UploadScreen: undefined;
  SmartReadMain: undefined; 
};

const Stack = createStackNavigator<LearnZoneParamList>();


const SmartRead = () => {
  return (
    /*<View style={styles.container}>
     <UploadScreen/>
     
    </View>*/
    
      <Stack.Navigator
      screenOptions={{
          headerShown: false, // Disable headers for a cleaner look
      }}
      >
      <Stack.Screen name="SmartReadMain" component={SmartReadMain}/>
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
