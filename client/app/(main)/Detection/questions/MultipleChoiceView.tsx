import theme from "@/src/theme";
import { QuestionResponseDTO } from "@/types/Detection/Question";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  question: QuestionResponseDTO;
  onSelect: (answer: string) => void;
}

export default function MultipleChoiceView({ question, onSelect }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleSelect = (answer: string) => {
    setSelectedAnswer(answer);
    onSelect(answer);
  };

  return (
    <View>
      <Text style={styles.questionTitle}>{question.questionText}</Text>

      <View style={styles.answerContainer}>
        {question.options?.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton,
              selectedAnswer === option && styles.selectedAnswerButton
            ]}
            onPress={() => handleSelect(option)}
          >
            <Text style={styles.answerText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  questionTitle: {
    fontSize: 24,
    textAlign: 'center',
    paddingBottom: 20,
  },
  answerContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  answerButton: {
    width: '48%',
    marginBottom: 10,
    backgroundColor: theme.colors.primary.light3,
    padding: 20,
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  selectedAnswerButton: {
    backgroundColor: theme.colors.primary.dark2,
  },
  answerText: {
    color: 'white',
    fontSize: 20,
  },
});