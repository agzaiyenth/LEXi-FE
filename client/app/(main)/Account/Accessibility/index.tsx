import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import theme from '@/src/theme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/types/common/navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

type NavigationProps = StackNavigationProp<RootStackParamList, 'Account'>;

const AccessibilityScreen = () => {
  const navigation = useNavigation<NavigationProps>();

    // State for managing pop-up visibility
    const [isColoursVisible, setColoursVisible] = useState(false);
    const [isContrastVisible, setContrastVisible] = useState(false);
    const [isFontVisible, setFontVisible] = useState(false);
    const [isBiggerTextVisible, setBiggerTextVisible] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary.light3 }]}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.navigate('Account')} style={styles.backButton}>
        <AntDesign name="arrowleft" size={theme.fonts.sizes.s20} color={theme.colors.primary.medium2} />
      </TouchableOpacity>

      <Text style={[styles.header, { color: theme.colors.background.offWhite }, {fontSize: theme.fonts.sizes.s20}]}>
        Accessibility Menu
      </Text>
      <ScrollView contentContainerStyle={styles.menuContainer}>
        <View style={styles.grid}>
        <AccessibilityButton icon="palette" label="Colours" onPress={() => setColoursVisible(true)} />
          <AccessibilityButton icon="contrast" label="Contrast" onPress={() => setContrastVisible(true)} />
          <AccessibilityButton icon="format-size" label="Font" onPress={() => setFontVisible(true)} />
          <AccessibilityButton icon="format-header-increase" label="Bigger Text" onPress={() => setBiggerTextVisible(true)} />
          <AccessibilityButton icon="format-line-spacing" label="Line Height" />
          <AccessibilityButton icon="format-letter-spacing" label="Text Spacing" />
          <AccessibilityButton icon="keyboard-outline" label={"Alphabetical\nKeyboard"} />
          <AccessibilityButton icon="format-align-left" label="Text Align" />
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.resetButton} >
        <Text style={styles.resetText}>RESET</Text>
      </TouchableOpacity>

      <AccessibilityModal visible={isColoursVisible} onClose={() => setColoursVisible(false)} title="Colours" />
      <AccessibilityModal visible={isContrastVisible} onClose={() => setContrastVisible(false)} title="Contrast" />
      <AccessibilityModal visible={isFontVisible} onClose={() => setFontVisible(false)} title="Font" />
      <AccessibilityModal visible={isBiggerTextVisible} onClose={() => setBiggerTextVisible(false)} title="Bigger Text" />
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
      <Text style={[styles.buttonText, {fontSize: theme.fonts.sizes.s14},
      ]}>{label}</Text>
    </TouchableOpacity>
  );
};

// Accessibility Modal Component
const AccessibilityModal = ({ visible, onClose, title }: { visible: boolean; onClose: () => void; title: string }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalContent}>Adjust settings related to {title.toLowerCase()}.</Text>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
    // Modal Styles
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: '80%',
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 12,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalContent: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    },
    closeButton: {
      backgroundColor: theme.colors.primary.medium,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    closeButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
});

export default AccessibilityScreen;
