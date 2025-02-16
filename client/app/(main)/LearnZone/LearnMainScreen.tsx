import theme from '@/src/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LearnZoneParamList } from './index';

type LearnMainNavigationProp = StackNavigationProp<LearnZoneParamList, 'LearnMain'>;

const LearnMainScreen = () => {
  const navigation = useNavigation<LearnMainNavigationProp>();

  return (
    <View style={styles.container}>
      {/* Header Card */}
      <Image
        source={require('@/assets/images/learnZone/circle.png')}
        style={styles.headercircle}
      />
      <View style={styles.headerContent}>

        <Text style={styles.headerTitle}>LearnZone</Text>
      </View>

      <View style={styles.mainContentCard}>
        <View style={styles.maincontenttitle}>
          <Text style={styles.learningText}>Let's learn{'\n'}Something{'\n'}new</Text>
          <Image
            source={require('@/assets/images/learnZone/mascot.png')}
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
              source={require('@/assets/images/learnZone/soundwave.png')}
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
    fontSize: 18,
    color: '#B4DCD6',
  },
  headerTitle: {
    fontSize: 28,
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
    margin: 20,
    gap: 20,
    marginBottom: 50,
  },
  learningText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  mascotImage: {
    width: 180,
    height: 192,
  },
  featureCard: {
    backgroundColor: theme.colors.primary.medium2,
    borderRadius: 40,
    padding: 26,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featureContent: {
    flex: 1,
    height: 120,
  },
  featureTitle: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '500',
  },
  featureSubtitle: {
    maxWidth: 230,
    fontSize: 15,
    color: '#fff',
    opacity: 0.8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallCard: {
    backgroundColor: theme.colors.primary.medium2,
    borderRadius: 40,
    padding: 16,
    width: '48%',
    height: 170,
  },
  readWithMeCard: {
    marginRight: 8,
  },
  smartReadCard: {
    marginLeft: 8,
  },
  smallCardTitle: {
    fontSize: 23,
    color: '#fff',
    fontWeight: '500',
    marginBottom: 4,
  },
  smallCardSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 16,
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
    right: 20,
    bottom: 20,
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

export default LearnMainScreen;