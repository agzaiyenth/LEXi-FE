import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native'
import theme from '../theme'

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150' }}
        style={styles.image}
      />
      <ActivityIndicator size="large" color={theme.colors.primary.dark2} style={styles.indicator} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.offWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  indicator: {
    marginBottom: 10,
  },
  loadingText: {
    fontSize: theme.fonts.sizes.s18,
    color: '#333',
  },
})

export default LoadingScreen