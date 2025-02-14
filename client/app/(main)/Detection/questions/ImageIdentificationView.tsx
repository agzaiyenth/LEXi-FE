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
    onSelect(text);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.questionText}>Identify the image below:</Text>
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
    backgroundColor: "#A8DADC",
    borderRadius: 20,
    padding: 20,
    margin: 20,
  },
  questionText: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: "center",
    color: "#1D3557",
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#457B9D",
    borderRadius: 5,
    textAlign: "center",
    backgroundColor: "#F1FAEE",
  },
});
