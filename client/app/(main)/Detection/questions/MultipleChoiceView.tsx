import theme from "@/src/theme";
import { QuestionResponseDTO } from "@/src/types/Detection/Question";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from '@/src/context/ThemeContext';

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

  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
    },
    questionTitle: {
      fontSize: theme.fonts.sizes.s24,
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
      fontSize: theme.fonts.sizes.s20,
    },
  });
  
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
