import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import theme from "../../../../src/theme";
import EvilIcons from "@expo/vector-icons/EvilIcons";

const Exit = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.text}>Read With Me</Text>
        <EvilIcons name="arrow-left" style={styles.leftarrow} />
        <Image
          source={require("@/assets/images/Ellipse.png")}
          style={styles.Ellipse}
          resizeMode="contain"
          accessible
          accessibilityLabel="Upload Icon"
        />
        <View style={styles.innercontainer}>
          <Image
            source={require("@/assets/images/reward.png")}
            style={styles.reward}
            resizeMode="contain"
            accessible
            accessibilityLabel="Upload Icon"
          />
          <Image
            source={require("@/assets/images/Group 24.png")}
            style={styles.Group24}
            resizeMode="contain"
            accessible
            accessibilityLabel="Upload Icon"
          />
          <Text style={styles.wellDoneText}>Well Done !</Text>
          <Image
            source={require("@/assets/images/Stars.png")}
            style={styles.Stars}
            resizeMode="contain"
            accessible
            accessibilityLabel="Upload Icon"
          />
          <Text style={styles.feedback}>
            Total Words: 33 {"\n"} Correct Words: 25 {"\n"} Words Skipped: 8
          </Text>
          <Image
            source={require("@/assets/images/books-backdrop.png")}
            style={styles.booksBackdropPic}
            resizeMode="contain"
            accessible
            accessibilityLabel="Upload Icon"
          />
        </View>
      </View>
    </View>
  );
};

export default Exit;
const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    fontFamily: "Poppins",
  },
  container: {
    flex: 1,
    backgroundColor: "#9AC3BB",
    position: "relative",
  },
  text: {
    top: 35,
    fontSize: 25,
    lineHeight: 30,
    fontWeight: "400",
    textAlign: "center",
    color: theme.colors.background.offWhite,
  },
  leftarrow: {
    position: "absolute",
    top: 20,
    left: 20,
    fontSize: 60,
    color: theme.colors.background.offWhite,
  },
  Ellipse: {
    width: 150,
    height: 150,
    alignSelf: "flex-end",
    top: -30,
  },
  innercontainer: {
    top: -70,
    backgroundColor: "#FDF4DE",
    borderRadius: 30,
    flexDirection: "column", // Ensure a column layout for stacking
    justifyContent: "center",
    alignItems: "center", // Center items horizontally
    height: "100%",
  },
  reward: {
    width: 450,
    height: 450,
    alignSelf: "center",
    position: "absolute",
    top: -10,
  },
  Group24: {
    width: 170,
    height: 235,
    alignSelf: "center",
    position: "absolute",
    top: 80,
  },
  wellDoneText: {
    fontSize: 40,
    fontWeight: "600",
    textAlign: "center",
    color: "#F19336",
    position: "absolute",
    top: 370,
  },
  Stars: {
    width: 200,
    height: 50,
    alignSelf: "center",
    position: "absolute",
    top: 425,
  },
  feedback: {
    fontSize: 20,
    lineHeight: 35,
    color: "#8F8877",
    position: "absolute",
    top: 490, 
    zIndex: 5, 
  },
  booksBackdropPic:{
    width: 150,
    height: 150,
    top: 220,
    left: -10,
    zIndex: 1,
  },
});
