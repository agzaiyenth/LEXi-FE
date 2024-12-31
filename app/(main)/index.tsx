// app/(main)/index.tsx
import { StyleSheet, TouchableOpacity } from 'react-native';
import 'node-libs-react-native/globals';

import { Text, View } from '@/components/Themed';
import React from 'react';
import { useSession } from '../../src/ctx';
import { theme } from '../../src/theme';

export default function HomeScreen() {
  const { signOut } = useSession();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HI LExi</Text>
      <TouchableOpacity onPress={signOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.offWhite,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
