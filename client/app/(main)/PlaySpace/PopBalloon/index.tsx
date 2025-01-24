import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const PopTheBalloonGame: React.FC = () => {
  return (
    <View style={styles.container}>
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
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Pop the Balloon is a fun, interactive game for dyslexic students to improve reading and cognitive skills.
          Players pop balloons with letters, words, or numbers to complete challenges, enhancing focus and phonetic
          awareness. Adjustable difficulty ensures an enjoyable learning experience!
        </Text>
      </View>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCE5E1', // Match the background color
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#003D35',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  gameImage: {
    width: '80%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  descriptionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  description: {
    fontSize: 14,
    color: '#003D35',
    lineHeight: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  detailItem: {
    width: '45%',
    marginBottom: 15,
  },
  detailTitle: {
    fontSize: 12,
    color: '#6C8A81',
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 14,
    color: '#003D35',
  },
  nextButton: {
    backgroundColor: '#003D35',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 'auto',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PopTheBalloonGame;
