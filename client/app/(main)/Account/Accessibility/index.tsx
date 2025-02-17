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
