// app/(main)/LearnZone/ReadWithMe.tsx

/*
This is the main screen for the ReadWithMe feature.
It contains the ChatInterface component.
*/
import React from "react";
import { StyleSheet, View } from "react-native";
import Exit from "./ReadWithME/Exit";

const ReadWithMe = () => {
  return (
    <View style={styles.container}>
      <Exit />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ReadWithMe;
