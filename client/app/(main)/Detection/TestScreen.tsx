import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Button, StyleSheet } from "react-native";
import MultipleChoiceView from "./questions/MultipleChoiceView";
import ImageIdentificationView from "./questions/ImageIdentificationView";
import TextInputView from "./questions/TextInputView";
import SequenceOrderView from "./questions/SequenceOrderView";
import { QuestionType } from "@/types/Detection/Question";
import { useFetchQuestion } from "@/src/hooks/detection/useFetchQuestion";
import { useSubmitAnswer } from "@/src/hooks/detection/useSubmitAnswer";

interface TestScreenProps {
  route: {
    params: {
      sessionId: number;
    };
  };
}

export default function TestScreen({ route }: TestScreenProps) {
  const { sessionId } = route.params;
  const { question, loading, fetchQuestion } = useFetchQuestion(sessionId);
  const { submitAnswer, loading: submitting } = useSubmitAnswer();

  const [userAnswer, setUserAnswer] = useState<string>("");

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleSubmit = async () => {
    if (!question) return;

    const answerData = {
      testSessionId: sessionId,
      questionId: question.questionId,
      userAnswer,
      responseTime: 2000,
    };

    await submitAnswer(answerData);
    setUserAnswer("");
    fetchQuestion();
  };

  if (loading || !question) return <ActivityIndicator size="large" />;

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.difficultyText}>Difficulty: {question.difficulty}</Text>
        <Text style={styles.sessionText}>Session Id: {sessionId}</Text>
        <Text style={styles.questionText}>{question.questionText}</Text>

        {question.questionType === QuestionType.MULTIPLE_CHOICE && (
          <MultipleChoiceView options={question.options || []} onSelect={setUserAnswer} />
        )}

        {question.questionType === QuestionType.IMAGE_IDENTIFICATION && (
          <ImageIdentificationView imageUrl={question.mediaUrl || ""} onSelect={setUserAnswer} />
        )}

        {question.questionType === QuestionType.TEXT_INPUT && (
          <TextInputView onChangeText={setUserAnswer} />
        )}

        {question.questionType === QuestionType.SEQUENCE_ORDER && (
          <SequenceOrderView options={question.options || []} onReorder={setUserAnswer} />
        )}

        <Button
          title="Submit"
          onPress={handleSubmit}
          disabled={submitting || !userAnswer.trim()}
          color="#1D3557"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1D3557",
  },
  card: {
    backgroundColor: "#F1FAEE",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    alignItems: "center",
  },
  difficultyText: {
    fontSize: 16,
    color: "#457B9D",
    marginBottom: 5,
  },
  sessionText: {
    fontSize: 16,
    color: "#457B9D",
    marginBottom: 5,
  },
  questionText: {
    fontSize: 18,
    color: "#1D3557",
    marginBottom: 20,
    textAlign: "center",
  },
});
