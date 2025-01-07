import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";

interface AudioReactiveVisualizerProps {
  audioData: Int16Array | null;
}

export default function AudioReactiveVisualizer({
  audioData,
}: AudioReactiveVisualizerProps) {
  // Animated values for each circle's scale
  const scales = useRef(
    Array(5)
      .fill(null)
      .map(() => new Animated.Value(1))
  ).current;

  // Process audio data to extract frequencies
  useEffect(() => {
    if (audioData) {
      const frequencyData = Array.from(audioData).slice(0, 5); // Use the first 5 frequencies
      const normalizedFrequencies = frequencyData.map(
        (value) => Math.abs(value / 32767) // Normalize to 0-1 range
      );

      normalizedFrequencies.forEach((value, index) => {
        Animated.timing(scales[index], {
          toValue: 1 + value,
          duration: 100,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [audioData, scales]);

  // Animated styles for each circle
  const animatedStyles = scales.map((scale) => ({
    transform: [{ scale }],
  }));
  useEffect(() => {
    if (audioData) {
      // Compute the normalized RMS amplitude or frequencies
      const frequencyData = Array.from(audioData).slice(0, 5); // Simplify for visualization
      const normalizedFrequencies = frequencyData.map(
        (value) => Math.abs(value / 32767) // Normalize to 0-1 range
      );
  
      // Dynamically adjust animation duration based on buffer size
      const bufferDuration = (audioData.length / 44100) * 1000; // Assuming 44.1kHz sample rate
  
      normalizedFrequencies.forEach((value, index) => {
        Animated.timing(scales[index], {
          toValue: 1 + value,
          duration: bufferDuration,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [audioData, scales]);
  
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
    backgroundColor: "#acd4d5",
  },
  circle1: {
    backgroundColor: "#9ac3bb",
  },
  circle2: {
    backgroundColor: "#82bec1",
  },
  circle3: {
    backgroundColor: "#59a9ac",
  },
  circle4: {
    backgroundColor: "#2f9397",
  },
  circle5: {
    backgroundColor: "#03767a",
  },
});
