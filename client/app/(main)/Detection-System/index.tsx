import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

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
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        // Fetch questions from backend
        fetch('http://your-backend-url/api/questions')
            .then(response => response.json())
            .then(data => setQuestions(data))
            .catch(error => console.error('Error fetching questions:', error));
    }, []);

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
                currentQuestion.options.map((option: Option) => (
                    <TouchableOpacity
                        key={option.id}
                        style={styles.optionButton}
                        onPress={() => handleAnswerChange(currentQuestion.id, option.text)}
                    >
                        <Text style={styles.optionText}>{option.text}</Text>
                    </TouchableOpacity>
                ))
            )}
            {currentQuestion.type === 'SHORT_ANSWER' && (
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => handleAnswerChange(currentQuestion.id, text)}
                    value={answers[currentQuestion.id] || ''}
                />
            )}
            <Button title="Next" onPress={handleNext} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    questionText: {
        fontSize: 18,
        marginBottom: 16,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 16,
    },
    optionButton: {
        backgroundColor: '#ddd',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    optionText: {
        fontSize: 16,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: '100%',
        marginBottom: 16,
        borderRadius: 5,
    },
});

export default QuestionnaireScreen;