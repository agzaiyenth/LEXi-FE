import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import theme from '@/src/theme';
import TherapistImage from '@/assets/images/therapist/therapist.jpg';

interface EmptyStateProps {
  param: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ param }) => {
  return (
    <View style={styles.container}>
      <Image
        source={TherapistImage}
        style={styles.image} />

      <Text style={styles.text}>No {param} found!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
    backgroundColor: "#fff",
    width: 300,
    borderRadius: 20,
    padding: 10,
  },
  text: {
    fontSize: theme.fonts.sizes.s18,
    fontWeight: "bold",
    color: "#555",
    textAlign: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    top: 10,
  },
});

export default EmptyState;
