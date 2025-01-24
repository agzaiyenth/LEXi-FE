import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const levels = [
  {
    word: 'Tree',
    image: 'https://via.placeholder.com/150',
    balloons: ['Free', 'Tree', 'Three', 'Bee'],
  },
  {
    word: 'Cat',
    image: 'https://via.placeholder.com/150',
    balloons: ['Kat', 'Bat', 'Cat', 'Rat'],
  },
  {
    word: 'Dog',
    image: 'https://via.placeholder.com/150',
    balloons: ['Bog', 'Dog', 'Fog', 'Log'],
  },
];

const colors = ['#FF6F61', '#6B8E23', '#4682B4', '#DA70D6'];

const Game = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [balloons, setBalloons] = useState<{ x: number; y: number; word: string; color: string }[]>([]);
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Start the game automatically after 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      startGame();
    });
  }, []);

  const startGame = () => {
    const generatedBalloons = generateBalloons(levels[currentLevel].balloons);
    setBalloons(generatedBalloons);
    console.log('Balloons State:', generatedBalloons); // Debug here
  };
  
  const generateBalloons = (balloonWords: string[]): { x: number; y: number; word: string; color: string }[] => {
    const newBalloons: { x: number; y: number; word: string; color: string }[] = [];
    while (newBalloons.length < balloonWords.length) {
      const x = Math.random() * (width - 100);
      const y = Math.random() * (height - 200);
  
      // Ensure no overlap
      if (newBalloons.every((b) => distance(b.x, b.y, x, y) > 120)) {
        newBalloons.push({
          x,
          y,
          word: balloonWords[newBalloons.length],
          color: randomColor(),
        });
      }
    }
    console.log('Generated Balloons:', newBalloons); // Debug here
    return newBalloons;
  };
  
  
    

  const distance = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  };
  
  const randomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleBalloonPress = (word : string) => {
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
      setBalloons(generateBalloons(levels[currentLevel + 1].balloons));
    } else {
      Alert.alert('Game Over', `Congratulations! Your score: ${score}`);
      resetGame();
    }
  };

  const resetGame = () => {
    setScore(0);
    setCurrentLevel(0);
    setBalloons(generateBalloons(levels[0].balloons));
  };

  return (
    <View style={styles.container}>
      {/* Intro Section */}
      {fadeAnim && (
  <Animated.View style={[styles.intro, { opacity: fadeAnim }]}>
    <Image
      source={{ uri: levels[currentLevel].image }}
      style={styles.introImage}
    />
    <Text style={styles.wordDisplay}>{levels[currentLevel].word}</Text>
  </Animated.View>
)}
{!fadeAnim && balloons.length > 0 && (
  <View style={styles.game}>
    <View style={styles.header}>
      <Text style={styles.score}>Score: {score}</Text>
      <Text style={styles.level}>Level: {currentLevel + 1}</Text>
    </View>
    {balloons.map((balloon, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.balloon,
          {
            backgroundColor: balloon.color,
            left: balloon.x,
            top: balloon.y,
          },
        ]}
        onPress={() => handleBalloonPress(balloon.word)}
      >
        <Text style={styles.balloonText}>{balloon.word}</Text>
      </TouchableOpacity>
    ))}
  </View>
)}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b9eaf5',
  },
  intro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  introImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 15,
  },
  wordDisplay: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  game: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  level: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  balloon: {
    position: 'absolute',
    width: 100,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  balloonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Game;
 