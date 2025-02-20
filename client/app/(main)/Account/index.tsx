import { useSession } from "@/src/ctx";
import theme from "@/src/theme";
import { Ionicons } from '@expo/vector-icons';
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { useAccessibility } from '../../../src/context/AccessibilityContext';

export default function AccountScreen() {
  const navigation = useNavigation<StackNavigationProp<any, "Detection", "Accessibility">>();
  const { username,signOut } = useSession();

 const { 
    highContrastMode, 
    largeTextMode, 
    darkMode, 
    monochromeMode
  } = useAccessibility();

  // const [fontScale] = useState(1);  // Default scale factor is 1 (normal size)

  const textStyle = {
    // fontSize: 16 * fontScale, // Dynamically scale font size
    color: highContrastMode ? 'yellow' : 'black',
  };

  return (
    <ScrollView style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={[styles.header, darkMode && styles.darkContainer1]}>
        <TouchableOpacity
          style={styles.signoutIcon}
          onPress={signOut}
          
        >
          <Ionicons name="log-out-outline" size={24} color="white" />
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200' }}
          style={styles.avatar}
        />
        <Text style={[styles.name, highContrastMode && styles.highContrastBackground, largeTextMode && styles.largeText, monochromeMode && styles.monochromeContainer, darkMode && styles.darkText]}>{username || 'Guest'}</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={[styles.statValue, highContrastMode && styles.highContrastBackground, darkMode && styles.darkText]}>248</Text>
            <Text style={[styles.statLabel, , highContrastMode && styles.highContrastBackground, darkMode && styles.darkText]}>Streaks</Text>
          </View>
          <View style={styles.stat}>
            <Text style={[styles.statValue, highContrastMode && styles.highContrastBackground, darkMode && styles.darkText]}>85</Text>
            <Text style={[styles.statLabel, highContrastMode && styles.highContrastBackground, darkMode && styles.darkText]}>Documents</Text>
          </View>
          <View style={styles.stat}>
            <Text style={[styles.statValue, highContrastMode && styles.highContrastBackground, darkMode && styles.darkText]}>15K</Text>
            <Text style={[styles.statLabel, highContrastMode && styles.highContrastBackground, darkMode && styles.darkText]}>Read Hours</Text>
          </View>
        </View>
      </View>



      <View style={styles.section}>
        <Text style={[styles.sectionTitle, highContrastMode && styles.highContrastBackground, darkMode && styles.darkText]}>Settings</Text>
        <TouchableOpacity style={[styles.settingItem, darkMode && styles.darkContainer1]}>
          <Ionicons name="person-outline" size={24} style={[{ color: darkMode ? "#FFFFFF" : "#666666" }]}  />
          <Text style={[styles.settingText, highContrastMode && styles.highContrastBackground, darkMode && styles.darkText]}>Edit Profile</Text>
          <Ionicons name="chevron-forward" size={24} style={[{ color: darkMode ? "#FFFFFF" : "#666666" }]}  />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.settingItem, darkMode && styles.darkContainer1]}
          onPress={() => navigation.navigate("Accessibility")}
        >
          <Ionicons name="accessibility-outline" size={24} style={[{ color: darkMode ? "#FFFFFF" : "#666666" }]}  />
          <Text style={[styles.settingText, highContrastMode && styles.highContrastBackground, darkMode && styles.darkText]}>Accessibility</Text>
          <Ionicons name="chevron-forward" size={24} style={[{ color: darkMode ? "#FFFFFF" : "#666666" }]}  />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.settingItem, darkMode && styles.darkContainer1]}>
          <Ionicons name="analytics-outline" size={24} style={[{ color: darkMode ? "#FFFFFF" : "#666666" }]}  />
          <Text style={[styles.settingText, highContrastMode && styles.highContrastBackground, darkMode && styles.darkText]}>Reports</Text>
          <Ionicons name="chevron-forward" size={24} style={[{ color: darkMode ? "#FFFFFF" : "#666666" }]}  />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.settingItem, darkMode && styles.darkContainer1]}
          onPress={() => navigation.navigate("Detection")}
        >
          <Ionicons name="shield-outline" size={24} style={[{ color: darkMode ? "#FFFFFF" : "#666666" }]}  />
          <Text style={[styles.settingText, highContrastMode && styles.highContrastBackground, darkMode && styles.darkText]}>Detection Test</Text>
          <Ionicons name="chevron-forward" size={24} style={[{ color: darkMode ? "#FFFFFF" : "#666666" }]}  />
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.offWhite,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.colors.primary.light2,
    position: 'relative',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  signoutIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: theme.colors.primary.dark2,
    borderRadius: 50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 16,
    color: '#666666',
    marginTop: 5,
  },
  statsRow: {
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
    backgroundColor: theme.colors.background.beige,
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.offWhite,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
  },
  highContrastBackground: {
    backgroundColor: 'yellow', // Adjust this if necessary
  },
  monochromeContainer: {
    backgroundColor: 'gray', // This will give the background a monochrome (gray) look
  },
  largeText: {
    fontSize: 20,
  },
  darkText: {
    color: '#fff',
  },
  darkContainer: {
    backgroundColor:  theme.colors.primary.dark1,
  },
  darkContainer1: {
    backgroundColor:  theme.colors.primary.dark3,
  },
});