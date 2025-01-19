// app/(main)/LearnZone/ReadWithMe.tsx

/*
This is the main screen for the ReadWithMe feature.
It contains the ChatInterface component.
*/
import React from 'react';
import { View, StyleSheet } from 'react-native';
import FileDirectory from './ReadWithME/FileDirectory';


const ReadWithMe = () => {
  return (
    <View style={styles.container}>
      <FileDirectory />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ReadWithMe;
