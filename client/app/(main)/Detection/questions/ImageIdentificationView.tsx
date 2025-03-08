import theme from "@/src/theme";
import { QuestionResponseDTO } from "@/src/types/Detection/Question";
import React, { useState } from "react";
import { View, Image, TextInput, StyleSheet, Text } from "react-native";
import { useTheme } from '@/src/context/ThemeContext';

interface Props {
  question: QuestionResponseDTO;
  onSelect: (answer: string) => void;
}

const ImageIdentificationView: React.FC<Props> = ({ question, onSelect }) => {
  const [userAnswer, setUserAnswer] = useState("");

  const handleAnswerChange = (text: string) => {
    setUserAnswer(text);
    onSelect(text);
  };

  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      borderRadius: 20,
      padding: 20,
      margin: 20,
    },
    questionText: {
      fontSize: theme.fonts.sizes.s26,
      marginBottom:30,
      marginVertical: 10,
      textAlign: "center",
      color: "#1D3557",
    },
    image: {
      width: 300,
      height: 200,
      borderRadius: 10,
      marginBottom: 30,
    },
    input: {
      width: "90%",
      padding: 10,
      borderWidth: 1,
      borderColor: theme.colors.primary.light3,
      borderRadius: 20,
      textAlign: "center",
      color:'black',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.questionText}</Text>
      <Image source={{ uri: question.mediaUrl }}
       style={styles.image} />
      
      <TextInput
      style={styles.input}
      placeholder="Type your answer..."
      placeholderTextColor="black"
      value={userAnswer}
      onChangeText={handleAnswerChange}
      />
    </View>
  );
};

export default ImageIdentificationView;

