// app/(main)/LearnZone/VoxBuddy.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChatInterface from './voxbuddy/ChatInterface';

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
