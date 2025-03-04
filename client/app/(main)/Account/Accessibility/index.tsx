import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import theme from '@/src/theme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/types/common/navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from '@/src/context/ThemeContext'; // Import the useTheme hook

type NavigationProps = StackNavigationProp<RootStackParamList, 'Account'>;

const AccessibilityScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const { theme, 
    toggleContrast, 
    increaseFontSize, 
    toggleColorFilter, 
    toggleFontType,
    increaseLineHeight, 
    increaseTextSpacing,
    toggleAlphabeticalKeyboard, 
    toggleTextAlign,
    resetToDefault } = useTheme(); // Get the current theme and toggle function

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary.light3 }]}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.navigate('Account')} style={styles.backButton}>
        <AntDesign name="arrowleft" size={theme.fonts.sizes.s20 * theme.accessibility.fontScale} color={theme.colors.primary.medium2} />
      </TouchableOpacity>

      <Text style={[styles.header, { color: theme.colors.background.offWhite }, 
      {fontSize: theme.fonts.sizes.s22 * theme.accessibility.fontScale },
        { letterSpacing: theme.accessibility.letterSpacing }
        ]}>
        Accessibility Menu
      </Text>
      <ScrollView contentContainerStyle={styles.menuContainer}>
        <View style={styles.grid}>
          <AccessibilityButton icon="palette" label="Colours" onPress={toggleColorFilter} />
          <AccessibilityButton icon="contrast" label="Contrast" onPress={toggleContrast} />
          <AccessibilityButton icon="format-size" label="Font" onPress={() => toggleFontType(theme.accessibility.fontType === "System" ? "OpenDyslexic" : "System")} />
          <AccessibilityButton icon="format-header-increase" label="Bigger Text" onPress={increaseFontSize}/>
          <AccessibilityButton icon="format-line-spacing" label="Line Height" onPress={increaseLineHeight} />
          <AccessibilityButton icon="format-letter-spacing" label="Text Spacing" onPress={increaseTextSpacing} />
          <AccessibilityButton icon="keyboard-outline" label={"Alphabetical\nKeyboard"} onPress={toggleAlphabeticalKeyboard} />
          <AccessibilityButton icon="format-align-left" label="Text Align" onPress={toggleTextAlign} />
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.resetButton} onPress={resetToDefault}>
        <Text style={[styles.resetText, 
          { fontSize: theme.fonts.sizes.s16 * theme.accessibility.fontScale },
          { letterSpacing: theme.accessibility.letterSpacing }]}>RESET</Text>
      </TouchableOpacity>
    </View>
  );
};

const AccessibilityButton = ({
  icon,
  label,
  onPress,
}: {
  icon: string;
  label: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name={icon} size={28} color={theme.colors.primary.dark1} />
      <Text style={[styles.buttonText, 
      { fontSize: theme.fonts.sizes.s14 * theme.accessibility.fontScale },
      { lineHeight: theme.fonts.sizes.s14 * theme.accessibility.lineHeight },
      { letterSpacing: theme.accessibility.letterSpacing }
      ]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary.light3,
    padding: 16,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 22,
    backgroundColor: theme.colors.primary.light2,
    padding: 8,
    borderRadius: 20,
  },
  header: {
    fontWeight: 'bold',
    color: theme.colors.background.offWhite,
    marginBottom: 70,
    marginTop: 20,
  },
  menuContainer: {
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    width: 150,
    height: 80,
    backgroundColor: theme.colors.background.beige,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    marginTop: 8,
    fontWeight: '500',
    color: theme.colors.primary.dark1,
    textAlign: 'center', // Center text for multiline labels
  },
  resetButton: {
    backgroundColor: theme.colors.primary.medium,
    width: '70%',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  resetText: {
    color: '#fff',
    fontWeight: '500',
  },
});

export default AccessibilityScreen;
