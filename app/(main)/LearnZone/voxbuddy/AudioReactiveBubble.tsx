import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface AudioReactiveVisualizerProps {
  audioData: Int16Array | null;
}

export default function AudioReactiveVisualizer({
  audioData,
}: AudioReactiveVisualizerProps) {
  // Shared values for each circle's scale
  const scales = useRef(
    Array(5)
      .fill(null)
      .map(() => useSharedValue(1))
  ).current;

  // Process audio data to extract frequencies
  useEffect(() => {
    if (audioData) {
      const frequencyData = Array.from(audioData).slice(0, 5); // Use the first 5 frequencies
      const normalizedFrequencies = frequencyData.map(
        (value) => Math.abs(value / 32767) // Normalize to 0-1 range
      );

      normalizedFrequencies.forEach((value, index) => {
        scales[index].value = withTiming(1 + value, {
          duration: 100,
          easing: Easing.out(Easing.cubic),
        });
      });
    }
  }, [audioData, scales]);

  // Animated styles for each circle
  const animatedStyles = scales.map((scale) =>
    useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }))
  );

  return (
    <View style={styles.container}>
      {animatedStyles.map((style, index) => (
        <Animated.View
          key={index}
          style={[styles.circle, styles[`circle${index + 1}`], style]}
        />
      ))}
    </View>
  );
}

const styles: { [key: string]: any } = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  circle: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#44555d",
  },
  circle1: {
    backgroundColor: "#648899",
  },
  circle2: {
    backgroundColor: "#557788",
  },
  circle3: {
    backgroundColor: "#446677",
  },
  circle4: {
    backgroundColor: "#335566",
  },
  circle5: {
    backgroundColor: "#224455",
  },
});
