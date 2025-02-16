import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useAccessibility } from '../../../../context/AccessibilityContext';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import { theme } from '../../../../src/theme';

const AccessibilityScreen: React.FC = () => {
  const { 
    highContrastMode, 
    largeTextMode, 
    darkMode, 
    monochromeMode, 
    screenReader, 
    toggleHighContrast, 
    toggleLargeText, 
    toggleDarkMode, 
    toggleMonochrome, 
    toggleScreenReader 
  } = useAccessibility();


export default AccessibilityScreen;
