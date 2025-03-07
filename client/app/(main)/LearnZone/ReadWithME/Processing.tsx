import BooksBackdropImage from "@/assets/images/books-backdrop.png";
import EclipseImage from "@/assets/images/Ellipse.png";
import ProcessingImage from "@/assets/images/processing.png";
import RectangleImage from "@/assets/images/RectangleBorder.png";
import theme from "@/src/theme";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from '@/src/context/ThemeContext';

const Processing = () => {
  const { theme } = useTheme();

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
      fontSize: theme.fonts.sizes.s26,
      lineHeight: 30,
      fontWeight: "400",
      textAlign: "center",
      color: theme.colors.background.offWhite,
    },
    leftarrow: {
      position: "absolute",
      top: 20,
      left: 20,
      fontSize: theme.fonts.sizes.s40,
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
    RectangleBorder: {
      width: 350,
      height: 300,
      alignSelf: "center",
      position: "relative", // Allow absolute positioning for children
      top: -20,
    },
    processing: {
      width: 200, // Adjust size to fit inside the rectangle
      height: 200,
      position: "absolute", // Position relative to RectangleBorder
      top: 230,
      left: 160,
      transform: [{ translateX: -50 }, { translateY: -50 }], // Center the image
    },
    booksBackdropPic: {
      width: 150,
      height: 150,
      top: 150,
      left: 55,
      transform: [{ translateX: -50 }, { translateY: -50 }], // Center the image
    },
    scanButton: {
      width: 350,
      height: 50,
      left: 10,
      backgroundColor: "#009FA5",
      borderRadius: 50,
      top: 30,
    },
    scanButtonText: {
      fontSize: theme.fonts.sizes.s24,
      textAlign: "center",
      padding: 6,
      color: theme.colors.background.beige,
    },
  });
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.text}>Read With Me</Text>
        <EvilIcons name="arrow-left" style={styles.leftarrow} />
        <Image
          source={EclipseImage}
          style={styles.Ellipse}
          resizeMode="contain"
          accessible
          accessibilityLabel="Upload Icon"
        />
        <View style={styles.innercontainer}>
          <Image
            source={RectangleImage}
            style={styles.RectangleBorder}
            resizeMode="contain"
            accessible
            accessibilityLabel="Upload Icon"
          />
          <Image
            source={ProcessingImage}
            style={styles.processing}
            resizeMode="contain"
            accessible
            accessibilityLabel="Upload Icon"
            tintColor={"grey"}
          />
          <Image
            source={BooksBackdropImage}
            style={styles.booksBackdropPic}
            resizeMode="contain"
            accessible
            accessibilityLabel="Books Backdrop Image"

          />
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => {
              console.log("Button pressed");
            }}
          >
            <Text style={styles.scanButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Processing;
