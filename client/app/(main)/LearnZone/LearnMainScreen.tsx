// app/(main)/LearnZone/LearnMainScreen.tsx
/* 
This is the main screen for the LearnZone . 
It contains buttons that navigate to other screens in the LearnZone feature. 
*/

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LearnZoneParamList } from './index'; 
import { StackNavigationProp } from '@react-navigation/stack';

type LearnMainNavigationProp = StackNavigationProp<LearnZoneParamList, 'LearnMain'>;

const LearnMainScreen = () => {
  const navigation = useNavigation<LearnMainNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to LearnZone</Text>
      <Button
        title="Go to Vox Buddy"
        onPress={() => navigation.navigate('VoxBuddy')} 
      />
      <Button
        title="Go to Smarty read"
        onPress={() => navigation.navigate('VoxBuddy')}   // @AmandaHanz update this navigation
      />
      <Button
        title="Go to read with me"
        onPress={() => navigation.navigate('VoxBuddy')} // @asraameer update this navigation
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default LearnMainScreen;
