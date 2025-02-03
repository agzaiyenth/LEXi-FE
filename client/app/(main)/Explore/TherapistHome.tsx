import React from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { ExploreParamList } from '.';
import { StackNavigationProp } from '@react-navigation/stack';

const doctors = [
  { name: 'Dr. Freddy', specialty: 'Physiotherapist', rating: 3.5, image: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff' },
  { name: 'Dr. Sam', specialty: 'Physician', rating: 3.5, image: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff' },
  { name: 'Dr. Emma Lisa', specialty: 'Physician', rating: 5.0, reviews: 125, image: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff' },
  { name: 'Dr. Freddy', specialty: 'Physiotherapist', rating: 3.5, image: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff' },
  { name: 'Dr. Sam', specialty: 'Physician', rating: 3.5, image: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff' },
  { name: 'Dr. Emma Lisa', specialty: 'Physician', rating: 5.0, reviews: 125, image: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff' }
];

const appointments = [
  { date: '24', day: 'Tue', doctor: 'Dr. John Doe', specialty: 'Cardiologist' },
  { date: '30', day: 'Wed', doctor: 'Dr. John Smith', specialty: 'Cardiologist' }
];
type ExploreMainNavigationProp = StackNavigationProp<ExploreParamList, 'AllDoctorsPage'>;
const TherapistHome = () => {
    const navigation = useNavigation<ExploreMainNavigationProp>();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput placeholder="Search available doctor..." style={styles.searchInput} />
      </View>
    <View style={styles.titleContainer}> 
    <Text style={styles.sectionTitle}>Therapists</Text>
    <TouchableOpacity 
        onPress={() => navigation.navigate('AllDoctorsPage')}
        >
          <Text >See All</Text>
        </TouchableOpacity>
    </View>
     
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {doctors.slice(0, 4).map((doctor, index) => (
          <View key={index} style={styles.doctorCard}>
            <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
            <Text style={styles.doctorName}>{doctor.name}</Text>
            <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
            <Text style={styles.doctorRating}>⭐ {doctor.rating}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.seeAllCard} 
        onPress={() => navigation.navigate('AllDoctorsPage')}
        >
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </ScrollView>

      
      <View style={styles.titleContainer}> 
      <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
    <TouchableOpacity 
        onPress={() => navigation.navigate('AllDoctorsPage')}
        >
          <Text >See All</Text>
        </TouchableOpacity>
    </View>
      {appointments.map((appt, index) => (
        <View key={index} style={styles.appointmentCard}>
          <View style={styles.appointmentDateContainer}>
            <Text style={styles.appointmentDate}>{appt.date}</Text>
            <Text style={styles.appointmentDay}>{appt.day}</Text>
          </View>
          <View>
            <Text style={styles.appointmentDoctor}>{appt.doctor}</Text>
            <Text style={styles.appointmentSpecialty}>{appt.specialty}</Text>
          </View>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Nearby Doctors</Text>
      
      {doctors.slice(0, 5).map((doctor, index) => (
          <View key={index} style={styles.nearbyDoctorCard}>
          <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
          <Text style={styles.doctorRating}>⭐ {doctor.rating} ({doctor.reviews} Reviews)</Text>
        </View>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  seeAllCard: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    marginRight:20,
  },
  seeAllText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  horizontalScroll: {
    marginBottom: 16,
  },
  doctorCard: {
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    marginRight: 12,
    width: 150,
  },
  doctorImage: {
    width: 120,
    height: 100,
    borderRadius: 16,
    marginBottom: 8,
  },
  doctorName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  doctorSpecialty: {
    color: '#777',
    fontSize: 12,
  },
  doctorRating: {
    color: '#FFD700',
    fontSize: 14,
    marginTop: 4,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#cce7ff',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  appointmentDateContainer: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    marginRight: 12,
  },
  appointmentDate: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  appointmentDay: {
    color: '#fff',
    fontSize: 12,
  },
  appointmentDoctor: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  appointmentSpecialty: {
    color: '#777',
    fontSize: 12,
  },
  nearbyDoctorCard: {
    backgroundColor: '#e0e0e0',
    padding: 16,
    margin:10,
    borderRadius: 16,
    alignItems: 'center',
  },
  titleContainer: {
    display:'flex',
    flexDirection:'row',
    alignContent:'center',
    justifyContent:"space-between",
    padding:6,
  },
});

export default TherapistHome;
