// app/(main)/LearnZone/VoxBuddy.tsx

/*
This is the main screen for the VoxBuddy feature.
It contains the ChatInterface component.
*/
import React from 'react';
import { View, StyleSheet } from 'react-native';

const VoxBuddy = () => {
  return (
    <View style={styles.container}>
      <ChatInterface />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default VoxBuddy;
