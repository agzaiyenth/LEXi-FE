
// app/(main)/LearnZone/PlayMainScreen.tsx
/* 
This is the main screen for the LearnZone . 
It contains buttons that navigate to other screens in the LearnZone feature. 
*/

import theme from '@/src/theme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LearnZoneParamList } from './index';
import Ionicons from '@expo/vector-icons/Ionicons';

type LearnMainNavigationProp = StackNavigationProp<LearnZoneParamList, 'PlayMainScreen'>;
interface Game {
  id: string;
  title: string;
  theory: string;
  image: any;
  route: string;
}

const PlayMainScreen = () => {
  const navigation = useNavigation<LearnMainNavigationProp>();
  const games: Game[] = [
    {
      id: '1',
      title: 'Pop The Balloon',
      theory: 'Phonological Deficit',
      image: require('@/assets/images/games/ballon.png'),
      route: 'BalloonGame'
    },
    {
      id: '2',
      title: 'Coming Soon',
      theory: 'Therapy Theory',
      image: 'https://via.placeholder.com/150',
      route: 'pop'
    },
    {
      id: '3',
      title: 'Coming Soon',
      theory: 'Therapy Theory',
      image: 'https://via.placeholder.com/150',
      route: 'pop'
    },
    {
      id: '4',
      title: 'Coming Soon',
      theory: 'Therapy Theory',
      image: 'https://via.placeholder.com/150',
      route: 'pop'
    },
    {
      id: '5',
      title: 'Coming Soon',
      theory: 'Therapy Theory',
      image: 'https://via.placeholder.com/150',
      route: 'pop'
    },
    {
      id: '6',
      title: 'Coming Soon',
      theory: 'Therapy Theory',
      image: 'https://via.placeholder.com/150',
      route: 'pop'
    },
  ];
  const renderGameCard = ({ item }: { item: Game }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        try {
          if (item.route) {
            navigation.navigate(item.route as keyof LearnZoneParamList);
          } else {
            console.warn('No route defined for this game');
          }
        } catch (error) {
          console.error('Navigation Error:', error);
        }
      }}
    >
      <Image
        source={typeof item.image === 'string' ? { uri: item.image } : item.image}
        style={styles.cardImage}
      />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardTheory}>{item.theory}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>PlaySpace</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back-circle-outline" size={40} color="white" />
        </TouchableOpacity>
      <FlatList
        data={games}
        renderItem={renderGameCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary.light,
    paddingTop: theme.spacing.large,
    minHeight: '100%',
  },
  header: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing.medium,
    color: theme.colors.primary.dark1,
  },
  backButton:{
    marginTop:-65,
    padding:12,
  },
  flatListContainer: {
    paddingHorizontal: theme.spacing.medium,
  },
  card: {
    backgroundColor: theme.colors.primary.light2,
    borderRadius: theme.spacing.small,
    padding: theme.spacing.medium,
    margin: theme.spacing.small,
    flex: 1,
    alignItems: 'center',
    shadowColor: theme.colors.blacks.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    height: 200,
    width: 150,
    shadowRadius: theme.spacing.small / 2,
    elevation: 2,
  },
  cardImage: {
    width: 120,
    height: 125,
    borderRadius: theme.spacing.small,
  },
  cardTitle: {
    fontSize: theme.fonts.sizes.small,
    fontWeight: 'bold',
    color: theme.colors.primary.dark1,
    marginTop: theme.spacing.small,
  },
  cardTheory: {
    fontSize: 12,
    color: theme.colors.primary.medium,
  },
});

export default PlayMainScreen;
