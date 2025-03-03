import theme from "@/src/theme";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "expo-router";

interface EmptyStateProps {
  param: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ param }) => {
  const navigation = useNavigation<StackNavigationProp<any, "SmartReadMain">>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>No {param} found!</Text>
      <Image
        source={require("@/assets/images/Asset_12.png")}
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.UploadButton}
        onPress={() => navigation.navigate("UploadScreen")}
        accessible
        accessibilityLabel="Browse files to upload"
      >
        <Text style={styles.UploadButtonText}>UPLOAD DOCUMENT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    bottom: 100,
    height: 500,
    width: 300,
    borderRadius: 20,
    padding: 10,
    top: 4,
  },
  text: {
    fontSize: 28,
    fontWeight: "700",
    color: "#555",
    textAlign: "center",
    top: 50,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: -20,
    left:-10,
    top: 100,
  },
  UploadButton: {
    backgroundColor: "#2F9397",
    borderRadius: 10,
    padding: 10,
    marginTop: 200,
  },
  UploadButtonText: {
    color: theme.colors.background.beige,
    fontSize: theme.fonts.sizes.medium,
    fontWeight: "bold",
    padding:4,
  },
});

export default EmptyState;
