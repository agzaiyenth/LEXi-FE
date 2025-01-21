import theme from '../../../../src/theme';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign'; 
import { useNavigation} from 'expo-router';
interface CardProps {
  title: string;
  author: string;
  imageUrl: string;
}

const Card = ({ title = "Default Title", author = "Default Author", imageUrl = "default_image_url" }: CardProps) => (
  
  <View style={styles.cardContainer}>
    <Image
      source={{ uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHrPn9GkU973mz_dYTRWPxJ_lXaqDSr7Z63w&s'}}
      style={styles.image}
    />
    <View style={styles.detailsContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>{author}</Text>
      <TouchableOpacity style={styles.playButton}
       onPress={() => navigation.navigate('OnboardingScreen')}
       >
        <AntDesign name="playcircleo" size={24} color="black" style={styles.playButtonIcon}/>  {/* Use AntDesign instead of Icon */}
        <Text style={styles.playButtonText}>Play Now</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row', // Set the direction of the container to row
    padding: 10,
    backgroundColor: theme.colors.background.offWhite,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center', // Aligns children vertically in the center of the row
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10, // Add space between the image and the details container
  },
  detailsContainer: {
    flex: 1, // Take up the remaining space
    justifyContent: 'center', // Center content vertically in the container
  },
  title: {
    fontSize: theme.fonts.sizes.medium,
  },
  author: {
    fontSize: 17,
    color: theme.colors.secondary.medium,
  },
  playButton: {
    flexDirection: 'row', // Aligns children horizontally
    padding: 8,
    marginTop: 4,
  },
  playButtonText: {
    color: theme.colors.secondary.dark1,
    textAlign: 'center',
    fontSize: theme.fonts.sizes.medium,
  },
  playButtonIcon: {
    marginRight: 5, // Adds spacing between icon and text
  }
});

export default Card;
