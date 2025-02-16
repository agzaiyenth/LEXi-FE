import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import theme from "@/src/theme";
import EvilIcons from "@expo/vector-icons/EvilIcons";

const Scan = () => {
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
          <View style={styles.scanPicBorder}>
            <Image
              source={require("@/assets/images/scan.png")}
              style={styles.scanPic}
              resizeMode="contain"
              accessible
              accessibilityLabel="Upload Icon"
            />
            <Image
              source={require("@/assets/images/books-backdrop.png")}
              style={styles.booksBackdropPic}
              resizeMode="contain"
              accessible
              accessibilityLabel="Upload Icon"
            />
            <Image
              source={require("@/assets/images/Lexi-moscot.png")}
              style={styles.lexiMoscot}
              resizeMode="contain"
              accessible
              accessibilityLabel="Upload Icon"
            />
            <Text style={styles.scanText}>
              Align the text within {"\n"} the box to scan
            </Text>
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => {
                console.log("Button pressed");
              }}
            >
              <Text style={styles.scanButtonText}>Scan a Page</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Scan;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    fontFamily: "Poppins",
  },
  container: {
    flex: 1,
    backgroundColor: "#9AC3BB",
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
  scanPicBorder: {
    borderWidth: 5,
    borderColor: "#F9BE7C",
    borderStyle: "dotted",
    padding: 10,
    width: 350,
    height: 250,
    top: -180,
  },
  scanPic: {
    marginLeft: 60,
    marginTop: 10,
    height: 200,
    width: 200,
  },
  booksBackdropPic: {
    marginLeft: 100,
    top: 150,
    height: 150,
  },
  lexiMoscot: {
    left: -10,
    top: 20,
  },
  scanText: {
    textAlign: "center",
    top: -90,
    left: 90,
    color: theme.colors.blacks.medium,
    fontSize: 20,
  },
  scanButton: {
    width: 200,
    height: 50,
    left: 80,
    top: -30,
    backgroundColor: "#009FA5",
    borderRadius: 50,
  },
  scanButtonText: {
    fontSize: 23,
    textAlign: "center",
    padding: 3,
    color: theme.colors.background.beige,
  },
});
