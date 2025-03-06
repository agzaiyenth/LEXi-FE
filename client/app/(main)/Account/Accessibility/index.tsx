import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, FlatList } from 'react-native';
import theme from '@/src/theme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/types/common/navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Slider from '@react-native-community/slider';
import { useTheme } from '@/src/context/ThemeContext';

type NavigationProps = StackNavigationProp<RootStackParamList, 'Account'>;

const AccessibilityScreen = () => {
  const navigation = useNavigation<NavigationProps>();

    // State for managing pop-up visibility
    const [isColoursVisible, setColoursVisible] = useState(false);
    const [isFontTypeVisible, setFontTypeVisible] = useState(false);
    const [isBiggerTextVisible, setBiggerTextVisible] = useState(false);

    const { theme, updateFontSizeMultiplier, 
      toggleContrast, updateFontType, activeColorFilter, 
      setColorFilter, setColorIntensity, colorIntensity, resetAccessibilitySettings   } = useTheme();

    const fontTypes = theme.accessibility.availableFonts; // Get available fonts from the theme

    const FILTER_OPTIONS: { id: ColorFilterType; label: string }[] = [
      { id: 'greyscale', label: 'Greyscale' },
      { id: 'protanopia', label: 'Red/Green Filter (Protanopia)' },
      { id: 'deuteranopia', label: 'Green/Red Filter (Deuteranopia)' },
      { id: 'tritanopia', label: 'Blue/Yellow Filter (Tritanopia)' },
      { id: 'tint', label: 'Color Tint' },
    ];

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
          <AccessibilityButton icon="contrast" label="Contrast" onPress={toggleContrast} />
          <AccessibilityButton icon="format-size" label="Font" onPress={() => setFontTypeVisible(true)} />
          <AccessibilityButton icon="format-header-increase" label="Bigger Text" onPress={() => setBiggerTextVisible(true)} />
          <AccessibilityButton icon="format-line-spacing" label="Line Height" />
          <AccessibilityButton icon="format-letter-spacing" label="Text Spacing" />
          <AccessibilityButton icon="keyboard-outline" label={"Alphabetical\nKeyboard"} />
          <AccessibilityButton icon="format-align-left" label="Text Align" />
        </View>
      </ScrollView>
      <TouchableOpacity 
        style={[styles.resetButton, { backgroundColor: theme.colors.primary.medium }]} 
        onPress={resetAccessibilitySettings}  // Directly use destructured function
      >
        <Text style={[styles.resetText, { color: theme.colors.background.offWhite }, {fontSize: theme.fonts.sizes.s16}]}>RESET</Text>
      </TouchableOpacity>

      <AccessibilityModal 
        visible={isBiggerTextVisible} 
        onClose={() => setBiggerTextVisible(false)} 
        title="Bigger Text" 
        updateFontSizeMultiplier={updateFontSizeMultiplier} 
      />

      {/* Font Type Modal */}
      <Modal visible={isFontTypeVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={[styles.modalTitle, { color: theme.colors.blacks.medium }, {fontSize: theme.fonts.sizes.s20}]}>Select Font Type</Text>
            <FlatList
              data={fontTypes}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.fontOption}
                  onPress={() => {
                    updateFontType(item); // Update font type
                    setFontTypeVisible(false); // Close modal
                  }}
                >
                  <Text style={{ fontFamily: item, fontSize: 18 }}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setFontTypeVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={isColoursVisible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Color Filters</Text>
          
          {FILTER_OPTIONS.map((option) => (
            <View key={option.id} style={styles.filterContainer}>
              <TouchableOpacity
                onPress={() => setColorFilter(option.id === activeColorFilter ? null : option.id)}
                style={[
                  styles.filterButton,
                  activeColorFilter === option.id && styles.selectedFilter
                ]}
              >
                <Text style={styles.filterLabel}>{option.label}</Text>
                {activeColorFilter === option.id && (
                  <Icon name="check" size={20} color="#4CAF50" />
                )}
              </TouchableOpacity>
              
              {activeColorFilter === option.id && option.id !== 'greyscale' && (
                <View style={styles.sliderContainer}>
                  <Text style={styles.intensityText}>
                    Intensity: {(colorIntensity * 100).toFixed(0)}%
                  </Text>
                  <Slider
                    style={styles.slider}
                    value={colorIntensity}
                    onValueChange={setColorIntensity}
                    minimumValue={0}
                    maximumValue={1}
                    step={0.1}
                    minimumTrackTintColor="#2A9D8F"
                    maximumTrackTintColor="#D3E0DE"
                    thumbTintColor="#2A9D8F"
                  />
                </View>
              )}
            </View>
          ))}

          <TouchableOpacity 
            onPress={() => setColoursVisible(false)} 
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

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
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name={icon} size={28} color={theme.colors.primary.dark1} />
      <Text style={[styles.buttonText, {fontSize: theme.fonts.sizes.s14},
      ]}>{label}</Text>
    </TouchableOpacity>
  );
};

// Modify AccessibilityModal to include a slider
const AccessibilityModal = ({ visible, onClose, title, updateFontSizeMultiplier }: { visible: boolean; onClose: () => void; title: string; updateFontSizeMultiplier: (size: number) => void }) => {
  const [sliderValue, setSliderValue] = useState(1);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          {/* <Text style={styles.modalContent}>Adjust settings related to {title.toLowerCase()}.</Text> */}

          {title === "Bigger Text" && (
            <>
              <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={1}
                maximumValue={2}
                step={0.1}
                value={sliderValue}
                onValueChange={(value) => setSliderValue(value)}
                onSlidingComplete={(value) => updateFontSizeMultiplier(value)}
              />
              <Text>Font Size Multiplier: {sliderValue.toFixed(1)}</Text>
            </>
          )}

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
    width: '60%',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  resetText: {
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
      backgroundColor: theme.colors.background.offWhite,
      padding: 20,
      borderRadius: 12,
      alignItems: 'center',
    },
    modalTitle: {
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
      width: '35%',
      paddingVertical: 6,
      borderRadius: 30,
      alignItems: 'center',
      marginTop: 40,
      marginBottom: 5,
    },
    closeButtonText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '500',
    },
    fontOption: {
      padding: 10,
      marginVertical: 5,
      borderBottomWidth: 1,
      borderColor: theme.colors.primary.light2,
    },
    filterContainer: {
      width: '100%',
      marginVertical: 8,
    },
    filterButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderRadius: 8,
      backgroundColor: '#F8F9FA',
    },
    selectedFilter: {
      backgroundColor: '#E9F5F4',
      borderWidth: 2,
      borderColor: '#2A9D8F',
    },
    filterLabel: {
      fontSize: 16,
      color: '#264653',
    },
    sliderContainer: {
      width: '100%',
      paddingHorizontal: 16,
      marginTop: 8,
    },
    slider: {
      width: '100%',
      height: 40,
    },
    intensityText: {
      fontSize: 14,
      color: '#6C757D',
      marginBottom: 8,
    },
});

export default AccessibilityScreen;
