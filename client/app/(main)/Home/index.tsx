import { useSession } from '@/src/ctx';
import { theme } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInUp } from 'react-native-reanimated';
import Carousel from 'react-native-snap-carousel';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SLIDER_WIDTH * 0.85;

const features = [
  {
    id: '1',
    title: 'SmartRead',
    description: 'Simplify complex documents with real-time summarization and audio highlights.',
    image: 'https://i.ibb.co/HpXN19vB/3.png',
    link: 'SmartRead'
  },
  {
    id: '3',
    title: 'VoxBuddy',
    description: 'An AI-powered assistant offering personalized guidance and interactive learning support.',
    image: 'https://i.ibb.co/bgDMcJGJ/4.png',
    link: 'VoxBuddy'
  },
  {
    id: '4',
    title: 'Read With Me',
    description: 'An interactive reading companion that provides real-time pronunciation feedback.',
    image: 'https://i.ibb.co/WWssF7KS/2.png',
    link: 'ReadWithMe'
  },
  {
    id: '5',
    title: 'PlaySpace',
    description: 'Engage in gamified learning activities designed to boost reading fluency and memory.',
    image: 'https://i.ibb.co/8Dbkz1tM/1.png',
    link: 'PlayMainScreen'
  },
];

const blogPosts = [
  {
    id: '1',
    category: 'Education',
    title: 'The Future of Online Learning',
    author: 'Sarah Parker',
    date: 'Jan 12, 2024',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800',
  },
  {
    id: '2',
    category: 'Technology',
    title: 'AI Revolution in Education',
    author: 'Mike Johnson',
    date: 'Jan 10, 2024',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
  },
  {
    id: '3',
    category: 'Research',
    title: 'New Study Methods Revealed',
    author: 'Emma Thompson',
    date: 'Jan 8, 2024',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
  },
];

// No spread of the "key" prop inside the child.
// We only accept the props we actually need:
function BlogCard({ item, index }: any) {
  return (
    <Animated.View
      entering={FadeInUp.delay(index * 100)}
      style={styles.blogCard}
    >
      <Image source={{ uri: item.image }} style={styles.blogImage} />
      <View style={styles.blogContent}>
        <View style={styles.blogHeader}>
          <Text style={styles.blogCategory}>{item.category}</Text>
          <View style={styles.blogMeta}>
            <Text style={styles.blogAuthor}>{item.author}</Text>
            <Text style={styles.blogDate}> · {item.date}</Text>
          </View>
        </View>
        <Text style={styles.blogTitle}>{item.title}</Text>
      </View>
    </Animated.View>
  );
}

function FeatureCard({ item, index }: any) {
  return (
    <Animated.View
      entering={FadeInUp.delay(index * 100)}
      style={[styles.cardContainer, { zIndex: features.length - index }]}
    >
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
          <Pressable style={styles.seeMoreButton}>
            <Text style={styles.buttonText}>See more</Text>
            <Ionicons name="chevron-forward" size={20} color="white" />
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    OpenDyslexic: require("@/assets/fonts/open-dyslexic.ttf"),
  });
  const { username } = useSession();

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image source={require('@/assets/images/icon.png')} style={styles.welcomeImage} />
          <Text style={styles.headerText}>LEXi</Text>
        </View>

        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            Welcome{' '}
            <Text style={styles.userName}>
              {username ? username.charAt(0).toUpperCase() + username.slice(1) : 'Guest'}
            </Text>,
          </Text>
        </View>

        <View style={styles.greetingCard}>
          <View style={styles.greetingTextContainer}>
            <Text style={styles.greetingText}>Hey There!{"\n"}How Are You?</Text>
          </View>
          <View style={styles.greetingIcon}>
            <Image source={require('@/assets/images/welcome.png')} style={styles.mascotImage} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} >
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
        <View style={styles.carouselContainer}>
          <Carousel
            data={features}
            // Notice we use key here, but we do NOT pass key via spread into FeatureCard.
            renderItem={({ item, index }) => (
              <FeatureCard item={item} index={index} />
            )}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            layout="stack"
            layoutCardOffset={18}
            loop
            autoplay
            autoplayInterval={3000}
            vertical={false}
          />
        </View>

        {/* Blog Cards Section */}
        <View style={styles.blogSection}>
          <Text style={styles.sectionTitleBlog}>Latest Articles</Text>
          {blogPosts.map((post, index) => (
            // same fix for BlogCard
            <BlogCard key={post.id} item={post} index={index} />
          ))}
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
  carouselContainer: {
    height: 300,
  },
  cardContainer: {
    padding: 10,
    height: 300,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    height: '100%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
    borderRadius: 20,
  },
  heartButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    color: 'white',
    marginLeft: 4,
    fontSize: 16,
    fontWeight: '600',
  },
  reviews: {
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 4,
    fontSize: 14,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 16,
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 4,
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
    fontSize: theme.fonts.sizes.large,
    fontWeight: "500",
    paddingLeft: 10,
  },
  userName: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: "600",
  }, statsRow: {
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
    paddingLeft: 8,
    paddingRight: 0,
  },
  sectionTitle: {
    paddingLeft: 8,
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

  blogSection: {
    padding: 24,
  },
  sectionTitleBlog: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  blogCard: {
    backgroundColor: theme.colors.background.beige,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  blogImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  blogContent: {
    padding: 16,
  },
  blogHeader: {
    marginBottom: 8,
  },
  blogCategory: {
    color: theme.colors.primary.medium2,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  blogMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  blogAuthor: {
    fontSize: 14,
    color: '#6B7280',
  },
  blogDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    lineHeight: 24,
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

  blogGrid: {
    marginTop: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
