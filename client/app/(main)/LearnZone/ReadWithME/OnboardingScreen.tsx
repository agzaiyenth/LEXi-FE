import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import theme from "@/src/theme";
import ReadWithMeNavigator from "./ReadWithMeNavigator";

const OnboardingScreen = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.header}>Read With {"\n"} Me</Text>
        <Text style={styles.body}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel dolorum
          dolore asperiores cupiditate voluptatem
        </Text>
        <Image
          source={require("@/assets/images/auth/centerImage.png")}
          style={styles.centerImage}
          resizeMode="contain"
          accessible
          accessibilityLabel="Upload Icon"
        />
        <TouchableOpacity style={styles.getStartedButton}>
          <Text style={styles.getStartedButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    fontFamily: "Poppins",
    zIndex: 0,
  },
  container: {
    paddingTop: 15,
    flex: 1,
    backgroundColor: "#9AC3BB",
    padding: 12,
  },
  header: {
    paddingTop: 30,
    color: theme.colors.background.offWhite,
    padding: 12,
    justifyContent: "center",
    textAlign: "center",
    fontSize: 40,
  },
  body: {
    paddingTop: 50,
    fontSize: 15,
    lineHeight: 30,
    fontWeight: "400",
    textAlign: "center",
    color: theme.colors.background.offWhite,
  },
  centerImage: {
    width: "100%",
    height: 430,
    alignSelf: "center",
    top: 50,
  },
  getStartedButton: {
    backgroundColor: theme.colors.primary.dark3,
    padding: 12,
    borderRadius: 40,
    marginTop: 30,
    width: "65%",
    alignSelf: "center",
    textAlign: "center",
  },
  getStartedButtonText: {
    color: theme.colors.background.offWhite,
    textAlign: "center",
    fontSize: 20,
  },
});

export default OnboardingScreen;
