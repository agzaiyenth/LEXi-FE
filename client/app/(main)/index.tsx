import React, { Component } from 'react'
import HomeScreen from './Home'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export class Index extends Component {
  render() {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
      <HomeScreen/>
      </GestureHandlerRootView>
    )
  }
}

export default Index