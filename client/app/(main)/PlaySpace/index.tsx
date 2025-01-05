import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../AppNavigator'; 

interface Game {
  id: string;
  title: string;
  theory: string;
  image: any;
}

const PlayScreen: React.FC = () => {
  const navigation =  useNavigation<NavigationProp<RootStackParamList>>();

  const games: Game[] = [
    {
      id: '1',
      title: 'Pop The Balloon',
      theory: 'Phonological Deficit',
      image: require('@/assets/images/games/ballon.png'),
    },
    {
      id: '2',
      title: 'Game Name',
      theory: 'Therapy Theory',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      title: 'Game Name',
      theory: 'Therapy Theory',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '4',
      title: 'Game Name',
      theory: 'Therapy Theory',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '5',
      title: 'Game Name',
      theory: 'Therapy Theory',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '6',
      title: 'Game Name',
      theory: 'Therapy Theory',
      image: 'https://via.placeholder.com/150',
    },
  ];

  const renderGameCard = ({ item }: { item: Game }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        if (item.id === '1') {
          navigation.navigate('PopTheBalloonGame');
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
    backgroundColor: '#CCE5E1', 
    paddingTop: 20,
    minHeight: '100%', 
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#003D35',
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 10,
    margin: 10,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    height: 200, 
    width: 150, 
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: 120,
    height: 125,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#003D35',
    marginTop: 8,
  },
  cardTheory: {
    fontSize: 12,
    color: '#6C8A81',
  },
});

export default PlayScreen;
