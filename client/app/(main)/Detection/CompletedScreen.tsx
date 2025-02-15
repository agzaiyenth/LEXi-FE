import theme from '@/src/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function CompletedScreen() {
  const router = useRouter();
  // TODO Wirte getuser hook and use it here to get current user name
  const currentUser = "User";




  return (
    <View

      style={styles.container}
    >
      <Text style={styles.title}>Thank You {currentUser} !</Text>
      <Text style={styles.subtitle}>
        We are ready to use the app , Enjoy!
      </Text>
      <Image
        source={require('@/assets/images/mascot/completed.png')}
        style={styles.avatar}
      />
      <TouchableOpacity
        style={styles.submitButtonContainer}
        onPress={() => router.push("/")}
      >
        <Text style={styles.buttonText}>Go To Home</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.offWhite,
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
    color: 'white',
  },
  swipeButtonTitle: {
    color: 'white',
  },
  underlayTitle: {
    color: 'white',
  },
  submitButtonContainer: {
    padding: 15,
    marginHorizontal: 40,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary.dark2,
    color: 'white'
  },
  buttonText: {
    color: 'white'
  }
})