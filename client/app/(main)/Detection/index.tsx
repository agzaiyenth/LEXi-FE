import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import theme from '@/src/theme';

interface Option {
  id: number;
  text: string;
}

interface Question {
  id: number;
  text: string;
  type: string;
  options: Option[];
  correctAnswer: string | null;
  imagePath?: string;
  display?: string;
}

interface AgeResponse {
  ageGroup: string;
  questions: Question[];
}

const DetectionFlow = () => {
  const [age, setAge] = useState<string>('');
  const [ageGroup, setAgeGroup] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<{ questionId: number; answer: string }[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [dyslexiaLikelihood, setDyslexiaLikelihood] = useState<string | null>(null);
  const [displaySentence, setDisplaySentence] = useState<string | null>(null);

  const backendURL = 'http://192.168.1.101:8080/api/questions';

  const handleAgeSubmit = async () => {
    const numericAge = Number(age.trim());
    if (!age || isNaN(numericAge) || numericAge < 6) {
      Alert.alert('Invalid Age', 'Please enter a valid age.');
      return;
    }

    try {
      const response = await fetch(`${backendURL}/age?age=${age}`, { method: 'POST' });
      if (!response.ok) throw new Error('Failed to fetch questions for the given age.');

      const data: AgeResponse = await response.json();
      setAgeGroup(data.ageGroup);
      setQuestions(data.questions);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to fetch questions.');
    }
  };

  const handleAnswerSubmit = async (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    setSelectedAnswer(answer);

    try {
      const response = await fetch(`${backendURL}/feedback?questionId=${currentQuestion.id}&answer=${answer}`, {
        method: 'POST',
      });

      const data = await response.json();
      if (data.error) {
        Alert.alert('Error', data.error);
        return;
      }

      setAnswers([...answers, { questionId: currentQuestion.id, answer }]);
      setScore(data.score);

      setTimeout(() => {
        if (currentQuestionIndex + 1 < questions.length) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer(null);
        } else {
          calculateFinalScore();
        }
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to submit answer.');
    }
  };

  const calculateFinalScore = async () => {
    try {
      const response = await fetch(`${backendURL}/score`, { method: 'POST' });
      const data = await response.json();

      if (data.error) {
        Alert.alert('Error', data.error);
        return;
      }

      setScore(data.score);
      setIsFinished(true);
      setDyslexiaLikelihood(`Dyslexia Likelihood: ${data.dyslexia_level}`);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to calculate final score.');
    }
  };

  useEffect(() => {
    const currentQuestion = questions[currentQuestionIndex];

    // Apply logic only for Question 3
    if (currentQuestion?.id === 3 && currentQuestion.display) {
      setDisplaySentence(currentQuestion.display);

      // Hide the display sentence after 5 seconds
      const timer = setTimeout(() => {
        setDisplaySentence(null);
      }, 4000);

      // Clear timer when the question changes
      return () => clearTimeout(timer);
    } else {
      // Clear the display when it's not Question 3
      setDisplaySentence(null);
    }
  }, [currentQuestionIndex, questions]);

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!ageGroup ? (
        <View style={styles.ageInputContainer}>
          <Text style={styles.title}>Enter your Age:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
            placeholder="e.g., 16"
            placeholderTextColor={theme.colors.blacks.medium}
          />
          <Button title="Submit Age" onPress={handleAgeSubmit} color={theme.colors.primary.medium2} />
        </View>
      ) : isFinished ? (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>{dyslexiaLikelihood}</Text>
        </View>
      ) : (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentQuestion?.text}</Text>

          {/* ✅ Display the "display" sentence if it exists */}
          {currentQuestion?.id === 3 ? (
            displaySentence && <Text style={styles.displayText}>{displaySentence}</Text>
          ) : (
            currentQuestion?.display && <Text style={styles.displayText}>{currentQuestion.display}</Text>
          )}

          {/* ✅ Display Image for "image_mcq" type questions */}
          {currentQuestion?.type === 'image_mcq' && currentQuestion.imagePath && (
            <Image
              source={{ uri: `${backendURL}/images/${currentQuestion.imagePath}` }}
              style={styles.image}
              resizeMode="contain"
            />
          )}

          {currentQuestion?.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.optionContainer, selectedAnswer === option.text && styles.selectedOption]}
              onPress={() => handleAnswerSubmit(option.text)}
              disabled={!!selectedAnswer}
            >
              <Text style={styles.optionText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};
  

export default DetectionFlow;

