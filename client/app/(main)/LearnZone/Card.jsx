import theme from '@/src/theme';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure `react-native-vector-icons` is installed

const Card = ({ title, author, imageUrl }) => (
  <View style={styles.cardContainer}>
    <Image
      source={{ uri: imageUrl }}
      style={styles.image}
    />
    <View style={styles.detailsContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>{author}</Text>
      <TouchableOpacity style={styles.playButton}>
        <Icon name="play-circle-outline" style={styles.playButtonIcon}/>
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
    fontWeight: theme.fonts.bold,
  },
  author: {
    fontSize: 17,
    color: theme.colors.secondary.medium,
  },
  playButton: {
    flexDirection: 'row', // Aligns children horizontally
    padding: 8,
    marginTop:4,
    
  },
  playButtonText: {
    color: theme.colors.secondary.dark1,
    textAlign: 'center',
    fontSize: theme.fonts.sizes.medium,
  },
  playButtonIcon: {
    fontSize: theme.fonts.sizes.large,
    color: theme.colors.background.dark,
    marginRight: 5, // Adds spacing between icon and text
  }
});

export default Card;
