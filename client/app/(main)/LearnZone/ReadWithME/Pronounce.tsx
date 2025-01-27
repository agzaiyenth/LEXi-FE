import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import theme from "../../../../src/theme";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

const Pronounce = () => {
  const handleBackward = () => {
    console.log("Backward button pressed");
  };

  const handlePause = () => {
    console.log("Pause button pressed");
  };

  const handleForward = () => {
    console.log("Forward button pressed");
  };
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
            source={require("@/assets/images/readingText.png")}
            style={styles.readingText}
            resizeMode="contain"
            accessible
            accessibilityLabel="Upload Icon"
          />
          <Image
            source={require("@/assets/images/Rectangle 52.png")}
            style={styles.Rectangle52}
            resizeMode="contain"
            accessible
            accessibilityLabel="Upload Icon"
          />
          {/* Controls container */}
          <View style={styles.controls}>
            <TouchableOpacity onPress={handleBackward} style={styles.button}>
              <AntDesign name="banckward" size={10} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePause} style={styles.button}>
              <AntDesign name="pausecircle" size={10} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForward} style={styles.button}>
              <AntDesign name="forward" size={10} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Pronounce;
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
  readingText: {
    width: 470,
    height: 470,
  },
  Rectangle52: {
    top: -80,
    width: 400,
  },
  controls: {
    zIndex: 2,
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    top: -50,
    
  },
  button: {
    padding: 10,
    
  },
});
