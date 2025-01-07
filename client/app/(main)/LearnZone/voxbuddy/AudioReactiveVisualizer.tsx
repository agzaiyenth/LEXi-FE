import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { BlurView } from "expo-blur";
import Svg, { Defs, RadialGradient, Stop, Circle } from "react-native-svg";

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

  const breathingScale = useRef(new Animated.Value(1)).current; // For breathing animation

  // Breathing animation loop
  useEffect(() => {
    const loopBreathing = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(breathingScale, {
            toValue: 1.1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(breathingScale, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    loopBreathing();
  }, [breathingScale]);

  // React to audio data
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
    transform: [
      { scale: Animated.multiply(scale, breathingScale) }, // Combine breathing with audio
    ],
  }));

  return (
    <View style={styles.container}>
      {animatedStyles.map((style, index) => (
        <Animated.View
          key={index}
          style={[styles.circle, styles[`circle${index + 1}`], style]}
        />
      ))}
      {/* Glassmorphic BlurView with Pattern */}
      <BlurView intensity={50} style={[styles.circle, styles.glassCircle]}>
        <Svg height="100%" width="100%">
          <Defs>
            <RadialGradient
              id="grad"
              cx="50%"
              cy="50%"
              rx="50%"
              ry="50%"
              fx="50%"
              fy="50%"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
              <Stop offset="100%" stopColor="#000" stopOpacity="0.1" />
            </RadialGradient>
          </Defs>
          <Circle cx="50%" cy="50%" r="50%" fill="url(#grad)" />
        </Svg>
      </BlurView>
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
    overflow: "hidden",
  },
  circle1: {
    backgroundColor: "rgba(4, 119, 123, 0.8)",
  },
  
  glassCircle: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 100,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
});
