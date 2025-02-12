
import { useNavigation } from "expo-router";
import { Link } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from "react-native";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { useSession } from '../../src/ctx';
import { theme } from '../../src/theme'; 
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    OpenDyslexic: require("../../assets/fonts/open-dyslexic.ttf"), // Adjust the path to the font file
  });
  const navigation = useNavigation();
  const { signOut } = useSession();
  const router =useRouter();
  
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Image source={require('../../assets/images/icon.png')} style={styles.welcomeImage} />
          <Text style={styles.headerText}>LEXi</Text>
        </View>
       

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.userName}>Vinodi Amarasinghe</Text>
        </View>

        {/* Greeting Card */}
        <View style={styles.greetingCard}>
          <View style={styles.greetingTextContainer}>
            <Text style={styles.greetingText}>Hey There!{"\n"}How Are You?</Text>
          </View>
          <View style={styles.greetingIcon}>
          <Image source={require('../../assets//images/welcome.png')} style={styles.mascotImage} />
          </View>
        </View>

        {/* Category List */}
        <View style={styles.wrapper}>
      <ScrollView style={styles.categoryList}>
        {[
          { name: "Profile", description: "Edit your profile", icon: "👤", path: "/profile" },
          { name: "LearnZone", description: "Improve Reading Skills with LEXi-AI", icon: "📚", path: "/learnzone" },
          { name: "Booked Sessions", description: "Booked Therapists Sessions", icon: "✅", path: "/profile" },
          { name: "Detection", description: "Assess your Dyslexia Level", icon: "📊", path: "/detection" },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryCard}
            onPress={() => router.push(item.path as any)} // Using router.push() for navigation??
          >
            <Text style={styles.categoryIcon}>{item.icon}</Text>
            <View style={styles.categoryDetails}>
              <Text style={styles.categoryTitle}>{item.name}</Text>
              <Text style={styles.categoryDescription}>{item.description}</Text>
            </View>
            <Text style={styles.arrow}>➤</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>


        {/* Sign Out Button */}
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
    position: "relative",
  },
  headerText: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: "bold",
    color: theme.colors.blacks.medium,
  },
  backArrow: {
    position: "absolute",
    top: 20,
    left: 20,
    fontSize: 40,
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
    //fontWeight: "bold",
    fontFamily:theme.fonts.regular2,
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
  
  mascotImage: {
    width: 120,
    height: 150,
    position: "absolute",
    bottom:-20,
    left:-50,
  },
  emoji: {
    fontSize: 24,
  },
  categoryList: {
    marginTop: 16,
  },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.primary.light2,
    padding: 18,
    marginTop:10,
    marginBottom: 8,
    borderRadius: 16,
    shadowColor: theme.colors.blacks.medium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryDetails: {
    flex: 1,
    marginLeft: 16,
  },
  categoryTitle: {
    fontSize: theme.fonts.sizes.medium,
    fontFamily:theme.fonts.regular2,
    lineHeight: theme.fonts.sizes.medium * 1.2,
    fontWeight: "600",
    color: theme.colors.blacks.dark,
  },
  categoryDescription: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.blacks.medium,
  },
  categoryAge: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.blacks.medium,
  },
  arrow: {
    fontSize: 20,
    color: theme.colors.blacks.medium,
  },
  bottomNavigation: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: theme.colors.background.offWhite,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: theme.colors.blacks.medium,
  },
  navIcon: {
    fontSize: 24,
    color: theme.colors.blacks.medium,
  },
  navIconActive: {
    fontSize: 24,
    color: theme.colors.primary.dark1,
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
