import LoadingScreen from "@/src/components/loading";
import { useFetchQuestion } from "@/src/hooks/detection/useFetchQuestion";
import { useSubmitAnswer } from "@/src/hooks/detection/useSubmitAnswer";
import theme from "@/src/theme";
import { QuestionType } from "@/src/types/Detection/Question";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AudioComparison from "./questions/AudioComparison";
import AudioInputView from "./questions/AudioInputView";
import ImageIdentificationView from "./questions/ImageIdentificationView";
import MemoryRecall from "./questions/MemoryRecall";
import MultipleChoiceView from "./questions/MultipleChoiceView";
import SequenceOrderView from "./questions/SequenceOrderView";
import TextInputView from "./questions/TextInputView";
import * as Progress from 'react-native-progress';
import CircleImage from '@/assets/images/learnZone/circle.png';
import { useTheme } from '@/src/context/ThemeContext';

interface TestScreenProps {
  route: {
    params: {
      sessionId: number;
    };
  };
}
type RootStackParamList = {
  CompletedScreen: undefined;
  // other routes can be added here
};

export default function TestScreen({ route }: TestScreenProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { sessionId } = route.params;
  const { question, loading, fetchQuestion } = useFetchQuestion(sessionId);
  const { submitAnswer, loading: submitting } = useSubmitAnswer();

  const [userAnswer, setUserAnswer] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (question && question.questionType === QuestionType.COMPLETED) {
      navigation.navigate("CompletedScreen");
    }
  }, [question, navigation]);
  useEffect(() => {
    fetchQuestion();
    console.log(question, "question")
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
    setProgress(prev => prev + 1);
  };

  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary.light3,
      padding: 0,
      height: '100%',
    },
    headerContent: {
      padding: 16,
      marginEnd: 4,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      justifyContent: 'center',
    },
    headercircle: {
      width: 120,
      height: 120,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    backButton: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    backButtonText: {
      fontSize: theme.fonts.sizes.s18,
      color: '#B4DCD6',
    },
    headerTitle: {
      fontSize: theme.fonts.sizes.s28,
      color: '#fff',
      textAlign: 'center',
      fontWeight: '500',
    },
    mainContentCard: {
      backgroundColor: '#FFF9EB',
      borderRadius: 30,
      padding: 16,
      flexDirection: 'column',
      justifyContent: 'space-between',
      margin: 0,
      height: '90%',
    },
    submitButtonContainer: {
      padding: 15,
      marginHorizontal: 40,
      borderRadius: 20,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.primary.dark2,
      color: 'white',
      bottom: 10,
    },
    buttonText: {
      color: 'white'
    }
    ,
    card: {
      display: 'flex',
      justifyContent: 'space-between',
      borderRadius: 20,
      padding: 20,
      width: "90%",
      alignItems: "center",
    },
    difficultyText: {
      fontSize: theme.fonts.sizes.s16,
      color: "#457B9D",
      marginBottom: 5,
    },
    sessionText: {
      fontSize: theme.fonts.sizes.s16,
      color: "#457B9D",
      marginBottom: 5,
    },
    questionText: {
      fontSize: theme.fonts.sizes.s18,
      color: "#1D3557",
      marginBottom: 20,
      textAlign: "center",
    },
    progressBarContainer: {
      paddingHorizontal: 16,
      marginBottom: 16,
    },
  });

  if (loading || !question) return <LoadingScreen />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* TODO:ADD SKIP BUTTON WITH API */}
      <View style={styles.container}>
        {/* Header Card */}
        <Image
          source={CircleImage}
          style={styles.headercircle}
        />
        <View style={styles.headerContent}>

          <Text style={styles.headerTitle}>Lets Answer!</Text>
        </View>

         {/* Progress Bar */}
        
        <View style={styles.mainContentCard}>

        <View style={styles.progressBarContainer}>
          <Progress.Bar 
            progress={progress / 15} 
            width={null}
            color={theme.colors.primary.dark2}
            unfilledColor={theme.colors.primary.light2}
            borderWidth={0}
            height={10}
          />
        </View>


          <View>
            {question.questionType === QuestionType.MULTIPLE_CHOICE && (
              <MultipleChoiceView question={question} onSelect={setUserAnswer} />
            )}

            {question.questionType === QuestionType.AUDIO_COMPARISON && (
              <AudioComparison question={question} onSelect={setUserAnswer} />
            )}

            {question.questionType === QuestionType.AUDIO_INPUT && (
              <AudioInputView question={question} onSelect={setUserAnswer} />
            )}


            {question.questionType === QuestionType.IMAGE_IDENTIFICATION && (
              <ImageIdentificationView question={question} onSelect={setUserAnswer} />
            )}

            {question.questionType === QuestionType.TEXT_INPUT && (
              <TextInputView question={question} onSelect={setUserAnswer} />
            )}

            {question.questionType === QuestionType.SEQUENCE_ORDER && (
              <SequenceOrderView question={question} onReorder={setUserAnswer} />
            )}

            {question.questionType === QuestionType.MEMORY_RECALL && (
              <MemoryRecall question={question} onSelect={setUserAnswer} />
            )}

          </View>
          <TouchableOpacity
            style={[
              styles.submitButtonContainer,
              { backgroundColor: submitting || !userAnswer.trim() ? theme.colors.primary.light2 : theme.colors.primary.dark2 }
            ]}
            onPress={() => handleSubmit()}
            disabled={submitting || !userAnswer.trim()}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary.light3,
    padding: 0,
    height: '100%',
  },
  headerContent: {
    padding: 16,
    marginEnd: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'center',
  },
  headercircle: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  backButtonText: {
    fontSize: theme.fonts.sizes.s18,
    color: '#B4DCD6',
  },
  headerTitle: {
    fontSize: theme.fonts.sizes.s28,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  mainContentCard: {
    backgroundColor: '#FFF9EB',
    borderRadius: 30,
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 0,
    height: '90%',
  },
  submitButtonContainer: {
    padding: 15,
    marginHorizontal: 40,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary.dark2,
    color: 'white',
    bottom: 10,
  },
  buttonText: {
    color: 'white'
  }
  ,
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: 20,
    padding: 20,
    width: "90%",
    alignItems: "center",
  },
  difficultyText: {
    fontSize: theme.fonts.sizes.s16,
    color: "#457B9D",
    marginBottom: 5,
  },
  sessionText: {
    fontSize: theme.fonts.sizes.s16,
    color: "#457B9D",
    marginBottom: 5,
  },
  questionText: {
    fontSize: theme.fonts.sizes.s18,
    color: "#1D3557",
    marginBottom: 20,
    textAlign: "center",
  },
  progressBarContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
