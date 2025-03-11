
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ReadWithMeScreen from './ReadWithMeScreen';


export type LearnZoneParamList = {
  ReadWithMeScreen: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ReadWithNav;
