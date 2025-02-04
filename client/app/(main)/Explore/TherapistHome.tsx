import { IAppointmentDto } from '@/types/therapist/appointment';
import { ITherapist } from '@/types/therapist/therapist';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const therapists: ITherapist[] = [
  {
    id: '1',
    name: 'Dr. Freddy',
    description: 'Physiotherapist',
    image: 'https://avatar.iran.liara.run/public/job/doctor/male',
    location: 'Clinic A',
    contact: '+1234567890',
    availability: [],
  },
  {
    id: '2',
    name: 'Dr. Sam',
    description: 'Physician',
    image: 'https://avatar.iran.liara.run/public/job/doctor/female',
    location: 'Clinic B',
    contact: '+0987654321',
    availability: [],
  }
];

const appointments: IAppointmentDto[] = [
  { Id: '1', user: 'User1', therapist: 'Dr. John Doe', appointmentTime: new Date(), status: 'Confirmed' },
  { Id: '2', user: 'User2', therapist: 'Dr. John Smith', appointmentTime: new Date(), status: 'Pending' }
];

const TherapistHome = () => {
  const navigation = useNavigation<StackNavigationProp<any, 'AllDoctorsPage'>>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput placeholder="Search available doctor..." style={styles.searchInput} />
      </View>

      <View style={styles.titleContainer}> 
        <Text style={styles.sectionTitle}>Therapists</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllDoctorsPage')}>
          <Text>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {therapists.slice(0, 4).map((therapist) => (
           <TouchableOpacity key={therapist.id}  onPress={() => navigation.navigate('BookTherapist')}>
          <View key={therapist.id} style={styles.doctorCard}>
            <Image source={{ uri: therapist.image }} style={styles.doctorImage} />
            <Text style={styles.doctorName}>{therapist.name}</Text>
            <Text style={styles.doctorSpecialty}>{therapist.description}</Text>
          </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.seeAllCard} onPress={() => navigation.navigate('AllDoctorsPage')}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.titleContainer}> 
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllDoctorsPage')}>
          <Text>See All</Text>
        </TouchableOpacity>
      </View>

      {appointments.map((appt) => (
         <TouchableOpacity key={appt.Id} onPress={() => navigation.navigate('BookTherapist')}>
        <View  style={styles.appointmentCard}>
          <View style={styles.appointmentDateContainer}>
            <Text style={styles.appointmentDate}>{appt.appointmentTime.getDate()}</Text>
            <Text style={styles.appointmentDay}>{appt.appointmentTime.toLocaleString('en-US', { weekday: 'short' })}</Text>
          </View>
          <View>
            <Text style={styles.appointmentDoctor}>{appt.therapist}</Text>
            <Text style={styles.appointmentSpecialty}>{appt.status}</Text>
          </View>
        </View>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Nearby Doctors</Text>

      {therapists.map((therapist) => (
        <TouchableOpacity key={therapist.id}  onPress={() => navigation.navigate('BookTherapist')}>
        <View key={therapist.id} style={styles.nearbyDoctorCard}>
          <Image source={{ uri: therapist.image }} style={styles.doctorImage} />
          <Text style={styles.doctorName}>{therapist.name}</Text>
          <Text style={styles.doctorSpecialty}>{therapist.description}</Text>
        </View>
        </TouchableOpacity>
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
    marginRight: 20,
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
    margin: 10,
    borderRadius: 16,
    alignItems: 'center',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    padding: 6,
  },
});

export default TherapistHome;
