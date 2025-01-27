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
        <View style={styles.innercontainer}></View>
      </View>
    </View>
  );
};

export default Exit;
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
    justifyContent: "center",
    textAlign: "center",
  },
  text: {
    top: 20,
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
    flexDirection: "row",
    justifyContent: "center",
    top: 60,
    flex: 2,
    backgroundColor: "#FDF4DE",
    borderRadius: 30,
    height: "100%",
  },

});
