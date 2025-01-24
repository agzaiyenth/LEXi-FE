import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const PopTheBalloonGame: React.FC = () => {
  return (
    <LinearGradient
      colors={['#004D40', '#00695C']}
      style={styles.container}
    >
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => console.log('Back pressed')}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      {/* Game Title */}
      <Text style={styles.header}>Pop The Balloon</Text>

      {/* Game Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/games/ballon.png')}
          style={styles.gameImage}
        />
      </View>

      {/* Game Description */}
      <Text style={styles.description}>
        Pop the Balloon is a fun, interactive game for dyslexic students to improve reading and cognitive skills.
        Players pop balloons with letters, words, or numbers to complete challenges, enhancing focus and phonetic
        awareness. Adjustable difficulty ensures an enjoyable learning experience!
      </Text>

      {/* Divider Line */}
      <View style={styles.divider} />

      {/* Game Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Language</Text>
          <Text style={styles.detailText}>English</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Game Theory</Text>
          <Text style={styles.detailText}>Phonological</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Duration</Text>
          <Text style={styles.detailText}>8 Hours 11 Minutes</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Genres</Text>
          <Text style={styles.detailText}>Mystery - Fiction - Fantasy</Text>
        </View>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={() => console.log('Next pressed')}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#003D35',
    borderRadius: 50,
    padding: 8,
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#FFFFFF',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  gameImage: {
    width: '90%', // Increased width
    height: 250, // Increased height
    borderRadius: 10,
    resizeMode: 'contain',
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#FFFFFF',
    opacity: 0.6,
    marginVertical: 15,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  detailItem: {
    width: '48%',
    marginBottom: 15,
  },
  detailTitle: {
    fontSize: 16, // Increased font size
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  nextButton: {
    backgroundColor: '#004D40', // Matching the gradient
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 'auto',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PopTheBalloonGame;
