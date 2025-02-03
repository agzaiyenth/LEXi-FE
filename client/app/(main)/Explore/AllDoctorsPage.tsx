import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const doctors = [
  { name: 'Andrii Mykhailovych Kovalenko', specialty: 'General practitioner', rating: 4.5, experience: '12 years', reviews: 50, image: 'https://via.placeholder.com/100' },
  { name: 'Olena Ivanivna Shevchenko', specialty: 'Gynecologist', rating: 4.7, experience: '17 years', reviews: 22, image: 'https://via.placeholder.com/100' },
];

const filters = ['All', 'Gynecologist', 'Family doctor', 'Pediatrician'];

const availableTimes = ['10:00', '10:15', '10:30', '10:45'];

const AllDoctorsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('Today, 02 Jan');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput 
          placeholder="Enter doctor’s name or specialization" 
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {filters.map((filter, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.filterTab, selectedFilter === filter && styles.selectedFilterTab]} 
            onPress={() => setSelectedFilter(filter)}>
            <Text style={[styles.filterText, selectedFilter === filter && styles.selectedFilterText]}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {doctors.map((doctor, index) => (
        <View key={index} style={styles.doctorCard}>
          <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
          <Text style={styles.doctorDetails}>⭐ {doctor.rating} ({doctor.reviews} Reviews) | {doctor.experience} of ex.</Text>

          <View style={styles.availableTimeContainer}>
            <Text style={styles.availableTimeTitle}>Available time</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeScroll}>
              {availableTimes.map((time, timeIndex) => (
                <TouchableOpacity key={timeIndex} style={styles.timeSlot}>
                  <Text>{time}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
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
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginRight: 8,
  },
  selectedFilterTab: {
    backgroundColor: '#007BFF',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  selectedFilterText: {
    color: '#fff',
  },
  doctorCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 8,
  },
  doctorName: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  doctorSpecialty: {
    color: '#007BFF',
    fontSize: 14,
    textAlign: 'center',
  },
  doctorDetails: {
    color: '#777',
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 4,
  },
  availableTimeContainer: {
    marginTop: 10,
  },
  availableTimeTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  timeScroll: {
    flexDirection: 'row',
  },
  timeSlot: {
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 12,
    marginRight: 8,
  },
});

export default AllDoctorsPage;
