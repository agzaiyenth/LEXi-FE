import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Alert,
  Image,
} from 'react-native';
import BallSvg from '@/assets/images/games/ball.svg';
import Ballr from '@/assets/images/games/ballr.svg';  
import Ballb from '@/assets/images/games/ballb.svg';
import Ballg from '@/assets/images/games/ballg.svg';

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
    image: 'https://via.placeholder.com/300', 
    word: 'Tree',
    balloons: ['Free', 'Tree', 'Three', 'Bee'],
  },
  {
    question: 'Which word matches "Cat"?',
    image: 'https://via.placeholder.com/300',
    word: 'Cat',
    balloons: ['Kat', 'Bat', 'Cat', 'Rat'],
  },
  {
    question: 'Which word matches "Dog"?',
    image: 'https://via.placeholder.com/300',
    word: 'Dog',
    balloons: ['Bog', 'Dog', 'Fog', 'Log'],
  },
  {
    question: 'Which word matches "Log"?',
    image: 'https://via.placeholder.com/300',
    word: 'Log',
    balloons: ['Bog', 'Dog', 'Fog', 'Log'],
  },
  {
    question: 'Which word matches "Bog"?',
    image: 'https://via.placeholder.com/300',
    word: 'Bog',
    balloons: ['Bog', 'Dog', 'Fog', 'Log'],
  },
];

const Game = () => {
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
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>

      {showQuestion ? (
        // **Question Screen**
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{levels[currentLevel].question}</Text>
          <Image source={{ uri: levels[currentLevel].image }} style={styles.questionImage} />
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
  scoreText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  questionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  questionText: {
    fontSize: 24,
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
    fontSize: 18,
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
    fontSize: 24,
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
