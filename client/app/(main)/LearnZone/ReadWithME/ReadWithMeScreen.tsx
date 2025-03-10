import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { theme } from "@/src/theme"; // Import theme

export default function ReadWithMeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle-outline" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>ReadWithME</Text>
      </View>

      {/* Text Prompt */}
      <View style={styles.textContainer}>
        <Text style={styles.textPrompt}>Try to read</Text>
      </View>

      {/* Microphone Button */}
      <TouchableOpacity style={styles.micButton}>
        <Ionicons name="mic" size={50} color={theme.colors.primary.medium} />
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.offWhite,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    position: "absolute",
    top: 40,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: theme.fonts.sizes.medium,
    color: "white",
    marginLeft: 10,
  },
  textContainer: {
    backgroundColor: theme.colors.secondary.light2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textPrompt: {
    fontSize: theme.fonts.sizes.large,
    color: theme.colors.blacks.medium,
    fontFamily: theme.fonts.regular,
  },
  micButton: {
    marginTop: 40,
    backgroundColor: theme.colors.primary.light,
    padding: 20,
    borderRadius: 50,
  },
});
