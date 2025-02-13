import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";
import MultipleChoiceView from "./questions/MultipleChoiceView";
import ImageIdentificationView from "./questions/ImageIdentificationView";
import TextInputView from "./questions/TextInputView";
import SequenceOrderView from "./questions/SequenceOrderView";
import { QuestionType } from "@/types/Detection/Question";

export default function TestScreen({ route }) {
  const { sessionId } = route.params; // Get test session ID
  const { question, loading, fetchNextQuestion } = useFetchQuestion(sessionId);
  const { submitAnswer, submitting } = useSubmitAnswer();

  const [userAnswer, setUserAnswer] = useState<string>("");

  useEffect(() => {
    fetchNextQuestion();
  }, []);

  const handleSubmit = async () => {
    if (!question) return;
    await submitAnswer({
      testSessionId: sessionId,
      questionId: question.questionId,
      userAnswer,
      responseTime: 2000, // Replace with actual response time
    });
    fetchNextQuestion(); // Load next question
  };

  if (loading || !question) return <ActivityIndicator size="large" />;

  return (
    <View>
      <Text>Difficulty: {question.difficulty}</Text>
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

      {question.questionType === QuestionType.AUDIO_INPUT && (
        <AudioInputView expectedWord={question.questionText} onSubmit={setUserAnswer} />
      )}

      <Button title="Submit Answer" onPress={handleSubmit} disabled={submitting} />
    </View>
  );
}
