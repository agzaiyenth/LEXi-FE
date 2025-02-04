import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ITherapist } from '@/types/therapist/therapist';
import { useNavigation } from 'expo-router';
import { StackNavigationProp } from '@react-navigation/stack';
import theme from '@/src/theme';

const therapist: ITherapist = {
  id: '1',
  name: 'Prof. Dr. Logan Mason',
  description: 'Dentist',
  image: 'https://xsgames.co/randomusers/avatar.php?g=male',
  location: 'Dental Clinic, City Center',
  contact: '+1234567890',
  availability: [],
};

const BookTherapist = () => {
    const navigation = useNavigation<StackNavigationProp<any, 'AllDoctorsPage'>>();

  const [selectedPeriod, setSelectedPeriod] = useState('Morning');
  const [selectedTime, setSelectedTime] = useState('8:30 AM');
  const [selectedDay, setSelectedDay] = useState('TUE');

  const timePeriods = ['Morning', 'Afternoon', 'Evening', 'Night'];
  const timeSlots = ['8:00 AM', '8:30 AM', '8:45 AM', '9:00 AM', '9:30 AM', '10:00 AM','11:00 AM'];
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU'];

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/learnZone/circle.png')}
        style={styles.headercircle}
      />
      <View style={styles.headerContent}>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#1F2937" />
      </TouchableOpacity>
      </View>
      <View style={styles.mainContentCard}>

      <View style={styles.profileContainer}>
        <Image source={{ uri: therapist.image }} style={styles.therapistImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{therapist.name}</Text>
          <Text style={styles.specialty}>{therapist.description}</Text>
          <Text style={styles.price}>$20/hr</Text>
        </View>
      </View>

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
      <View style={styles.tabsContainer}>
        <Text style={[styles.tab, styles.activeTab]}>Schedules</Text>
        <Text style={styles.tab}>About</Text>
        <Text style={styles.tab}>Experiences</Text>
        <Text style={styles.tab}>Reviews</Text>
      </View>

      <ScrollView style={styles.scheduleContainer}>
        <View style={styles.dateContainer}>
          {days.map((day, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedDay(day)} style={[styles.day, selectedDay === day && styles.selectedDay]}>
              <Text style={[styles.dayText, selectedDay === day && styles.selectedDayText]}>{day}</Text>
              <Text style={[styles.dateText, selectedDay === day && styles.selectedDayText]}>{25 + index}</Text>
            </TouchableOpacity>
          ))}
        </View>
      
      <View style={styles.timeContainer}>
        <Text style={styles.timeTitle}>Time</Text>

        <View style={styles.periodContainer}>
          {timePeriods.map((period) => (
            <TouchableOpacity
              key={period}
              style={[styles.periodButton, selectedPeriod === period && styles.selectedPeriod]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[styles.periodText, selectedPeriod === period && styles.selectedPeriodText]}>{period}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.timeSlotsContainer}>
          {timeSlots.map((time) => (
            <TouchableOpacity
              key={time}
              style={[styles.timeSlot, selectedTime === time && styles.selectedTimeSlot]}
              onPress={() => setSelectedTime(time)}
            >
              <Text style={[styles.timeText, selectedTime === time && styles.selectedTimeText]}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      </ScrollView>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.messageButton}>
          <Ionicons name="chatbubble-outline" size={24} color="#3B8C84" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookNowButton}>
          <Text style={styles.bookNowText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height:180,
    padding: 15,
    borderRadius: 10,
  },
  therapistImage: {
    width: 120,
    height: 150,
    borderRadius: 10,
    marginRight: 15,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    marginTop:20,
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
  infoContainer: {
    flex: 1,
  },
  mainContentCard: {
    backgroundColor: '#FFF9EB',
    borderRadius: 30,
    padding: 10,
    margin: 0,
    height: '100%',
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
  },
  selectedDay: {
    backgroundColor:theme.colors.primary.medium2,
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
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    maxWidth:170,
  },
  specialty: {
    color: '#6B7280',
    marginTop: 4,
  },
  price: {
    color: theme.colors.primary.medium,
    marginTop: 6,
    fontWeight: 'bold',
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
  timeContainer: {
    marginTop: 20,
  },
  timeTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: '#1F2937',
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
  selectedPeriodText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  timeSlot: {
    backgroundColor: theme.colors.primary.medium2,
    padding: 10,
    borderRadius: 20,
    margin: 5,
  },
  selectedTimeSlot: {
    borderColor: '#3B8C84',
    borderWidth: 2,
    backgroundColor: theme.colors.primary.medium2,
  },
  timeText: {
    color: theme.colors.primary.medium,
  },
  selectedTimeText: {
    color: '#3B8C84',
    fontWeight: 'bold',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:50,
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
});
