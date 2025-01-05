import React, { useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

interface Option {
    id: number;
    text: string;
}

interface Question {
    id: number;
    text: string;
    imageUrl?: string;
    options?: Option[];
    type: 'MCQ' | 'SHORT_ANSWER';
}

const QuestionnaireScreen = () => {
    interface Option {
        id: number;
        text: string;
      }
    
      interface Question {
        id: number;
        text: string;
        imageUrl?: string;
        options?: Option[];
        type: 'MCQ';
      }
    
      const QuestionnaireScreen = () => {
        const [questions, setQuestions] = useState<Question[]>([
          {
            id: 1,
            text: 'What is this animal called?',
            imageUrl: 'https://images.unsplash.com/photo-1489084917528-a57e68a79a1e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            type: 'MCQ',
            options: [
              { id: 1, text: 'Cat' },
              { id: 2, text: 'Bat' },
              { id: 3, text: 'Rat' },
            ],
          },
        ]);
        const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
        const [answers, setAnswers] = useState<{ [key: number]: string }>({});
        const [showConfetti, setShowConfetti] = useState(false);
    
        const handleNext = () => {
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
          } else {
            // Submit answers
            console.log('Submit answers:', answers);
          }
        };
    
        const handleAnswerChange = (questionId: number, answer: string) => {
          setAnswers({ ...answers, [questionId]: answer });
          if (answer === 'Cat') {
            setShowConfetti(true);
            Alert.alert('Correct!', 'You got the right answer!', [{ text: 'OK', onPress: () => setShowConfetti(false) }]);
          }
        };
    
        if (questions.length === 0) {
          return <Text>Loading...</Text>;
        }
    
        const currentQuestion = questions[currentQuestionIndex];
        return (
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.questionText}>{currentQuestion.text}</Text>
            {currentQuestion.imageUrl && (
              <Image source={{ uri: currentQuestion.imageUrl }} style={styles.image} />
            )}
            {currentQuestion.type === 'MCQ' && currentQuestion.options && (
              <View style={styles.optionsContainer}>
                {currentQuestion.options.map((option: Option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={styles.optionButton}
                    onPress={() => handleAnswerChange(currentQuestion.id, option.text)}
                  >
                    <Text style={styles.optionText}>{option.text}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <Button title="Next" onPress={handleNext} />
            {showConfetti && <ConfettiCannon key={currentQuestionIndex} count={200} origin={{ x: -10, y: 0 }} />}
          </ScrollView>
        );
      };
    
      const styles = StyleSheet.create({
        container: {
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
          backgroundColor: '#f0f0f0',
        },
        questionText: {
          fontSize: 20,
          marginBottom: 16,
          fontFamily: 'Arial-BoldMT',
          color: '#333',
        },
        image: {
          width: 200,
          height: 200,
          marginBottom: 16,
          borderRadius: 10,
        },
        optionsContainer: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
        },
        optionButton: {
          backgroundColor: '#4682B4',
          padding: 15,
          marginVertical: 5,
          borderRadius: 10,
          width: '30%',
          alignItems: 'center',
        },
        optionText: {
          fontSize: 18,
          color: '#fff',
          fontFamily: 'Arial-BoldMT',
        },
      });
    
      return <QuestionnaireScreen />;
};

export default QuestionnaireScreen;