import BallSvg from '@/assets/images/games/ball.svg';
import Ballb from '@/assets/images/games/ballb.svg';
import Ballg from '@/assets/images/games/ballg.svg';
import Ballr from '@/assets/images/games/ballr.svg';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LearnZoneParamList } from "./index";
import Ionicons from "@expo/vector-icons/Ionicons";

type LearnMainNavigationProp = StackNavigationProp<
  LearnZoneParamList,
  "PlayMainScreen"
>;
import theme from '@/src/theme';

const { width, height } = Dimensions.get('window');

const BALLOON_SIZE = 250;
const balloonPositions = [
  { x: width * 0.0 - 30, y: height * 0.15 },
  { x: width * 0.5 - 30, y: height * 0.15 },
  { x: width * 0.001 - 30, y: height * 0.55 },
  { x: width * 0.5 - 30, y: height * 0.55 },
];

const balloonSvgs = [BallSvg, Ballr, Ballb, Ballg];

const levels = [
  {
    question: 'Which word matches "Tree"?',
    word: 'Tree',
    balloons: ['Free', 'Tree', 'Three', 'Bee'],
  },
  {
    question: 'Which word matches "Cat"?',
    word: 'Cat',
    balloons: ['Kat', 'Bat', 'Cat', 'Rat'],
  },
  {
    question: 'Which word matches "Dog"?',
    word: 'Dog',
    balloons: ['Bog', 'Dog', 'Fog', 'Log'],
  },
  {
    question: 'Which word matches "Log"?',
    word: 'Log',
    balloons: ['Bog', 'Dog', 'Fog', 'Log'],
  },
  {
    question: 'Which word matches "Bog"?',
    word: 'Bog',
    balloons: ['Bog', 'Dog', 'Fog', 'Log'],
  },
];

const Game = () => {
  const navigation = useNavigation<LearnMainNavigationProp>();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [showQuestion, setShowQuestion] = useState(true);
  const [balloons, setBalloons] = useState<
    { x: number; y: number; word: string; shakeAnim: Animated.Value; Svg: any }[]
  >([]);

  useEffect(() => {
    if (!showQuestion) startGame();
  }, [currentLevel, showQuestion]);

  const startGame = () => {
    setBalloons(generateBalloons(levels[currentLevel].balloons));
  };

  const generateBalloons = (balloonWords: string[]) => {
    const shuffledSvgs = [...balloonSvgs].sort(() => Math.random() - 0.5);
    return balloonWords.map((word, index) => ({
      x: balloonPositions[index].x,
      y: balloonPositions[index].y,
      word,
      Svg: shuffledSvgs[index], // Assign random balloon color
      shakeAnim: new Animated.Value(0),
    }));
  };

  const startShaking = (shakeAnim: Animated.Value) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    balloons.forEach((balloon) => startShaking(balloon.shakeAnim));
  }, [balloons]);

  const handleBalloonPress = (word: string) => {
    const isCorrect = word === levels[currentLevel].word;

    setScore((prevScore) => {
      const newScore = isCorrect ? prevScore + 10 : prevScore - 5;

      if (currentLevel + 1 < levels.length) {
        setShowQuestion(true);
        setCurrentLevel((prevLevel) => prevLevel + 1);
      } else {
        setTimeout(() => {
          Alert.alert('Game Over', `Congratulations! Your final score: ${newScore}`);
          resetGame();
        }, 100);
      }

      return newScore;
    });
  };

  const goToNextLevel = () => {
    if (currentLevel + 1 < levels.length) {
      setShowQuestion(true);
      setCurrentLevel(currentLevel + 1);
    } else {
      Alert.alert('Game Over', `Congratulations! Your score: ${score}`);
      resetGame();
    }
  };

  const resetGame = () => {
    setScore(0);
    setCurrentLevel(0);
    setShowQuestion(true);
  };

  return (

    <View style={styles.container}>
      {/* Score Display */}
       
      <View style={styles.scoreContainer}>
      
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>
          <Ionicons name="arrow-back-circle-outline" size={40} color="white" />
        </Text>
      </TouchableOpacity>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>

      {showQuestion ? (
        // **Question Screen**
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{levels[currentLevel].question}</Text>
          <TouchableOpacity style={styles.startButton} onPress={() => setShowQuestion(false)}>
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // **Balloon Selection Screen**
        balloons.map((balloon, index) => (
          <Animated.View
            key={index}
            style={[
              styles.balloonContainer,
              {
                left: balloon.x,
                top: balloon.y,
                transform: [{ translateX: balloon.shakeAnim }],
              },
            ]}
          >
            <TouchableOpacity onPress={() => handleBalloonPress(balloon.word)} style={styles.balloonTouchable}>
              <balloon.Svg width={BALLOON_SIZE} height={BALLOON_SIZE} style={styles.balloon} />
              <Text style={styles.balloonText}>{balloon.word}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
  },
  scoreContainer: {
    height: 50,
    width: '100%',
    backgroundColor: '#95B9B2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: "absolute",
    top: 0,
    left: 15,
    height: 40,
    width: 40,
    // backgroundColor: '#003D35',
    // borderRadius: 300,
    padding: 10,
    // zIndex: 10,
  },
  backButtonText: {
    fontSize: 18,
    // color: '#FFFFFF',
    // fontWeight: 'bold',
    position: "absolute",
    top: "15%",
    left: "0%",
    right: "0%",
    zIndex: 1000,
  },
  scoreText: {
    color: '#FFFFFF',
    fontSize: theme.fonts.sizes.s20,
    fontWeight: 'bold',
  },
  questionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  questionText: {
    fontSize: theme.fonts.sizes.s24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  questionImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  startButton: {
    backgroundColor: '#95B9B2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: theme.fonts.sizes.s18,
    fontWeight: 'bold',
  },
  balloonContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  balloonTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  balloonText: {
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    fontSize: theme.fonts.sizes.s24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    width: BALLOON_SIZE,
    zIndex: 10,
  },
  balloon: {
    zIndex: 1,

  },
});

export default Game;
