import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ExploreMainScreen from './ExploreMainScreen';
import TherapistHome from './TherapistHome';
import AllDoctorsPage from './AllDoctorsPage';
import BookTherapist from './BookTherapist';

export type ExploreParamList = {
  ExploreMain: undefined; 
  therapistHome: undefined;
  AllDoctorsPage: undefined;
  BookTherapist:undefined;
};

const Stack = createStackNavigator<ExploreParamList>();

export default function ExploreScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, 
      }}
    >
      <Stack.Screen name="ExploreMain" component={ExploreMainScreen} />
      <Stack.Screen name="therapistHome" component={TherapistHome} />
      <Stack.Screen name="AllDoctorsPage" component={AllDoctorsPage} />
      <Stack.Screen name="BookTherapist" component={BookTherapist} />
    </Stack.Navigator>
  )
}