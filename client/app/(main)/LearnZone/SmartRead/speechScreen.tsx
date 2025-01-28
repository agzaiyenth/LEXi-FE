import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For the back icon
import { theme } from "../../../../src/theme";

export default function SpeechScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={30} color={theme.colors.primary.dark1} />
        </TouchableOpacity>
        <Text style={styles.headerText}>SmartRead</Text>
      </View>


      {/* Audio Controls */}
      <View style={styles.audioContainer}>
        <View style={styles.audioWaveform}>
          {/* Simulated waveform */}
          {Array.from({ length: 10 }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.wave,
                { height: Math.random() * 40 + 20 }, // Random height for visual effect
              ]}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.listenButton}>
          <Text style={styles.listenButtonText}>LISTEN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="pause-circle" size={50} color={theme.colors.primary.medium} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.offWhite,
    padding: theme.spacing.medium,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.large,
  },
  headerText: {
    marginLeft: theme.spacing.medium,
    fontSize: theme.fonts.sizes.large,
    fontFamily: theme.fonts.bold,
    color: theme.colors.primary.dark1,
  },
  paragraphContainer: {
    backgroundColor: theme.colors.background.beige,
    borderRadius: theme.spacing.small,
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.large,
  },
  paragraph: {
    fontSize: theme.fonts.sizes.medium,
    fontFamily: theme.fonts.regular,
    color: theme.colors.blacks.medium,
    lineHeight: 30,
  },
  highlight: {
    backgroundColor: theme.colors.primary.light2,
    borderRadius: 4,
    paddingHorizontal: 4,
    color: theme.colors.primary.dark1,
    fontFamily: theme.fonts.bold,
  },
  audioContainer: {
    alignItems: "center",
    marginTop: theme.spacing.large,
  },
  audioWaveform: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: theme.spacing.medium,
  },
  wave: {
    width: 6,
    marginHorizontal: 2,
    backgroundColor: theme.colors.primary.medium,
    borderRadius: 3,
  },
  listenButton: {
    backgroundColor: theme.colors.primary.medium,
    borderRadius: theme.spacing.large,
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.extraLarge,
    marginBottom: theme.spacing.medium,
  },
  listenButtonText: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.background.offWhite,
    fontFamily: theme.fonts.bold,
  },
});
