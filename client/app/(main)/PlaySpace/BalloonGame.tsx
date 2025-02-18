import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LearnZoneParamList } from './index';
import Ionicons from '@expo/vector-icons/Ionicons';

type LearnMainNavigationProp = StackNavigationProp<LearnZoneParamList, 'PlayMainScreen'>;

const BalloonGame: React.FC = () => {
  const navigation = useNavigation<LearnMainNavigationProp>();
  return (
    <View style={styles.container}>
      

      {/* Game Title */}
      <Text style={styles.header}>Pop The Balloon</Text>

{/* Back Button */}
<TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>
          <Ionicons name="arrow-back-circle-outline" size={40} color="white" /></Text>
      </TouchableOpacity>

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
      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Game')}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCE5E1', // Reverted background color
    padding: 20,
    paddingBottom: 70,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
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
    position: 'absolute',
    top: '15%',
    left: '0%',
    right:'0%',
    zIndex:1000,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#003D35',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  gameImage: {
    width: '100%', // Full width
    height: 250,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  description: {
    fontSize: 16,
    color: '#003D35',
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#003D35',
    opacity: 0.8,
    marginVertical: 20,
    alignSelf: 'stretch',
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
    fontSize: 16, // Larger font size
    color: '#003D35',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 15,
    color: '#003D35',
  },
  nextButton: {
    backgroundColor: '#003D35', // Matching color
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BalloonGame;

