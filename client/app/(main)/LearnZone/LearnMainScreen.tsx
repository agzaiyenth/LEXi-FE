import theme from '@/src/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LearnZoneParamList } from './index';
import CircleImage from '@/assets/images/learnZone/circle.png';
import MascotImage from '@/assets/images/learnZone/mascot.png';
import SoundwaveImage from '@/assets/images/learnZone/soundwave.png';
import { useTheme } from '@/src/context/ThemeContext';

type LearnMainNavigationProp = StackNavigationProp<LearnZoneParamList, 'LearnMain'>;

const LearnMainScreen = () => {
  const navigation = useNavigation<LearnMainNavigationProp>();
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary.light3,
      padding: 0,
    },
    headerContent: {
      padding: 16,
      marginEnd: 4,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      justifyContent: 'center',
    },
    headercircle: {
      width: 120,
      height: 120,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    backButton: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    backButtonText: {
      fontSize: theme.fonts.sizes.s18,
      color: '#B4DCD6',
    },
    headerTitle: {
      fontSize: theme.fonts.sizes.s28,
      color: '#fff',
      textAlign: 'center',
      fontWeight: '500',
    },
    mainContentCard: {
      backgroundColor: '#FFF9EB',
      borderRadius: 30,
      padding: 16,
      flexDirection: 'column',
      alignItems: 'center',
      margin: 0,
      height: '100%',
    },
    maincontenttitle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 0,
      margin: theme.spacing[20],
      gap: theme.spacing.small,
      marginBottom: theme.spacing[40],
    },
    learningText: {
      fontSize: theme.fonts.sizes.s32,
      marginLeft: theme.spacing.large,
      fontWeight: 'bold',
      color: '#4A4A4A',
    },
    mascotImage: {
      marginRight: theme.spacing.large,
      width: 180,
      height: 192,
    },
    featureCard: {
      backgroundColor: theme.colors.primary.medium2,
      borderRadius: theme.spacing[40],
      padding: 26,
      marginBottom: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: -15,
    },
    featureContent: {
      flex: 1,
      height: 120,
    },
    featureTitle: {
      fontSize: theme.fonts.sizes.s26,
      color: '#fff',
      fontWeight: '500',
    },
    featureSubtitle: {
      maxWidth: 230,
      fontSize: theme.fonts.sizes.s14,
      color: '#fff',
      opacity: 0.8,
    },
    bottomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    smallCard: {
      backgroundColor: theme.colors.primary.medium2,
      borderRadius: theme.spacing[40],
      padding: 16,
      width: '48%',
      height: 170,
    },
    readWithMeCard: {
      marginRight: 8,
      padding: theme.spacing[16],
    },
    smartReadCard: {
      marginLeft: 8,
      padding: theme.spacing[16],
    },
    smallCardTitle: {
      fontSize: theme.fonts.sizes.s24,
      color: '#fff',
      fontWeight: '500',
      marginBottom: theme.spacing.small,
    },
    smallCardSubtitle: {
      fontSize: theme.fonts.sizes.s14,
      color: '#fff',
      opacity: 0.8,
      marginBottom: 16,
      marginTop: -5,
    },
    arrow: {
      position: 'absolute',
      right: 20,
      top: 20,
      width: 40,
      height: 40,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    smallarrow: {
      position: 'absolute',
      right: theme.spacing[20],
      bottom: theme.spacing[20],
      width: 40,
      height: 40,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    soundwave: {
      padding: 0,
      height: 90,
      width: 250,
      position: 'absolute',
      right: -25,
      bottom: -20
  
    },
  });

  return (
    <View style={styles.container}>
      {/* Header Card */}
      <Image
        source={CircleImage}
        style={styles.headercircle}
      />
      <View style={styles.headerContent}>

        <Text style={styles.headerTitle}>LearnZone</Text>
      </View>

      <View style={styles.mainContentCard}>
        <View style={styles.maincontenttitle}>
          <Text style={styles.learningText}>Let's learn{'\n'}Something{'\n'}new</Text>
          <Image
            source={MascotImage}
            style={styles.mascotImage}
          />
        </View>
        {/* VoxBuddy Card */}
        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => navigation.navigate('VoxBuddy')}
        >

          <View style={styles.featureContent}>
            <Image
              source={SoundwaveImage}
              style={styles.soundwave}
            />
            <Text style={styles.featureTitle}>VOXBUDDY</Text>
            <Text style={styles.featureSubtitle}>AI-powered voice assistant for personalized learning support</Text>
          </View>
          <TouchableOpacity style={styles.arrow}
            onPress={() => navigation.navigate('VoxBuddy')}>
            <Ionicons name="arrow-forward-circle-outline" size={40} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Bottom Row Cards */}
        <View style={styles.bottomRow}>
          <TouchableOpacity style={[styles.smallCard, styles.readWithMeCard]}
            onPress={() => navigation.navigate('ReadWithMe')}
          >
            <Text style={styles.smallCardTitle}>ReadWithMe</Text>
            <Text style={styles.smallCardSubtitle}> Interactive tool to improve reading fluency with real-time feedback.</Text>
            <TouchableOpacity style={styles.smallarrow}
              onPress={() => navigation.navigate('ReadWithMe')}
            >
              <Ionicons name="arrow-forward-circle-outline" size={40} color="white" />
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.smallCard, styles.smartReadCard]}
            onPress={() => navigation.navigate('SmartRead')}
          >
            <Text style={styles.smallCardTitle}>SmartRead</Text>
            <Text style={styles.smallCardSubtitle}>Simplifies and reads content aloud for easier comprehension.</Text>
            <TouchableOpacity style={styles.smallarrow}
              onPress={() => navigation.navigate('SmartRead')}
            >
              <Ionicons name="arrow-forward-circle-outline" size={40} color="white" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};

export default LearnMainScreen;