import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';
import BallSvg from '@/assets/images/games/ball.svg';

const { width, height } = Dimensions.get('window');

const TOP_PADDING = height * 0.05; 
const BOTTOM_PADDING = height * 0.1;
const GAME_AREA_HEIGHT = height - (TOP_PADDING + BOTTOM_PADDING);
const BALLOON_SIZE = 250; 
const HORIZONTAL_PADDING = 15; 
const MIN_SPACING = BALLOON_SIZE * 0.1; 

const levels = [
  {
    word: 'Tree',
    balloons: ['Free', 'Tree', 'Three', 'Bee'],
  },
  {
    word: 'Cat',
    balloons: ['Kat', 'Bat', 'Cat', 'Rat'],
  },
  {
    word: 'Dog',
    balloons: ['Bog', 'Dog', 'Fog', 'Log'],
  },
];

const Game = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [balloons, setBalloons] = useState<
    { x: number; y: number; word: string; shakeAnim: Animated.Value }[]
  >([]);

  useEffect(() => {
    startGame();
  }, [currentLevel]);

  const startGame = () => {
    setBalloons(generateBalloons(levels[currentLevel].balloons));
  };

  const generateBalloons = (balloonWords: string[]) => {
    const newBalloons: { x: number; y: number; word: string; shakeAnim: Animated.Value }[] = [];

    balloonWords.forEach((word) => {
      let positionValid = false;
      let newX = 0;
      let newY = 0;
      let attempts = 0; // Prevent infinite loops

      while (!positionValid && attempts < 100) {
        attempts++;
        newX = Math.random() * (width - BALLOON_SIZE - HORIZONTAL_PADDING * 2) + HORIZONTAL_PADDING;
        newY = TOP_PADDING + Math.random() * (GAME_AREA_HEIGHT - BALLOON_SIZE);

        // Check for overlapping with existing balloons
        positionValid =
          newBalloons.length === 0 ||
          newBalloons.every(
            (balloon) =>
              Math.abs(balloon.x - newX) > MIN_SPACING &&
              Math.abs(balloon.y - newY) > MIN_SPACING
          );
      }

      newBalloons.push({
        x: newX,
        y: newY,
        word,
        shakeAnim: new Animated.Value(0),
      });
    });

    newBalloons.forEach((balloon) => startShaking(balloon.shakeAnim));
    return newBalloons;
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

  const handleBalloonPress = (word: string) => {
    const isCorrect = word === levels[currentLevel].word;
    if (isCorrect) {
      setScore(score + 10);
      goToNextLevel();
    } else {
      setScore(score - 5);
    }
  };

  const goToNextLevel = () => {
    if (currentLevel + 1 < levels.length) {
      setCurrentLevel(currentLevel + 1);
    } else {
      Alert.alert('Game Over', `Congratulations! Your score: ${score}`);
      resetGame();
    }
  };

  const resetGame = () => {
    setScore(0);
    setCurrentLevel(0);
  };

  return (
    <View style={styles.container}>
      {balloons.map((balloon, index) => (
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
            <BallSvg width={BALLOON_SIZE} height={BALLOON_SIZE} style={styles.balloon} />
            <Text style={styles.balloonText}>{balloon.word}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    zIndex: 2, 
    top: '20%', 
    width: BALLOON_SIZE,
  },
  balloon: {
    zIndex: 1,
    padding: 50,
  },
});

export default Game;
