import React from "react";
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View, Animated as RNAnimated } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSession } from '@/src/ctx';
import { theme } from '@/src/theme';
import { useFonts } from "expo-font";
import Animated, { FadeInUp } from 'react-native-reanimated';

// Constants for carousel dimensions
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SLIDER_WIDTH * 0.85;

// Your features data
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

// Your blogPosts data remains the same…
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

// FeatureCard remains the same
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

// BlogCard remains the same
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

function InfiniteCarousel({ data }: any) {
  const flatListRef = React.useRef(null);
  const CONTENT_PADDING = 10;
  const extendedData = [...data, ...data, ...data];
  const initialIndex = data.length;
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

  React.useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: initialIndex,
        animated: false,
      });
    }
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const onMomentumScrollEnd = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    let newIndex = Math.round(offsetX / ITEM_WIDTH);
    setCurrentIndex(newIndex);

    if (newIndex >= data.length * 2) {
      newIndex = newIndex - data.length;
      setCurrentIndex(newIndex);
      flatListRef.current.scrollToIndex({
        index: newIndex,
        animated: false,
      });
    } else if (newIndex < data.length) {
      newIndex = newIndex + data.length;
      setCurrentIndex(newIndex);
      flatListRef.current.scrollToIndex({
        index: newIndex,
        animated: false,
      });
    }
  };

  const getItemLayout = (data: any, index: number) => ({
    length: ITEM_WIDTH,
    offset: ITEM_WIDTH * index,
    index,
  });

  return (
    <RNAnimated.FlatList
      ref={flatListRef}
      data={extendedData}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      snapToInterval={ITEM_WIDTH}
      decelerationRate="fast"
      contentContainerStyle={{ paddingHorizontal: CONTENT_PADDING }}
      onMomentumScrollEnd={onMomentumScrollEnd}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }: any) => (
        <View style={{ width: ITEM_WIDTH-40, marginHorizontal: 2 }}>
          <FeatureCard item={item} index={index} />
        </View>
      )}
      getItemLayout={getItemLayout}
    />
  );
}


// HomeScreen with updated infinite scroll carousel
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

        {/* Updated Infinite Scroll Carousel */}
        <View style={styles.carouselContainer}>
          <InfiniteCarousel data={features} />
        </View>

        {/* Blog Cards Section */}
        <View style={styles.blogSection}>
          <Text style={styles.sectionTitleBlog}>Latest Articles</Text>
          {blogPosts.map((post, index) => (
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
    marginVertical: 20,
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
    shadowOffset: { width: 0, height: 2 },
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
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
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
    shadowOffset: { width: 0, height: 2 },
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
});
