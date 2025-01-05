import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import PlayScreen from './(main)/PlaySpace';
import PopTheBalloonGame from './(main)/PlaySpace/PopBalloon';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PlayScreen">
        <Stack.Screen name="PlayScreen" component={PlayScreen} />
        <Stack.Screen name="PopTheBalloonGame" component={PopTheBalloonGame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
