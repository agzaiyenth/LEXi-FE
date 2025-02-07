
import { useGetAllTherapists } from '@/src/hooks/therapist/useGetAllTherapist';
import theme from '@/src/theme';
import { IAvailability } from '@/types/therapist/availability';
import { ITherapist } from '@/types/therapist/therapist';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useCallback } from 'react';
import { 
  Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, RefreshControl 
} from 'react-native';

const filters = ['All', 'Most Popular', 'Nearby doctor', 'Available', 'Online'];

const AllDoctorsPage = () => {
  const { therapists, loading, error, refetch } = useGetAllTherapists();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Change date for available slots
  const changeDate = (direction: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  // Format date for UI
  const formatDate = (date: Date) => date.toDateString().slice(0, 10);

  // Refresh data when pulling down
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/*  Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput 
          placeholder="Enter therapist's name or location" 
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/*  Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {filters.map((filter, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.filterTab, selectedFilter === filter && styles.selectedFilterTab]} 
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[styles.filterText, selectedFilter === filter && styles.selectedFilterText]}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/*  Therapist List */}
      {therapists.map((therapist: ITherapist) => (
        <View key={therapist.therapistId} style={styles.doctorCard}>
          <Image source={{ uri: therapist.image }} style={styles.doctorImage} />
          <Text style={styles.doctorName}>{therapist.name}</Text>
          <Text style={styles.doctorSpecialty}>{therapist.description}</Text>

          {/*  Availability Section */}
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

            {/*  Availability Slots */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeScroll}>
              {therapist.availabilities && therapist.availabilities.length > 0 ? (
                therapist.availabilities
                  .filter((slot: IAvailability) => slot.available) 
                  .map((slot: IAvailability) => (
                    <TouchableOpacity key={slot.availabilitySlotId} style={styles.timeSlot}>
                      <Text style={styles.slottext}>
                        {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Text>
                    </TouchableOpacity>
                  ))
              ) : (
                <Text style={styles.noAvailabilityText}>No available slots</Text>
              )}
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
    backgroundColor: theme.colors.background.offWhite,
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
    backgroundColor: theme.colors.primary.light3,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedFilterTab: {
    backgroundColor: theme.colors.primary.dark2,
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  selectedFilterText: {
    color: '#fff',
  },
  doctorCard: {
    backgroundColor: theme.colors.primary.light2,
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
    color: theme.colors.primary.dark3,
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
    backgroundColor: theme.colors.primary.dark2,
    color:'white',
    padding: 8,
    borderRadius: 12,
    marginRight: 8,
  },
  slottext:{
color:'white',
  },
  noAvailabilityText: {
    color: 'gray',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default AllDoctorsPage;
