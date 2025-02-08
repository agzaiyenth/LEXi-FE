import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import theme from '@/src/theme';
import { BASE_URL } from '@/config';

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
  const [feedbackColor, setFeedbackColor] = useState<string | null>(null);
  const [dyslexiaLikelihood, setDyslexiaLikelihood] = useState<string | null>(null);
  const [displaySentence, setDisplaySentence] = useState<string | null>(null);

  const backendURL = BASE_URL+'/api/questions';

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

    if (currentQuestion.correctAnswer !== null) {
      setFeedbackColor(answer === currentQuestion.correctAnswer ? 'green' : 'red');
    }

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
          setFeedbackColor(null);
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
      setDyslexiaLikelihood(data.dyslexia_level);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to calculate final score.');
    }
  };

  useEffect(() => {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion?.id === 3 && currentQuestion.display) {
      setDisplaySentence(currentQuestion.display);

      const timer = setTimeout(() => {
        setDisplaySentence(null);
      }, 4000);

      return () => clearTimeout(timer);
    } else {
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
            placeholder="e.g., 10"
            placeholderTextColor={theme.colors.primary.medium2}
          />
          <Button title="Submit Age" onPress={handleAgeSubmit} color={theme.colors.primary.medium2} />
        </View>
      ) : isFinished ? (
        <View style={styles.resultContainer}>
          <Text style={styles.dyslexiaText}>Dyslexia Likelihood</Text>
          <Text style={styles.dyslexiaLevel}>{dyslexiaLikelihood}</Text>
        </View>
      ) : (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentQuestion?.text}</Text>

          {currentQuestion?.id === 3 ? (
            displaySentence && <Text style={styles.displayText}>{displaySentence}</Text>
          ) : (
            currentQuestion?.display && <Text style={styles.displayText}>{currentQuestion.display}</Text>
          )}

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
              style={[
                styles.optionContainer,
                selectedAnswer === option.text && (feedbackColor ? { backgroundColor: feedbackColor } : styles.selectedOption),
              ]}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.colors.primary.light2,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 20,
    color: theme.colors.blacks.medium,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.background.offWhite,
    padding: 10,
    marginBottom: 20,
    width: 200,
    textAlign: 'center',
    borderRadius: 4,
    fontSize: 18,
  },
  ageInputContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionContainer: {
    alignItems: 'center',
  },
  questionText: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: theme.colors.blacks.medium,
  },
  displayText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  optionContainer: {
    padding: 15,
    backgroundColor: theme.colors.secondary.light2,
    marginVertical: 5,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  optionText: {
    fontSize: 18,
    color: theme.colors.blacks.medium,
  },
  selectedOption: {
    backgroundColor: theme.colors.primary.medium2,
  },
  resultContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dyslexiaText: {
    fontSize: 28,
    padding: 20,
    fontWeight: '600',
    color: theme.colors.primary.medium2,
  },
  dyslexiaLevel: {
    fontSize: 26,
    fontWeight: '600',
    color: theme.colors.primary.medium,
  },
});

export default DetectionFlow;

