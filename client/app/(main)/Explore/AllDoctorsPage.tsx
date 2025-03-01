import { useGetAllTherapists } from '@/src/hooks/therapist/useGetAllTherapist';
import theme from '@/src/theme';
import { IAvailability } from '@/src/types/therapist/availability';
import { ITherapist } from '@/src/types/therapist/therapist';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  RefreshControl,
  ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import EmptyState from './Emptystate';
import LoadingScreen from '@/src/components/loading';

const filters = ['All', 'Most Popular', 'Nearby doctor', 'Available', 'Online'];

const AllDoctorsPage = () => {
  const { therapists, loading, error, refetch } = useGetAllTherapists();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const navigation = useNavigation<StackNavigationProp<any, 'AllDoctorsPage'>>();

  // Refresh data when pulling down
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  // Extract unique dates from therapist availability slots
  const getAvailableDates = (availabilities: IAvailability[]): Date[] => {
    const uniqueDates = new Set<string>();
    availabilities.forEach((slot) => {
      const dateStr = new Date(slot.startTime).toDateString();
      uniqueDates.add(dateStr);
    });
    return Array.from(uniqueDates).map(dateStr => new Date(dateStr));
  };

  // Select the first available date automatically
  useEffect(() => {
    const allAvailableDates = therapists.reduce((acc: Date[], therapist) => {
      return acc.concat(getAvailableDates(therapist.availabilities || []));
    }, []);
    if (allAvailableDates.length > 0) {
      setSelectedDate(allAvailableDates[0]); // Set first available date
    }
  }, [therapists]);

  if (loading) return <LoadingScreen />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* 🔍 Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          placeholder="Enter therapist's name or location"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* 🔵 Filter Tabs */}
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


      {/* 🏥 Therapist List */}
      {therapists.length > 0 ? (
        therapists.map((therapist: ITherapist) => {
          const availableDates = getAvailableDates(therapist.availabilities || []);
          const filteredSlots = therapist.availabilities?.filter((slot: IAvailability) =>
            selectedDate && new Date(slot.startTime).toDateString() === selectedDate.toDateString()
          ) || [];

          return (
            <View key={therapist.therapistId} style={styles.doctorCard}>
              <Image source={{ uri: therapist.image }} style={styles.doctorImage} />
              <Text style={styles.doctorName}>{therapist.name}</Text>
              <Text style={styles.doctorSpecialty}>{therapist.description}</Text>

              {/* 🕒 Availability Section */}
              <View style={styles.availableTimeContainer}>
                <Text style={styles.availableTimeTitle}>Available time</Text>

                {/* 📅 Date Navigation */}
                {availableDates.length > 0 && (
                  <View style={styles.dateContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        const currentIndex = availableDates.findIndex(date => date.toDateString() === selectedDate?.toDateString());
                        if (currentIndex > 0) {
                          setSelectedDate(availableDates[currentIndex - 1]);
                        }
                      }}
                      style={styles.dateButton}
                      disabled={availableDates[0].toDateString() === selectedDate?.toDateString()}
                    >
                      <Ionicons name="chevron-back" size={20} color="black" />
                    </TouchableOpacity>

                    <Text style={styles.dateText}>{selectedDate ? selectedDate.toDateString() : 'No slots'}</Text>

                    <TouchableOpacity
                      onPress={() => {
                        const currentIndex = availableDates.findIndex(date => date.toDateString() === selectedDate?.toDateString());
                        if (currentIndex < availableDates.length - 1) {
                          setSelectedDate(availableDates[currentIndex + 1]);
                        }
                      }}
                      style={styles.dateButton}
                      disabled={availableDates[availableDates.length - 1].toDateString() === selectedDate?.toDateString()}
                    >
                      <Ionicons name="chevron-forward" size={20} color="black" />
                    </TouchableOpacity>
                  </View>
                )}

                {/* 🕒 Time Slots */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeScroll}>
                  {filteredSlots.length > 0 ? (
                    filteredSlots.map((slot: IAvailability) => (
                      <TouchableOpacity key={slot.availabilitySlotId} style={styles.timeSlot} onPress={() => navigation.navigate('BookTherapist', { therapistId: therapist.therapistId })}>
                        <Text style={styles.slotText}>
                          {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                      </TouchableOpacity>
                    ))
                  ) : (

                    <EmptyState param="available slots" />
                  )}
                </ScrollView>
              </View>
            </View>
          );
        })) : (

        <EmptyState param="Therapists" />
      )}
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
    fontSize: theme.fonts.sizes.s16,
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
    fontSize: theme.fonts.sizes.s14,
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
    fontSize: theme.fonts.sizes.s16,
    textAlign: 'center',
  },
  doctorSpecialty: {
    color: theme.colors.primary.dark3,
    fontSize: theme.fonts.sizes.s14,
    textAlign: 'center',
  },
  availableTimeContainer: {
    marginTop: 10,

  },
  availableTimeTitle: {
    fontWeight: 'bold',
    fontSize: theme.fonts.sizes.s14,
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
    fontSize: theme.fonts.sizes.s14,
    marginHorizontal: 8,
  },
  timeScroll: {
    flexDirection: 'row',
  },
  timeSlot: {
    backgroundColor: theme.colors.primary.dark2,
    color: 'white',
    padding: 8,
    borderRadius: 12,
    marginRight: 8,
  },
  slotText: {
    color: 'white',
  },
  noAvailabilityText: {
    color: 'gray',
    fontSize: theme.fonts.sizes.s14,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default AllDoctorsPage;
