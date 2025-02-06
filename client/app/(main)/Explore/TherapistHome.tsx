
import { useGetAllTherapists } from '@/src/hooks/therapist/useGetAllTherapist';
import { useGetAppointments } from '@/src/hooks/therapist/useGetAppointments';
import { AppointmentDto, IAppointment } from '@/types/therapist/appointment';
import { ITherapist } from '@/types/therapist/therapist';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


const TherapistHome = () => {
  const navigation = useNavigation<StackNavigationProp<any, 'AllDoctorsPage'>>();
  const { therapists, loading:therapistsLoading, error:therapistsError} = useGetAllTherapists();
  const { appointments, loading: appointmentsLoading, error: appointmentsError } = useGetAppointments();

  // Show only the latest 5 therapists
  const latestTherapists = therapists.slice(0, 5);
  if (therapistsLoading || appointmentsLoading) {
    return <ActivityIndicator size="large" color="#007BFF" />;
  }

  if (therapistsError) return <Text>Error: {therapistsError}</Text>;
  if (appointmentsError) return <Text>Error: {appointmentsError}</Text>;

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
      {latestTherapists.map((therapist: ITherapist) => (
          <TouchableOpacity 
            key={therapist.therapistId}  
            onPress={() => navigation.navigate('BookTherapist', { therapistId: therapist.therapistId })}
          >
            <View style={styles.doctorCard}>
              <Image source={{ uri: therapist.image }} style={styles.doctorImage} />
              <Text style={styles.doctorName}>{therapist.name}</Text>
              <Text style={styles.doctorSpecialty}>{therapist.location}</Text>
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


      {appointments.length > 0 ? (
        appointments.map((appt: IAppointment) => (
          <TouchableOpacity key={appt.appointmentId} onPress={() => navigation.navigate('BookTherapist', { therapistId: appt.appointmentId })}>
            <View style={styles.appointmentCard}>
              <View style={styles.appointmentDateContainer}>
                <Text style={styles.appointmentDate}>
                  2023/12/3
                  {/* TODO Update the appointments dto to carry therapist details and date details instead of the ids */}
                  {/* {new Date(appt.appointmentTime).getDate()} */}
                  </Text>
                <Text style={styles.appointmentDay}>
                  monday
                  {/* {new Date(appt.appointmentTime).toLocaleString('en-US', { weekday: 'short' })} */}
                  </Text>
              </View>
              <View>
                <Text style={styles.appointmentDoctor}>Doctor Name: {appt.therapistId}</Text>
                <Text style={styles.appointmentSpecialty}>{appt.status}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noAppointmentsText}>No upcoming appointments</Text>
      )}

      <Text style={styles.sectionTitle}>Nearby Doctors</Text>

      {therapists.map((therapist:any) => (
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
  },noAppointmentsText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    marginTop: 10,
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
