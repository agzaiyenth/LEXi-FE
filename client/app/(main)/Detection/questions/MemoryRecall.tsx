import React, { useState, useRef, useEffect } from "react";
import { 
  View, 
  Image, 
  TextInput, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  Animated 
} from "react-native";
import theme from "@/src/theme";
import { QuestionResponseDTO } from "@/src/types/Detection/Question";

interface Props {
  question: QuestionResponseDTO;
  onSelect: (answer: string) => void;
}

const MemoryRecall: React.FC<Props> = ({ question, onSelect }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswering, setIsAnswering] = useState(false);

  // Animated values for fading the question out and the input in
  const questionOpacity = useRef(new Animated.Value(1)).current;
  const inputOpacity = useRef(new Animated.Value(0)).current;

  const handleAnswerChange = (text: string) => {
    setUserAnswer(text);
    onSelect(text);
  };

  const handleTypeAnswer = () => {
    // Animate question fading out
    Animated.timing(questionOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setIsAnswering(true);
      // After question is hidden, animate input fade in
      Animated.timing(inputOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      {!isAnswering && (
        <Animated.View style={{ opacity: questionOpacity }}>
          <Text style={styles.questionText}>{question.questionText}</Text>
          <TouchableOpacity style={styles.button} onPress={handleTypeAnswer}>
            <Text style={styles.buttonText}>Type Answer</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {isAnswering && (
        <Animated.View style={{ opacity: inputOpacity }}>
          <TextInput
            style={styles.input}
            placeholder="Type your answer..."
            placeholderTextColor="black"
            value={userAnswer}
            onChangeText={handleAnswerChange}
            autoFocus={true}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default MemoryRecall;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 20,
    padding: 20,
    margin: 20,
  },
  questionText: {
    fontSize: theme.fonts.sizes.s26,
    marginBottom: 30,
    marginVertical: 10,
    textAlign: "center",
    color: "#1D3557",
  },
  input: {
    width: "90%",
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.primary.light3,
    borderRadius: 20,
    textAlign: "center",
    color: "black",
  },
  button: {
    backgroundColor: theme.colors.primary.light3,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
