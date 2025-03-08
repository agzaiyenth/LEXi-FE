import { useSession } from '@/src/ctx';
import theme from '@/src/theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import completed from '@/assets/images/mascot/completed.png';
import { useTheme } from '@/src/context/ThemeContext';


export default function CompletedScreen() {
 const navigation = useNavigation<StackNavigationProp<any, "Home">>();
 const { username } = useSession();
 const { theme } = useTheme();

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
    fontSize: theme.fonts.sizes.s34,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.fonts.sizes.s18,
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

  return (
    <View

      style={styles.container}
    >
      <Text style={styles.title}>Thank You {username || 'Guest'} !</Text>
      <Text style={styles.subtitle}>
        We are ready to use the app , Enjoy!
      </Text>
      <Image
        source={completed}
        style={styles.avatar}
      />
      <TouchableOpacity
        style={styles.submitButtonContainer}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Go To Home</Text>
      </TouchableOpacity>
    </View>
  )
}
