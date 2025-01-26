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

const { width, height } = Dimensions.get('window');

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

const colors = ['#FF6F61', '#6B8E23', '#4682B4', '#DA70D6'];

const Game = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [balloons, setBalloons] = useState<
    { x: number; y: number; word: string; color: string; shakeAnim: Animated.Value }[]
  >([]);

  useEffect(() => {
    startGame();
  }, [currentLevel]);

  const startGame = () => {
    setBalloons(generateBalloons(levels[currentLevel].balloons));
  };

  const generateBalloons = (balloonWords: string[]) => {
    const newBalloons = balloonWords.map((word, index) => ({
      x: Math.random() * (width - 100), // Random horizontal position
      y: (index * (height / balloonWords.length)) + 50, // Random vertical position
      word,
      color: randomColor(),
      shakeAnim: new Animated.Value(0),
    }));

    newBalloons.forEach((balloon) => startShaking(balloon.shakeAnim));
    return newBalloons;
  };

  const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

  const startShaking = (shakeAnim: Animated.Value) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10, // Move right
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10, // Move left
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
              transform: [
                { translateX: balloon.shakeAnim },
                { translateY: balloon.y },
              ],
            },
          ]}
        >
          <TouchableOpacity onPress={() => handleBalloonPress(balloon.word)}>
            <View style={[styles.balloon, { backgroundColor: balloon.color }]}>
              <View style={styles.shinyEffect} />
              <View style={styles.ribbon} />
            </View>
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
  balloon: {
    width: 80,
    height: 100,
    borderRadius: 40,
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
  },
  shinyEffect: {
    position: 'absolute',
    top: 10,
    left: 20,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  ribbon: {
    width: 10,
    height: 30,
    backgroundColor: '#8B0000',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: -5,
  },
  balloonText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default Game;
