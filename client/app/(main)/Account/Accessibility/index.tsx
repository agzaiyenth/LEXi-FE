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

  const navigation = useNavigation();

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

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color={darkMode ? "#fff" : "#333"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, highContrastMode && styles.highContrastBackground, largeTextMode && styles.largeText, darkMode && styles.darkText, monochromeMode && styles.monochromeContainer]}>Accessibility</Text>
      </View>

      <View style={styles.optionRow}>
        <Text style={[styles.label, { fontSize: 16 * fontScale }, largeTextMode && styles.largeText, darkMode && styles.darkText, highContrastMode && styles.highContrastBackground, monochromeMode && styles.monochromeContainer]}>
          High Contrast
        </Text>
        <Switch
          value={highContrastMode}
          onValueChange={() => {
            toggleHighContrast();
            speakText(highContrastMode ? 'High Contrast Mode disabled' : 'High Contrast Mode enabled');
          }}
        />
      </View>

      <View style={styles.optionRow}>
        <Text style={[styles.label, { fontSize: 16 * fontScale }, largeTextMode && styles.largeText, darkMode && styles.darkText, highContrastMode && styles.highContrastBackground, monochromeMode && styles.monochromeContainer]}>
          Dark Mode
        </Text>
        <Switch
          value={darkMode}
          onValueChange={() => {
            toggleDarkMode();
            speakText(darkMode ? 'Dark Mode disabled' : 'Dark Mode enabled');
          }}
        />
      </View>

      <View style={styles.optionRow}>
        <Text style={[styles.label, { fontSize: 16 * fontScale }, largeTextMode && styles.largeText, darkMode && styles.darkText, highContrastMode && styles.highContrastBackground, monochromeMode && styles.monochromeContainer]}>
          Monochrome Mode
        </Text>
        <Switch
          value={monochromeMode}
          onValueChange={() => {
            toggleMonochrome();
            speakText(monochromeMode ? 'Monochrome Mode disabled' : 'Monochrome Mode enabled');
          }}
        />
      </View>

      <View style={styles.optionRow}>
        <Text style={[styles.label, { fontSize: 16 * fontScale }, largeTextMode && styles.largeText, darkMode && styles.darkText, highContrastMode && styles.highContrastBackground, monochromeMode && styles.monochromeContainer]}>
          Screen Reader
        </Text>
        <Switch
          value={screenReader}
          onValueChange={() => {
            toggleScreenReader();
            speakText1(screenReader ? 'Screen Reader disabled' : 'Screen Reader enabled');
          }}
        />
      </View>

      <View style={styles.optionRow}>
        <Text style={[styles.label, { fontSize: 16 * fontScale }, largeTextMode && styles.largeText, darkMode && styles.darkText, highContrastMode && styles.highContrastBackground, monochromeMode && styles.monochromeContainer]}>
          Large Text
        </Text>
        <Switch
          value={largeTextMode}
          onValueChange={() => {
            toggleLargeText();
            speakText(largeTextMode ? 'Large Text Mode disabled' : 'Large Text Mode enabled');
          }}
        />
      </View>

      {/* Font Size Adjustment Section */}
      <View style={styles.fontSizeContainer}>
        <Text style={[styles.fontSizeLabel, { fontSize: 16 * fontScale }, darkMode && styles.darkText, highContrastMode && styles.highContrastBackground, monochromeMode && styles.monochromeContainer, largeTextMode && styles.largeText]}>
          Adjust Text Size:
        </Text>
        <View style={styles.fontSizeButtons}>
          <TouchableOpacity onPress={decreaseFontSize} style={[styles.fontSizeButton, { marginRight: 10 }, highContrastMode && styles.highContrastBackground, monochromeMode && styles.monochromeContainer]}>
            <Text style={styles.fontSizeText}>A-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={increaseFontSize} style={[styles.fontSizeButton, highContrastMode && styles.highContrastBackground, monochromeMode && styles.monochromeContainer]}>
            <Text style={styles.fontSizeText}>A+</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#222',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  largeText: {
    fontSize: 20,
  },
  highContrastBackground: {
    backgroundColor: 'yellow', // Adjust this if necessary
  },
  monochromeContainer: {
    backgroundColor: 'gray', // This will give the background a monochrome (gray) look
  },
  fontSizeContainer: {
    marginTop: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  fontSizeLabel: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  fontSizeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fontSizeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
  },
  fontSizeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AccessibilityScreen;
