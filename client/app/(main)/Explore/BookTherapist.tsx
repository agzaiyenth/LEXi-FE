import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  Animated,
  RefreshControl
} from 'react-native';
import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ITherapist } from '@/types/therapist/therapist';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import theme from '@/src/theme';
import apiClient from '@/src/apiClient';
import EmptyState from './Emptystate';




// Helper function to determine time period from start time
const getTimePeriod = (startTime: string): string => {
  const hour = new Date(startTime).getHours();
  if (hour < 12) return 'Morning';
  else if (hour < 17) return 'Afternoon';
  else return 'Evening';
};

// Success Modal Component
const SuccessModal = ({ visible }: { visible: boolean }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible]);
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.modalContainer}>
        <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleAnim }] }]}>
          <Ionicons name="checkmark-circle" size={60} color="#28a745" />
          <Text style={styles.modalText}>Booking Scheduled!</Text>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Error Modal Component
const ErrorModal = ({ visible }: { visible: boolean }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible]);
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.modalContainer}>
        <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleAnim }] }]}>
          <Ionicons name="close-circle" size={60} color="#dc3545" />
          <Text style={styles.modalText}>Booking Error!</Text>
        </Animated.View>
      </View>
    </Modal>
  );
};

const BookTherapist = () => {
  const navigation = useNavigation<StackNavigationProp<any, 'AllDoctorsPage'>>();
  const route = useRoute();
  const { therapistId } = route.params as { therapistId: string };

  // State for fetched therapist details
  const [therapistData, setTherapistData] = useState<ITherapist | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // States for time selection
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Morning');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<string>('');

  // States for booking process
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<boolean>(false);

  // State for refreshing
  const [refreshing, setRefreshing] = useState<boolean>(false);

 
  const timePeriods = ['Morning', 'Afternoon', 'Evening'];

    // Fetch therapist details from API
    const fetchTherapist = async () => {
      try {
        const response = await apiClient.get(`/therapist/${therapistId}`);
        setTherapistData(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error fetching therapist details');
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchTherapist();
    }, [therapistId]);

    // Handle refresh action
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTherapist().finally(() => setRefreshing(false));
  }, []);

    //  calculate slot counts per period
  const periodSlotCounts = useMemo(() => {
    const counts: { [key: string]: number } = { Morning: 0, Afternoon: 0, Evening: 0 };
    
    therapistData?.availabilities?.forEach((slot) => {
      const slotDateStr = new Date(slot.startTime).toDateString();
      if (slotDateStr === selectedDay && slot.available) {
        const period = getTimePeriod(slot.startTime);
        counts[period]++;
      }
    });
    
    return counts;
  }, [therapistData, selectedDay]);

  useEffect(() => {
    console.log('Received therapistId:', therapistId);
  }, [therapistId]);

  // Compute unique available days from the availabilities response
  const availableDays = useMemo(() => {
    if (!therapistData || !therapistData.availabilities) return [];
    const unique = new Set(
      therapistData.availabilities.map((slot) =>
        new Date(slot.startTime).toDateString()
      )
    );
    // Sort the days chronologically
    return Array.from(unique).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  }, [therapistData]);

  

  // When availableDays update, set the default selectedDay 
  useEffect(() => {
    if (availableDays.length > 0) {
      if (!selectedDay || !availableDays.includes(selectedDay)) {
        setSelectedDay(availableDays[0]);
      }
    }
  }, [availableDays, selectedDay]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary.dark2} />
      </View>
    );
  }

  if (error || !therapistData) {
    return <Text>Error: {error}</Text>;
  }

  // Filter the available time slots based on selected period and day (include booked slots too)
  const filteredSlots = therapistData.availabilities?.filter((slot) => {
    const slotDateStr = new Date(slot.startTime).toDateString();
    return getTimePeriod(slot.startTime) === selectedPeriod &&
           (selectedDay ? slotDateStr === selectedDay : true);
  }) || [];

  // Handle booking when the "Book Now" button is pressed
  const handleBookNow = async () => {
    if (!selectedTime) {
      alert("Please select a time slot");
      return;
    }
    try {
      setBookingLoading(true);
      // Construct payload (userId is extracted on server from JWT)
      const payload = {
        therapistId: therapistData.therapistId,
        availabilitySlotId: Number(selectedTime)
      };
      const response = await apiClient.post('/appointments', payload);
      console.log('Booking response:', response.data);
      setBookingSuccess(true);
      await fetchTherapist();
      setSelectedTime('');
      setTimeout(() => {
        setBookingSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Booking error:', err);
      setBookingError(true);
      setTimeout(() => {
        setBookingError(false);
      }, 3000);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/learnZone/circle.png')}
        style={styles.headercircle}
      />
      {/*Go Back*/}
      <View style={styles.headerContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.mainContentCard}>
        {/* Therapist Profile Section */}
        <View style={styles.profileContainer}>
          <Image source={{ uri: therapistData.image }} style={styles.therapistImage} />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{therapistData.name}</Text>
            <Text style={styles.specialty}>{therapistData.description}</Text>
            <Text style={styles.price}>$20/hr</Text>
          </View>
        </View>

        {/* Details Container  */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailBox}>
            <Text style={styles.detailValue}>14 years</Text>
            <Text style={styles.detailLabel}>Experience</Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.detailValue}>2456</Text>
            <Text style={styles.detailLabel}>Patients</Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.detailValue}>⭐ 2.4k</Text>
            <Text style={styles.detailLabel}>Reviews</Text>
          </View>
        </View>

        {/* Tabs Container (do not remove) */}
        <View style={styles.tabsContainer}>
          <Text style={[styles.tab, styles.activeTab]}>Schedules</Text>
          <Text style={styles.tab}>About</Text>
          <Text style={styles.tab}>Experiences</Text>
          <Text style={styles.tab}>Reviews</Text>
        </View>

        <ScrollView style={styles.scheduleContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* Day Tabs  */}
          {availableDays.length > 0 && (
            <View style={styles.dateContainer}>
              {availableDays.map((day, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedDay(day)}
                  style={[styles.day, selectedDay === day && styles.selectedDay]}
                >
                  <Text style={[styles.dayText, selectedDay === day && styles.selectedDayText]}>
                    {new Date(day).toLocaleString('en-US', { weekday: 'short' })}
                  </Text>
                  <Text style={[styles.dateText, selectedDay === day && styles.selectedDayText]}>
                    {new Date(day).getDate()}
                  </Text>
                  <Text style={[styles.dayText, selectedDay === day && styles.selectedDayText]}>
                    {new Date(day).toLocaleString('en-US', { month: 'short' })}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          </ScrollView>

          {/* Time Period Tabs */}
          <View style={styles.periodContainer}>
            {timePeriods.map((period) => (
             <TouchableOpacity
             key={period}
             style={[styles.periodButton, selectedPeriod === period && styles.selectedPeriod]}
             onPress={() => setSelectedPeriod(period)}
           >
             <View style={{ position: 'relative' }}>
               <Text style={[styles.periodText, selectedPeriod === period && styles.selectedPeriodText]}>
                 {period}
               </Text>
               {periodSlotCounts[period] > 0 && (
                 <View style={[styles.badge,selectedPeriod === period && styles.selectedBadge]}>
                   <Text style={styles.badgeText}>{periodSlotCounts[period]}</Text>
                 </View>
               )}
             </View>
           </TouchableOpacity>
            ))}
          </View>

          {/* Horizontal Scroll for Time Slots */}
          <ScrollView  contentContainerStyle={styles.timeSlotsContainer}>
            {filteredSlots.length > 0 ? (
              filteredSlots.map((slot) => (
                <TouchableOpacity
                  key={slot.availabilitySlotId}
                  style={[
                    styles.timeSlot,
                    selectedTime === slot.availabilitySlotId.toString() && styles.selectedTimeSlot,
                    !slot.available && styles.bookedSlot // Apply booked style if not available
                  ]}
                  onPress={() => {
                    if (slot.available) {
                      setSelectedTime(slot.availabilitySlotId.toString());
                    }
                  }}
                  activeOpacity={slot.available ? 0.7 : 1} // Disable opacity effect if booked
                >
                  <Text
                    style={[
                      styles.timeText,
                      selectedTime === slot.availabilitySlotId.toString() && styles.selectedTimeText,
                      !slot.available && styles.bookedTimeText
                    ]}
                  >
                    {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
             
              <EmptyState param="available slots" />
            )}
          </ScrollView>
        </ScrollView>

        {/* Action Section (chat bubble, Book Now button, etc.) */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.messageButton}>
            <Ionicons name="chatbubble-outline" size={24} color="#3B8C84" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookNowButton} onPress={handleBookNow} disabled={bookingLoading}>
            {bookingLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.bookNowText}>Book Now</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Booking Success Modal */}
      <SuccessModal visible={bookingSuccess} />

      {/* Booking Error Modal */}
      <ErrorModal visible={bookingError} />
    </View>
  );
};

export default BookTherapist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary.light3,
    padding: 0,
  },
  backButton: {
    marginBottom: 10,
  },
  mainContentCard: {
    backgroundColor: '#FFF9EB',
    borderRadius: 30,
    padding: 10,
    margin: 0,
    height: '100%',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 180,
    padding: 15,
    borderRadius: 10,
  },
  therapistImage: {
    width: 120,
    height: 150,
    borderRadius: 10,
    marginRight: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: theme.colors.primary.medium,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  detailBox: {
    alignItems: 'center',
  },
  detailValue: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1F2937',
  },
  detailLabel: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    marginTop: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: 'black',
  },
  activeTab: {
    color: '#3B8C84',
    borderBottomWidth: 2,
    borderBottomColor: '#3B8C84',
  },
  scheduleContainer: {
    marginVertical: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  day: {
    alignItems: 'center',
    padding: 10,
    paddingHorizontal:23,
  },
  selectedDay: {
    backgroundColor: theme.colors.primary.medium2,
    borderRadius: 10,
  },
  dayText: {
    color: 'gray',
  },
  dateText: {
    fontSize: 16,
  },
  selectedDayText: {
    color: theme.colors.primary.medium,
    fontWeight: 'bold',
  },
  periodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.primary.medium2,
    padding: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  selectedPeriod: {
    backgroundColor: '#3B8C84',
  },
  periodText: {
    color: 'white',
  },
  selectedPeriodText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerContent: {
    padding: 8,
    marginEnd: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  headercircle: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    backgroundColor: theme.colors.primary.light2,
    padding: 10,
    borderRadius: 20,
    margin: 5,
  },
  selectedTimeSlot: {
    borderColor: theme.colors.primary.dark1,
    borderWidth: 2,
    backgroundColor: theme.colors.primary.dark2,
  },
  timeText: {
    color: theme.colors.primary.dark1,
  },
  selectedTimeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bookedSlot: {
    backgroundColor: '#ccc',
  },
  bookedTimeText: {
    color: '#777',
    textDecorationLine: 'line-through',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50,
  },
  messageButton: {
    borderWidth: 2,
    borderColor: '#3B8C84',
    borderRadius: 30,
    padding: 10,
  },
  bookNowButton: {
    backgroundColor: '#3B8C84',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  bookNowText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAvailabilityText: {
    color: 'gray',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B8C84',
    marginTop: 10,
  }, badge: {
    position: 'absolute',
    top: -8,
    right: -20,
    backgroundColor: '#3B8C84',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  selectedBadge: {
    position: 'absolute',
    top: -10,
    right: -20,
    backgroundColor: theme.colors.primary.dark1,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
});
function setRefreshing(arg0: boolean): void {
  throw new Error('Function not implemented.');
}

