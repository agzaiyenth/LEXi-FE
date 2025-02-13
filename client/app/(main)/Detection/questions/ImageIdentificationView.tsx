import React, { useState } from "react";
import { View, Image, TextInput, StyleSheet, Text } from "react-native";

interface Props {
  imageUrl: string;
  onSelect: (answer: string) => void;
}

const ImageIdentificationView: React.FC<Props> = ({ imageUrl, onSelect }) => {
  const [userAnswer, setUserAnswer] = useState("");

  const handleAnswerChange = (text: string) => {
    setUserAnswer(text);
    onSelect(text); // Send the answer up to the parent
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>Identify the image below:</Text>
      <Image source={{ uri: imageUrl }} style={styles.image} />

      <TextInput
        style={styles.input}
        placeholder="Type your answer..."
        value={userAnswer}
        onChangeText={handleAnswerChange}
      />
    </View>
  );
};

export default ImageIdentificationView;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
    borderRadius: 10,
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    textAlign: "center",
  },
});
