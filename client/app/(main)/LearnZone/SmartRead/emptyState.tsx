import theme from "@/src/theme";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface EmptyStateProps {
  param: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ param }) => {
  return (
    <View style={styles.container}>

      <Text style={styles.text}>No {param} found!</Text>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      bottom:10,
      backgroundColor:"#fff",
      width:300,
      borderRadius:20,
      padding:10,
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#555",
        textAlign: "center",
      },
});    