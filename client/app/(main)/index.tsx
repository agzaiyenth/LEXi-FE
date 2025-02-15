import { useNavigation } from "expo-router";
import { Link } from "expo-router";
import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, FlatList, Dimensions } from "react-native";
import { useSession } from '../../src/ctx';
import { theme } from '../../src/theme'; 
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get("window").width;

const swipeData = [
  { title: "SmartRead", description: "Read and summarize text easily", image: require("../../assets/images/icon.png") },
  { title: "VoxBuddy", description: "Your AI voice companion", image: require("../../assets/images/icon.png") },
  { title: "Detection", description: "Assess your dyslexia level", image: require("../../assets/images/icon.png") },
  { title: "Play Space", description: "Engaging dyslexia-friendly games", image: require("../../assets/images/icon.png") },
];

const blogCards = [
  { title: "How to Use SmartRead", description: "Learn how SmartRead can help you.", image: "📚", link: "/blog/smartread" },
  { title: "VoxBuddy: Your New AI Assistant", description: "Discover how VoxBuddy can assist you.", image: "📚", link: "/blog/voxbuddy" },
  { title: "Understanding Dyslexia Detection", description: "Assess your dyslexia level with our tool.", image: "📚", link: "/blog/detection" },
  { title: "Dyslexia-Friendly Tools", description: "Explore tools to assist dyslexia users.", image: "📚", link: "/blog/tools" },
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
    <ScrollView style={styles.wrapper}>
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
  <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.achievementCard}>
           
            <View style={[styles.achievementIcon, { backgroundColor: theme.colors.primary.dark3 }]}>
              <Ionicons name="flame" size={24} color={theme.colors.background.offWhite} />
            </View>
            <Text style={styles.achievementTitle}>30 Day Streak</Text>
          </View>
          <View style={styles.achievementCard}>
            <View style={[styles.achievementIcon, { backgroundColor: theme.colors.primary.dark3 }]}>
              <Ionicons name="document-outline" size={24} color={theme.colors.background.offWhite} />
            </View>
            <Text style={styles.achievementTitle}>100 Files</Text>
          </View>
          <View style={styles.achievementCard}>
          <View style={[styles.achievementIcon, { backgroundColor: theme.colors.primary.dark3 }]}>
              <Ionicons name="trophy" size={24} color={theme.colors.background.offWhite} />
            </View>
            <Text style={styles.achievementTitle}>10K ReadTime</Text>
          </View>
        </ScrollView>
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

        {/* Blog Cards Section */}
        <View style={styles.blogCardsContainer}>
          <Text style={styles.blogCardsTitle}>Latest Blogs</Text>
          <FlatList
            data={blogCards}
            numColumns={2} // Set number of columns to 2
            keyExtractor={(item, index) => index.toString()}
            style={{ marginTop: 20 }}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.blogCard} onPress={() => router.push(item.link as any)}>
                <Text style={styles.blogCardImage}>{item.image}</Text>
                <Text style={styles.blogCardTitle}>{item.title}</Text>
                <Text style={styles.blogCardDescription}>{item.description}</Text>
                <TouchableOpacity style={styles.readMoreButton} onPress={() => router.push(item.link as any)}>
                  <Text style={styles.readMoreText}>Read More</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </ScrollView>
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
  },statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  achievementCard: {
    backgroundColor: theme.colors.primary.light2,
    padding: 15,
    borderRadius: 12,
    marginRight: 15,
    alignItems: 'center',
    width: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
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
  blogCardsContainer: {
    marginTop: 40,
  },
  blogCardsTitle: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: "bold",
    color: theme.colors.blacks.medium,
  },
  blogCard: {
    width: (screenWidth - 48) / 2, 
    height: 180,
    backgroundColor: theme.colors.primary.light2,
    borderRadius: 16,
    padding: 20,
    marginBottom: 30, 
    marginRight:20,
    justifyContent: "center",
    alignItems: "center",
  },
  blogCardImage: { 
    fontSize: 40,
     marginTop:10,
    },
  blogCardTitle: {
    fontSize: theme.fonts.sizes.large/2,
    fontWeight: "600",
    color: theme.colors.blacks.dark,
    marginTop: 10,
  },
  blogCardDescription: {
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
  readMoreButton: {
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.primary.dark1,
    borderRadius: 8,
  },
  readMoreText: {
    color: theme.colors.background.offWhite,
    fontSize: theme.fonts.sizes.small,
    fontWeight: "bold",
  },
});
