import { useGetAllTherapist } from '@/src/hooks/therapist/useGetAllTherapist';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useCallback } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, RefreshControl } from 'react-native';

const filters = ['All', 'Most Popular', 'Nearby doctor', 'Available', 'Online'];

const AllDoctorsPage = () => {
  const { therapists, loading, error, refetch } = useGetAllTherapist();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  const changeDate = (direction: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toDateString().slice(0, 10);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput 
          placeholder="Enter therapist's name or location" 
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

      {therapists.map((therapist) => (
        <View key={therapist.id} style={styles.doctorCard}>
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
