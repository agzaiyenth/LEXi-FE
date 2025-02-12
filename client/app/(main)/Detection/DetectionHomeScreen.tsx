import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import React from 'react'
import { SwipeButton } from 'react-native-expo-swipe-button';
import { MaterialIcons } from '@expo/vector-icons';
import theme from '@/src/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import { StackNavigationProp } from '@react-navigation/stack';


export default function DetectionHomeScreen() {
  const navigation = useNavigation<StackNavigationProp<any, "DetectionHomeScreen">>();
  // TODO Wirte getuser hook and use it here to get current user name
  const currentUser = "User"; 

  const handleSwipeComplete = () => {
    navigation.navigate("TestScreen")
  };

  return (
    <LinearGradient
    colors={[theme.colors.primary.light2, theme.colors.primary.light3]} // Define gradient colors
    style={styles.container}
  >
      <Image
        source={require('@/assets/images/auth/icon.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Hey There {currentUser} !</Text>
      <Text style={styles.subtitle}>
        Your personalized experience starts here. Let&apos;s get to know each other more!
      </Text>
      <Image
        source={require('@/assets/images/mascot/mascot-finger.png')}
        style={styles.avatar}
      />
      <SwipeButton
        Icon={<MaterialIcons name="keyboard-arrow-right" size={50} color="white" />}
        onComplete={handleSwipeComplete}
        title="Slide to start"
        titleStyle={styles.swipeButtonTitle}
        borderRadius={25}
        containerStyle={styles.swipeButtonContainer}
        underlayTitle="Release to start"
        underlayTitleStyle={styles.underlayTitle}
      />
     </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary.light2,
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 250,
    height: 250,
    marginBottom: 40,
  },
  swipeButtonContainer: {
    backgroundColor: theme.colors.primary.dark2,
    color:'white',
  },
  swipeButtonTitle:{
    color:'white',
  },
  underlayTitle: {
    color: 'white',
  },
})