
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ReadWithMeScreen from './ReadWithMeScreen';
import Exit from './Exit';

export type LearnZoneParamList = {
  ReadWithMeScreen: undefined;
  Exit: undefined;
};

const Stack = createStackNavigator<LearnZoneParamList>();

const ReadWithNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        
        <Stack.Screen name="ReadWithMeScreen" component={ReadWithMeScreen} />
        <Stack.Screen name="Exit" component={Exit} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ReadWithNav;
