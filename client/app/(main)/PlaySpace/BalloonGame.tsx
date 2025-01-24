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
    flex: 1, // Ensures the View takes the full screen
    backgroundColor: '#CCE5E1', // Same background as PopTheBalloonGame for consistency
  },
});

export default BaloonGame;
