import React, { useEffect, useState, FunctionComponent } from 'react';
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
import { SvgProps } from "react-native-svg";
import Ionicons from "@expo/vector-icons/Ionicons";

import { LearnZoneParamList } from "./index";
import theme from '@/src/theme';

// Import SVGs as React components
import BallSvg from '@/assets/images/games/ball.svg';
import Ballb from '@/assets/images/games/ballb.svg';
import Ballg from '@/assets/images/games/ballg.svg';
import Ballr from '@/assets/images/games/ballr.svg';

type LearnMainNavigationProp = StackNavigationProp<
  LearnZoneParamList,
  "PlayMainScreen"
>;

const { width, height } = Dimensions.get('window');

const BALLOON_SIZE = 250;
const balloonPositions = [
  { x: width * 0.0 - 30, y: height * 0.15 },
  { x: width * 0.5 - 30, y: height * 0.15 },
  { x: width * 0.001 - 30, y: height * 0.55 },
  { x: width * 0.5 - 30, y: height * 0.55 },
];

const balloonSvgs: FunctionComponent<SvgProps>[] = [BallSvg, Ballr, Ballb, Ballg];

const levels = [
  {
    question: 'Which word matches "Their"?',
    word: 'Their',
    balloons: ['There', 'They\'re', 'Their', 'Thier'],
  },
  {
    question: 'Which word matches "Desert"?',
    word: 'Desert',
    balloons: ['Dessert', 'Desert', 'Depart', 'Destert'],
  },
  {
    question: 'Which word matches "Vase"?',
    word: 'Vase',
    balloons: ['Base', 'Vase', 'Face', 'Phase'],
  },
  {
    question: 'Which word matches "Won"?',
    word: 'Won',
    balloons: ['One', 'On', 'Won', 'None'],
  },
  {
    question: 'Which word matches "Affect"?',
    word: 'Affect',
    balloons: ['Effect', 'Affect', 'Affact', 'Effact'],
  },
  {
    question: 'Which word matches "Receive"?',
    word: 'Receive',
    balloons: ['Recieve', 'Receive', 'Recive', 'Reseve'],
  },
  {
    question: 'Which word matches "Weather"?',
    word: 'Weather',
    balloons: ['Wether', 'Whether', 'Weather', 'Weater'],
  },
  {
    question: 'Which word matches "Stationary"?',
    word: 'Stationary',
    balloons: ['Stationery', 'Stationary', 'Stashionary', 'Statonary'],
  },
  {
    question: 'Which word matches "Separate"?',
    word: 'Separate',
    balloons: ['Seperate', 'Separate', 'Saprate', 'Saperate'],
  },
  {
    question: 'Which word matches "Principal"?',
    word: 'Principal',
    balloons: ['Principle', 'Principal', 'Princible', 'Princple'],
  },
];


const Game = () => {
  const navigation = useNavigation<LearnMainNavigationProp>();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [showQuestion, setShowQuestion] = useState(true);
  const [balloons, setBalloons] = useState<
    { x: number; y: number; word: string; shakeAnim: Animated.Value; Svg: FunctionComponent<SvgProps> }[]
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
      Svg: shuffledSvgs[index], // Assign a random balloon color
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

  const resetGame = () => {
    setScore(0);
    setCurrentLevel(0);
    setShowQuestion(true);
  };

  return (
    <View style={styles.container}>
      {/* Score Display */}
      <View style={styles.scoreContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle-outline" size={40} color="white" />
        </TouchableOpacity>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>

      {showQuestion ? (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{levels[currentLevel].question}</Text>
          <TouchableOpacity style={styles.startButton} onPress={() => setShowQuestion(false)}>
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
      ) : (
        balloons.map((balloon, index) => {
          const BalloonComponent = balloon.Svg;
          return (
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
                <BalloonComponent width={BALLOON_SIZE} height={BALLOON_SIZE} style={styles.balloon} />
                <Text style={styles.balloonText}>{balloon.word}</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F8FF' },
  scoreContainer: {
    height: 50, width: '100%', backgroundColor: '#95B9B2',
    justifyContent: 'center', alignItems: 'center',
  },
  backButton: { position: "absolute", left: 15 },
  scoreText: { color: '#FFFFFF', fontSize: theme.fonts.sizes.s20, fontWeight: 'bold' },
  questionContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  questionText: { fontSize: theme.fonts.sizes.s24, fontWeight: 'bold', textAlign: 'center' },
  startButton: { backgroundColor: '#95B9B2', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  startButtonText: { color: '#FFFFFF', fontSize: theme.fonts.sizes.s18, fontWeight: 'bold' },
  balloonContainer: { position: 'absolute', alignItems: 'center' },
  balloonTouchable: { alignItems: 'center', justifyContent: 'center' },
  balloonText: { position: 'absolute', top:'15%', fontSize: theme.fonts.sizes.s24, fontWeight: 'bold', color: '#FFFFFF' },
});

export default Game;
