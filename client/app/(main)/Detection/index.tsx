import React, { useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet } from 'react-native';

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

  const backendURL = 'http://192.168.1.101:8080/api/questions';

  const handleAgeSubmit = async () => {
    if (!age || isNaN(Number(age))) {
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Age input and submit button */}
    </ScrollView>
  );
};

export default DetectionFlow;

