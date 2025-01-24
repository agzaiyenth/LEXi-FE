import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LearnZoneParamList } from './index';
import { MaterialIcons } from '@expo/vector-icons';
import theme from '@/src/theme';

type LearnMainNavigationProp = StackNavigationProp<LearnZoneParamList, 'LearnMain'>;

const LearnMainScreen = () => {
  const navigation = useNavigation<LearnMainNavigationProp>();

  return (
    <View style={styles.container}>
      {/* Header Card */}
      
      <View style={styles.headerContent}>
  <Text style={styles.headerTitle}>LearnZone</Text>
</View>
        
        <View style={styles.mainContentCard}>
          <View style={styles.maincontenttitle}>
          <Text style={styles.learningText}>Let's learn{'\n'}Something new</Text>
          <Image 
            source={{ uri: 'https://kitpro.site/aromista/wp-content/uploads/sites/204/2023/12/cup-of-coffee-800x538.png' }}
            style={styles.mascotImage}
          />
          </View>
           {/* VoxBuddy Card */}
      <TouchableOpacity 
        style={styles.featureCard}
        onPress={() => navigation.navigate('VoxBuddy')}
      >
        <View style={styles.featureContent}>
          <Text style={styles.featureTitle}>VOXBUDDY</Text>
          <Text style={styles.featureSubtitle}>this will blah blah</Text>
        </View>
        <TouchableOpacity style={styles.circleButton}>
          <Text style={styles.circleButtonText}>+</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Bottom Row Cards */}
      <View style={styles.bottomRow}>
        <TouchableOpacity style={[styles.smallCard, styles.readWithMeCard]}>
          <Text style={styles.smallCardTitle}>ReadWithMe</Text>
          <Text style={styles.smallCardSubtitle}>this will blah blah</Text>
          <TouchableOpacity style={styles.circleButton}>
            <Text style={styles.circleButtonText}>+</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.smallCard, styles.smartReadCard]}>
          <Text style={styles.smallCardTitle}>SmartRead</Text>
          <Text style={styles.smallCardSubtitle}>this will blah blah</Text>
          <TouchableOpacity style={styles.circleButton}>
            <Text style={styles.circleButtonText}>+</Text>
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
    padding : 16,
   marginEnd:4,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
    fontSize: 18,
    color: '#fff',
    alignContent:'center',
    textAlign:'center',
    fontWeight: '500',
  },
  mainContentCard: {
    backgroundColor: '#FFF9EB',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    margin:0,
    height: '100%',
  },
  maincontenttitle:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:0,
    margin:20,
    gap:20,
  },
  learningText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  mascotImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  featureCard: {
    backgroundColor: theme.colors.primary.medium2,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  featureSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallCard: {
    backgroundColor: theme.colors.primary.medium2,
    borderRadius: 20,
    padding: 16,
    width: '48%',
  },
  readWithMeCard: {
    marginRight: 8,
  },
  smartReadCard: {
    marginLeft: 8,
  },
  smallCardTitle: {
    fontSize: 16,
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
  circleButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleButtonText: {
    fontSize: 16,
    color: '#B4DCD6',
  },
});

export default LearnMainScreen;