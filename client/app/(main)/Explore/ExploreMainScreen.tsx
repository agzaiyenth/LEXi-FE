import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import TherapistHome from './TherapistHome'
import { useTheme } from "../../../src/context/ThemeContext";

export default function ExploreMainScreen() {
  const { theme } = useTheme();

  const styles = useMemo(() =>
    StyleSheet.create({}), [theme]
  );

  return (
    <View>
      <TherapistHome />
    </View>
  )
}
