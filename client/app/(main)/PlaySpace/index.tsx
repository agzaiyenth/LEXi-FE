import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BalloonGame from './BalloonGame';
import Game from './Game';
import PlayMainScreen from './PlayMainScreen';
import Home from '../Home/index'

export type LearnZoneParamList = {
  PlayMainScreen: undefined;
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
      <Stack.Screen name="PlayMainScreen" component={PlayMainScreen} />
      <Stack.Screen name="BalloonGame" component={BalloonGame} />
      <Stack.Screen name="Game" component={Game} />
    </Stack.Navigator>
  );
};

export default PlaySpace;
