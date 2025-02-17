import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useAccessibility } from '../../../../src/context/AccessibilityContext';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import { theme } from '../../../../src/theme';
import { RootStackParamList } from '../../../../src/types/common/navigation'; // import your types here
import { StackNavigationProp } from '@react-navigation/stack';

type NavigationProps = StackNavigationProp<RootStackParamList, 'Account'>;

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

  // const navigation = useNavigation();
  const navigation = useNavigation<NavigationProps>();

  const [fontScale, setFontScale] = useState(1);  // Default scale factor is 1 (normal size)

  const textStyle = {
    fontSize: 16 * fontScale, // Dynamically scale font size
    color: highContrastMode ? 'yellow' : 'black',
  };

  const speakText = (text: string) => {
    if (screenReader) {
        Speech.speak(text);  // Speak only when the screen reader is enabled
    }
};

const speakText1 = (text: string) => {
  // if (screenReader) {
    Speech.speak(text);  // Speak only when the screen reader is enabled
  // }
};

const increaseFontSize = () => {
  setFontScale((prevScale) => Math.min(prevScale + 0.1, 2)); // Max font size limit at 2x
  speakText('Font size increased');
};

const decreaseFontSize = () => {
  setFontScale((prevScale) => Math.max(prevScale - 0.1, 1)); // Min font size limit at original size
  speakText('Font size decreased');
};
