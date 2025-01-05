import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import theme from '../../../src/theme';

interface Game {
  id: string;
  title: string;
  theory: string;
  image: any;
}

const PlayScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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

export default PlayScreen;
