import React, { useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ITherapist } from '@/types/therapist/therapist';

const therapists: ITherapist[] = [
  {
    id: '1',
    name: 'Andrii Mykhailovych Kovalenko',
    description: 'General practitioner',
    image: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff',
    location: 'Kyiv, Ukraine',
    contact: '+1234567890',
    availability: [
      { id: 'a1', therapist: 'Andrii', startTime: new Date('2024-04-01T10:00:00'), endTime: new Date('2024-04-01T10:15:00'), available: true },
      { id: 'a2', therapist: 'Andrii', startTime: new Date('2024-04-01T10:30:00'), endTime: new Date('2024-04-01T10:45:00'), available: true },
    ],
  },
  {
    id: '2',
    name: 'Olena Ivanivna Shevchenko',
    description: 'Gynecologist',
    image: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff',
    location: 'Kyiv, Ukraine',
    contact: '+0987654321',
    availability: [
      { id: 'b1', therapist: 'Olena', startTime: new Date('2024-04-01T12:00:00'), endTime: new Date('2024-04-01T12:30:00'), available: true },
      { id: 'b2', therapist: 'Olena', startTime: new Date('2024-04-01T13:00:00'), endTime: new Date('2024-04-01T13:30:00'), available: true },
    ],
  },
];

const filters = ['All', 'Most Popular', 'Nearby doctor', 'Available', 'Online'];

const AllDoctorsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const changeDate = (direction: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toDateString().slice(0, 10);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput 
          placeholder="Enter therapist’s name or location" 
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

      {therapists.map((therapist,index) => (
        <View key={index} style={styles.doctorCard}>
          <Image source={{ uri: therapist.image }} style={styles.doctorImage} />
          <Text style={styles.doctorName}>{therapist.name}</Text>
          <Text style={styles.doctorSpecialty}>{therapist.description}</Text>

          <View style={styles.availableTimeContainer}>
            <Text style={styles.availableTimeTitle}>Available time</Text>
            <View style={styles.dateContainer}>
              <TouchableOpacity onPress={() => changeDate(-1)} style={styles.dateButton}>
                <Ionicons name="chevron-back" size={20} color="black" />
              </TouchableOpacity>
              <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
              <TouchableOpacity onPress={() => changeDate(1)} style={styles.dateButton}>
                <Ionicons name="chevron-forward" size={20} color="black" />
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeScroll}>
              {therapist.availability
                .filter((slot:any) => slot.available)
                .map((slot:any) => (
                  <TouchableOpacity key={slot.id} style={styles.timeSlot}>
                    <Text>{slot.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
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
  availableTimeContainer: {
    marginTop: 10,
  },
  availableTimeTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  dateButton: {
    padding: 8,
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 14,
    marginHorizontal: 8,
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
