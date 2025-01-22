// app/(main)/LearnZone/ReadWithMe.tsx

/*
This is the main screen for the ReadWithMe feature.
It contains the ChatInterface component.
*/
import React from 'react';
import { View, StyleSheet } from 'react-native';
import FileDirectory from './ReadWithME/FileDirectory';
import OnboardingScreen from './ReadWithME/OnboardingScreen';
import Scan from './ReadWithME/Scan';


const ReadWithMe = () => {
  return (
    <View style={styles.container}>
      <Scan />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ReadWithMe;
