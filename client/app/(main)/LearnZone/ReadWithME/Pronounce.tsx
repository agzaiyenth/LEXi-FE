import theme from "@/src/theme";
import Entypo from '@expo/vector-icons/Entypo';
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from '@expo/vector-icons/Ionicons';
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import EllipseImage from "@/assets/images/Ellipse.png";
import ReadingTextImage from "@/assets/images/readingText.png";
import Rectangle52Image from "@/assets/images/Rectangle 52.png";
import { useTheme } from '@/src/context/ThemeContext';

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
      position: "relative",
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
    readingText: {
      marginTop: 40,
      width: 470,
      height: 470,
    },
    Rectangle52: {
      top: -80,
      width: 400,
    },
    controls: {
      zIndex: -1,
      position: "relative",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
  
  
      borderWidth: 3,
    },
    button: {
      padding: 10,
      zIndex: 1000,
    },
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.text}>Read With Me</Text>
        <EvilIcons name="arrow-left" style={styles.leftarrow} />
        <Image
          source={EllipseImage}
          style={styles.Ellipse}
          resizeMode="contain"
          accessible
          accessibilityLabel="Upload Icon"
        />
        <View style={styles.innercontainer}>
          <Image
            source={ReadingTextImage}
            style={styles.readingText}
            resizeMode="contain"
            accessible
            accessibilityLabel="Upload Icon"
          />
          <Image
            source={Rectangle52Image}
            style={styles.Rectangle52}
            resizeMode="contain"
            accessible
            accessibilityLabel="Upload Icon"
          />

          <View style={[styles.controls, { borderColor: 'red', borderWidth: 1 }]}>
            <TouchableOpacity onPress={handleBackward} style={styles.button}>
              <Entypo name="controller-fast-backward" size={24} color="black" />

            </TouchableOpacity>
            <TouchableOpacity onPress={handlePause} style={styles.button}>
              <Ionicons name="pause-circle-sharp" size={24} color="black" />

            </TouchableOpacity>
            <TouchableOpacity onPress={handleForward} style={styles.button}>
              <Entypo name="controller-fast-forward" size={24} color="black" />

            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Pronounce;
