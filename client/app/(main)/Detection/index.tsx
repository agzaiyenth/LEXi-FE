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

export default DetectionFlow;

