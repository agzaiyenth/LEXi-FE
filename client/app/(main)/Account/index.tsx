import React from 'react';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import theme from '../../../src/theme';

const AccountScreen = () => {
  return (

    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton}>
          <Feather name="edit-2" size={20} color="#333" />
          <Text style={styles.editFont}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View style={styles.profileSection}>
      
        <Image 
        source={require('@/assets/images/auth/icon.png')} 
        style={styles.profileImage} 
        />
        <Text style={styles.profileName}>vinodi amarasinghe</Text>
        <Text style={styles.profileEmail}>vinodi@gmail.com</Text>
      </View>

       {/* Personal Info Section */}
       <ScrollView style={styles.infoSection}>
        <ScrollView>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Personal Info</Text>
        </View>  
        </ScrollView>
      
        <ScrollView style={styles.optionSection}>
        <View style={styles.optionCard}>
          {/* Change Password */}
          <TouchableOpacity style={styles.optionRow}>
            <Feather name="lock" size={20} color="#333" />
            <Text style={styles.optionText}>Change Password</Text>
            <AntDesign name="right" size={20} color="#333" />
          </TouchableOpacity>

          {/* Accessibility */}
          <TouchableOpacity style={styles.optionRow}>
            <MaterialIcons name="accessibility" size={20} color="#333" />
            <Text style={styles.optionText}>Accessibility</Text>
            <AntDesign name="right" size={20} color="#333" />
          </TouchableOpacity>
        </View>
        </ScrollView>
      </ScrollView>
      

      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.offWhite,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    marginTop:15,
   
  },
  backButton: {
    padding: 8,
  },
  editButton: {
    padding: 8,
    flexDirection: 'row',      
    alignItems: 'center',      
    justifyContent: 'center', 
  },

  editFont: {
    marginLeft: 8,             
    fontSize: theme.fonts.sizes.small,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  profileSection: {
    alignItems: 'center',
    marginVertical: 40,
    
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },

  infoSection: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 40,
    
  },
  optionSection: {
    flex: 1,
    marginHorizontal: 15,

  },
  card: {
    backgroundColor: theme.colors.primary.medium2,
    borderRadius: 10,
    padding: 12,
    elevation: 3,
    
  },

  optionCard: {
     
    padding: 15,
    elevation: 3,
  },
  
  sectionTitle: {
    fontSize: theme.fonts.sizes.medium,
    fontWeight: '600',
    marginBottom: 10,
    color: theme.colors.background.offWhite,
   

  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  optionText: {
    flex: 1,
    marginLeft: 10,
    fontSize: theme.fonts.sizes.small,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default AccountScreen;
