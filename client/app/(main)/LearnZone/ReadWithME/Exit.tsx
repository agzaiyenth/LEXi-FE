import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CircleImage from "@/assets/images/learnZone/circle.png";
import { useTheme } from "@/src/context/ThemeContext";
import { LearnZoneParamList } from "./navigator";
import theme from "@/src/theme";
import Eclipse from "@/assets/Ellipse.png";

type NavigationProp = StackNavigationProp<
  LearnZoneParamList,
  "Exit",
  "ReadWithMeScreen"
>;
const Exit = () => {
  const navigation = useNavigation<NavigationProp>();

  const styles = StyleSheet.create({
    wrapper: { width: "100%", height: "100%" },
    container: { flex: 1, backgroundColor: "#9AC3BB", position: "relative" },
    headercircle: {
      width: 120,
      height: 120,
      position: "absolute",
      right: 0,
      top: 0,
    },
    text: {
      top: 35,
      fontSize: theme.fonts.sizes.large,
      lineHeight: 30,
      fontWeight: "400",
      textAlign: "center",
      color: theme.colors.background.offWhite,
    },
    backButton: {
      marginLeft: 20,
    },
    innercontainer: {
      top: 35,
      backgroundColor: "#FDF4DE",
      borderRadius: 25,
      height: "90%",
      padding: 20,
    },
    textContainer: {
      borderRadius: 25,
      backgroundColor: "Black",
      height: "73%",
      padding: 30,
      zIndex: 10,
    },
    innertext: {
      fontSize: theme.fonts.sizes.large,
      lineHeight: 30,
      fontWeight: "400",
      textAlign: "center",
      color: theme.colors.primary.dark1,
    },
    ringImage: {
      top: 100,
      left:35,
      width: 300,
      height: 300,
      position: "absolute",
    },
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image source={CircleImage} style={styles.headercircle} />
        <Text style={styles.text}>Read With Me</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-circle-outline" size={40} color="white" />
        </TouchableOpacity>

        {/* Score Screen */}
        <View style={styles.innercontainer}>
          <View style={styles.textContainer}>
            <Text style={styles.innertext}> Congratulations! </Text>
            <Image source={Eclipse} style={styles.ringImage} />
          </View>
        </View>
      </View>
    </View>
  );
};
export default Exit;
