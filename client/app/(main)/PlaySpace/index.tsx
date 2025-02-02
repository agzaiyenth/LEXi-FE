import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PlayMainScreen from './PlayMainScreen';
import BalloonGame from './BalloonGame';
import Game from './Game';

export type LearnZoneParamList = {
  PlayMain: undefined; 
  BalloonGame: undefined; 
  Game: undefined;
};

const Stack = createStackNavigator<LearnZoneParamList>();

const PlaySpace = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, 
      }}
    >
      <Stack.Screen name="PlayMain" component={PlayMainScreen} />
      <Stack.Screen name="BalloonGame" component={BalloonGame} />
      <Stack.Screen name="Game" component={Game} />
    </Stack.Navigator>
  );
};

export default PlaySpace;
