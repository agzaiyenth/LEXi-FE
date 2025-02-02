import React from 'react';
import { View, StyleSheet } from 'react-native';
import PopTheBalloonGame from './PopBalloon';
import Game from './PopBalloon/game';

const GameB = () => {
  return (
    <View style={styles.container}>
      <Game/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#CCE5E1', 
  },
});

export default GameB;
