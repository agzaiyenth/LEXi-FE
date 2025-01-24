import React from 'react';
import { View, StyleSheet } from 'react-native';
import PopTheBalloonGame from './PopBalloon';

const BaloonGame = () => {
  return (
    <View style={styles.container}>
      <PopTheBalloonGame />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#CCE5E1', 
  },
});

export default BaloonGame;
