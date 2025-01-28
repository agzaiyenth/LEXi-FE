// app/(main)/LearnZone/SmartRead.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import UploadScreen from './SmartRead/uploadScreen';
import SpeechScreen from './SmartRead/speechScreen';


const SmartRead = () => {
  return (
    <View style={styles.container}>
     <UploadScreen/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SmartRead;
