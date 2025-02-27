import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import theme from '@/src/theme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../src/types/common/navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

type NavigationProps = StackNavigationProp<RootStackParamList, 'Account'>;

const AccessibilityScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.navigate('Account')} style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color={theme.colors.primary.medium2} />
      </TouchableOpacity>

      <Text style={styles.header}>Accessibility Menu</Text>
      <ScrollView contentContainerStyle={styles.menuContainer}>
        <View style={styles.grid}>
          <AccessibilityButton icon="palette" label="Colours" />
          <AccessibilityButton icon="contrast" label="Contrast" />
          <AccessibilityButton icon="format-size" label="Font" />
          <AccessibilityButton icon="format-header-increase" label="Bigger Text" />
          <AccessibilityButton icon="format-line-spacing" label="Line Height" />
          <AccessibilityButton icon="format-letter-spacing" label="Text Spacing" />
          <AccessibilityButton icon="keyboard-outline" label={"Alphabetical\nKeyboard"} />
          <AccessibilityButton icon="format-align-left" label="Text Align" />
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.resetButton}>
        <Text style={styles.resetText}>RESET</Text>
      </TouchableOpacity>
    </View>
  );
};

const AccessibilityButton = ({ icon, label }: { icon: string; label: string }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Icon name={icon} size={28} color={theme.colors.primary.dark1} />
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};



export default AccessibilityScreen;
