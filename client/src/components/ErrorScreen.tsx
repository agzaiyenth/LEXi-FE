import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const ErrorScreen = () => {
  const navigation = useNavigation();
  
  return (
    <View>
      <Text>ErrorScreen</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  )
}

export default ErrorScreen