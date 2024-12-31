import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated, Dimensions, Text } from "react-native";

const AudioInteractiveAnimation = ({ audioData }: { audioData: Int16Array | null }) => {
  const [volume, setVolume] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (audioData) {
      // Calculate Root Mean Square (RMS) to determine volume
      const rms = Math.sqrt(
        audioData.reduce((sum, value) => sum + value ** 2, 0) / audioData.length
      );
      setVolume(rms / 32767); // Normalize by max Int16 value
    }
  }, [audioData]);

  useEffect(() => {
    // Animate the circle size based on the volume
    Animated.timing(animation, {
      toValue: volume * 200, // Scale volume to size
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [volume]);

  const size = animation.interpolate({
    inputRange: [0, 200],
    outputRange: [50, Dimensions.get("window").width - 50],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          { width: size, height: size, borderRadius: size },
        ]}
      />
      <Text style={styles.volumeText}>Volume: {volume.toFixed(2)}</Text>
    </View>
  );
};

export default AudioInteractiveAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    backgroundColor: "#1E90FF",
  },
  volumeText: {
    marginTop: 20,
    fontSize: 18,
    color: "#FFF",
  },
});
