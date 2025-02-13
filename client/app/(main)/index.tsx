import { useNavigation } from "expo-router";
import { Link } from "expo-router";
import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, FlatList, Dimensions } from "react-native";
import { useSession } from '../../src/ctx';
import { theme } from '../../src/theme'; 
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";

const screenWidth = Dimensions.get("window").width;

const swipeData = [
  { title: "SmartRead", description: "Read and summarize text easily", image: require("../../assets/images/icon.png") },
  { title: "VoxBuddy", description: "Your AI voice companion", image: require("../../assets/images/icon.png") },
  { title: "Detection", description: "Assess your dyslexia level", image: require("../../assets/images/icon.png") },
  { title: "Play Space", description: "Engaging dyslexia-friendly games", image: require("../../assets/images/icon.png") },
];

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    OpenDyslexic: require("../../assets/fonts/open-dyslexic.ttf"), 
  });
  const navigation = useNavigation();
  const { signOut } = useSession();
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % swipeData.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image source={require('../../assets/images/icon.png')} style={styles.welcomeImage} />
          <Text style={styles.headerText}>LEXi</Text>
        </View>
        
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.userName}>Vinodi Amarasinghe</Text>
        </View>

        <View style={styles.greetingCard}>
          <View style={styles.greetingTextContainer}>
            <Text style={styles.greetingText}>Hey There!{"\n"}How Are You?</Text>
          </View>
          <View style={styles.greetingIcon}>
            <Image source={require('../../assets/images/welcome.png')} style={styles.mascotImage} />
          </View>
        </View>

        {/* Swipeable Feature Section */}
        <FlatList
          ref={flatListRef}
          data={swipeData}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          style={{ marginTop: 20 }}
          renderItem={({ item }) => (
            <View style={styles.swipeCard}>
              <Image source={item.image} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          )}
        />
        
        <TouchableOpacity onPress={signOut} style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.background.offWhite,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  welcomeImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: "bold",
    color: theme.colors.blacks.medium,
  },
  welcomeSection: {
    marginTop: 16,
  },
  welcomeText: {
    color: theme.colors.blacks.medium,
  },
  userName: {
    fontSize: theme.fonts.sizes.medium,
    fontWeight: "600",
  },
  greetingCard: {
    marginTop: 16,
    backgroundColor: theme.colors.primary.dark1,
    borderRadius: 16,
    padding: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greetingTextContainer: {
    flex: 1,
  },
  greetingText: {
    color: theme.colors.background.offWhite,
    fontSize: theme.fonts.sizes.medium,
    fontFamily: theme.fonts.regular2,
    lineHeight: theme.fonts.sizes.medium * 1.2,
  },
  greetingIcon: {
    width: 50,
    height: 50,
    backgroundColor: theme.colors.background.offWhite,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  mascotImage: {
    width: 120,
    height: 150,
    position: "absolute",
    bottom: -20,
    left: -50,
  },
  swipeCard: {
    width: 330,
    height: 180,
    backgroundColor: theme.colors.primary.light2,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  cardTitle: {
    fontSize: theme.fonts.sizes.medium,
    fontWeight: "600",
    color: theme.colors.blacks.dark,
    marginTop: 10,
  },
  cardDescription: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.blacks.medium,
    textAlign: "center",
  },
  signOutButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: theme.colors.primary.dark1,
    borderRadius: 8,
    alignItems: "center",
  },
  signOutText: {
    color: theme.colors.background.offWhite,
    fontSize: theme.fonts.sizes.medium,
    fontWeight: "bold",
  },
});
