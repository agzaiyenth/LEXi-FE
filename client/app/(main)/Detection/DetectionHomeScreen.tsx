import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import React from 'react'
import { SwipeButton } from 'react-native-expo-swipe-button';
import { MaterialIcons } from '@expo/vector-icons';


export default function DetectionHomeScreen() {
  const currentUser = "User"; 

  const handleSwipeComplete = () => {
    // Add navigation logic here
    Alert.alert("Swipe completed!");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/auth/icon.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to the Detection System!</Text>
      <Text style={styles.subtitle}>
        Your personalized detection experience starts here. Let's get to know each other more!
      </Text>
      <Image
        source={require('@/assets/images/auth/centerImage.png')}
        style={styles.avatar}
      />
      <SwipeButton
        Icon={<MaterialIcons name="keyboard-arrow-right" size={50} color="white" />}
        onComplete={handleSwipeComplete}
        title="Slide to start"
        borderRadius={25}
        containerStyle={styles.swipeButtonContainer}
        underlayTitle="Release to start"
        underlayTitleStyle={styles.underlayTitle}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  swipeButtonContainer: {
    backgroundColor: 'gray',
  },
  underlayTitle: {
    color: 'white',
  },
})