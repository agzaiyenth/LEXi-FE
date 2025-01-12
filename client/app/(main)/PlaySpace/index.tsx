// app/(main)/LearnZone/index.tsx
/*
This is the main index stack for the LearnZone .
It contains stack screens for the LearnZone .
*/

import React from 'react';
import PopBalloon from '../PlaySpace/PopBalloon/index'; 
import GameMainScreen from './LandingPageGames';
import { createStackNavigator } from '@react-navigation/stack';

export type GameZoneParamList = {
  GameMain: undefined; 
  PopBalloon: undefined; // No parameters for VoxBuddy
};

const Stack = createStackNavigator<GameZoneParamList>();

const GameZone = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Disable headers for a cleaner look
      }}
    >
      <Stack.Screen name="GameMain" component={GameMainScreen} />
      <Stack.Screen name="PopBalloon" component={PopBalloon} />
    </Stack.Navigator>
  );
};

export default GameZone;
