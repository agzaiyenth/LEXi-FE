import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Button, Alert } from "react-native";
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
      responseTime: 2000, // Example response time in milliseconds
    };

    const result = await submitAnswer(answerData);
    
    setUserAnswer(""); // Clear input
    fetchQuestion(); // Fetch next question
  };

  if (loading || !question) return <ActivityIndicator size="large" />;

  return (
    <View>
      <Text>Difficulty: {question.difficulty}</Text>
      <Text>Session Id: {sessionId}</Text>
      <Text>{question.questionText}</Text>

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

      <Button title="Submit Answer" onPress={handleSubmit} disabled={submitting || !userAnswer.trim()} />
    </View>
  );
}
