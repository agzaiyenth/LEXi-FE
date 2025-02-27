import LoadingScreen from '@/src/components/loading';
import { useSession } from '@/src/ctx';
import { useStartTest } from '@/src/hooks/detection/useStartTest';
import theme from '@/src/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Alert, Image, StyleSheet, Text } from 'react-native';
import { SwipeButton } from 'react-native-expo-swipe-button';


export default function DetectionHomeScreen() {
  const navigation = useNavigation<StackNavigationProp<any, "DetectionHomeScreen">>();
 const { username } = useSession();
  const { startTest, loading } = useStartTest();

  const handleSwipeComplete = async () => {
    const sessionId = await startTest();
    if (sessionId) {
      navigation.navigate("TestScreen", { sessionId });
    } else {
      Alert.alert("Error", "Failed to start test. Please try again.");
    }
  };
if(loading){
  return <LoadingScreen/>
}
  return (
    <LinearGradient
      colors={[theme.colors.primary.light2, theme.colors.primary.light3]}
      style={styles.container}
    >
      <Image
        source={require('@/assets/images/auth/icon.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Hey There {username || 'Guest'}!</Text>
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
})