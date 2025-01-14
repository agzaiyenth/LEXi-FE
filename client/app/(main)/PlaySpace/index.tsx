// app/(main)/PlaySpace/index.tsx
/*
This is the main index stack for the LearnZone .
It contains stack screens for the LearnZone .
*/

import React from 'react';
import PopTheBalloonGame from './PopBalloon/index'; 
import GameMainScreen from './LandingPageGames';
import { createStackNavigator } from '@react-navigation/stack';

export type GameZoneParamList = {
  GameMain: undefined; 
  PopTheBalloonGame: undefined; 
};

const Stack = createStackNavigator<GameZoneParamList>();

const GameZone = () => {
  return (
    <Stack.Navigator
      initialRouteName="GameMain"
      screenOptions={{ headerShown: false }}  
    >
      <Stack.Screen name="GameMain" component={GameMainScreen} />
      <Stack.Screen name="PopTheBalloonGame" component={PopTheBalloonGame} />
    </Stack.Navigator>
  );
};

export default GameZone;
