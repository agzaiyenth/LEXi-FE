import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LearnZoneParamList } from './index'; // Import the param list
import { StackNavigationProp } from '@react-navigation/stack';

type LearnMainNavigationProp = StackNavigationProp<LearnZoneParamList, 'LearnMain'>;

const LearnMainScreen = () => {
  const navigation = useNavigation<LearnMainNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to LearnZone</Text>
      <Button
        title="Go to Vox Buddy"
        onPress={() => navigation.navigate('VoxBuddy')} // Type-safe navigation
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default LearnMainScreen;
