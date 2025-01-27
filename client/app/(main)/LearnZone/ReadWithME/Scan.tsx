import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import theme from "../../../../src/theme";
import EvilIcons from "@expo/vector-icons/EvilIcons";

const Scan = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.text}>Read With Me</Text>
        <EvilIcons name="arrow-left" style={styles.leftarrow} />
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
  innercontainer: {
    flexDirection: "row",
    justifyContent: "center",
    top: 60,
    flex: 2,
    backgroundColor: "#FDF4DE",
    borderRadius: 30,
    height: "100%",
  },
  scanPicBorder: {
    borderWidth: 5,
    borderColor: "#F9BE7C",
    borderStyle: "dotted",
    padding: 10,
    width: 350,
    height: 250,
    top: 100,
  },
  scanPic: {
    marginLeft: 60,
    marginTop: 10,
    height: 200,
    width: 200,
  },
  booksBackdropPic: {
    marginLeft: 100,
    top: 240,
  },
  lexiMoscot: {
    left: -20,
    top:40,
  },
  scanText: {
    textAlign: "center",
    top: -50,
    left: 90,
    color: theme.colors.blacks.medium,
    fontSize: 20,
  },
  scanButton: {
    width: 180,
    height: 40,
    left: 60,
    backgroundColor:"#009FA5",
    borderRadius:50,
  },
  scanButtonText:{
    fontSize:23,
    textAlign:"center",
    padding:3,
    color:theme.colors.background.beige,
  },
});
