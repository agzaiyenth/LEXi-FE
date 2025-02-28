import React, { createContext, useContext, useState, useEffect } from 'react';
import { theme as defaultTheme, getCurrentTheme } from '@/src/theme';
import { useSession } from '../ctx';
import apiClient from '../apiClient';

// Creating the theme context with default theme
const ThemeContext = createContext({
  theme: defaultTheme,
  toggleContrast: () => {},
  increaseFontSize: () => {},
  toggleColorFilter: () => {},
  toggleFontType: (newFontType: string) => {},
  resetToDefault: () => {},
  saveUserPreference: (preferences: any) => {},
});

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { username } = useSession();
  const [highContrast, setHighContrast] = useState(false);
  const [fontScale, setFontScale] = useState(1); // Default font scale
  const [colorFilter, setColorFilter] = useState(false); // Default color filter state
  const [fontType, setFontType] = useState("System"); // Default font type
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    loadUserPreference(); // Load user preferences when the component mounts
  }, []);

  // Function to save user preferences
  const saveUserPreference = async (preferences: any) => {
    try {
      if (!username) return;

      // Create a new object to avoid cyclical references
      const validPreferences = {
        userName: username,
        highContrast: preferences.highContrast ?? highContrast,
        fontScale: preferences.fontScale ?? fontScale,
        colorFilter: preferences.colorFilter ?? colorFilter,
        fontType: preferences.fontType ?? fontType,
      };

      await apiClient.post('/api/user/theme', validPreferences);
    } catch (error) {
      console.error('Error saving user preferences:', error);
    }
  };

  // Function to load user preferences from the API
  const loadUserPreference = async () => {
    try {
      if (!username) return;

      const response = await apiClient.get(`/api/user/theme/${username}`);
      const preferences = response.data;

      if (preferences) {
        setHighContrast(preferences.highContrast);
        setFontScale(preferences.fontScale);
        setColorFilter(preferences.colorFilter);
        setFontType(preferences.fontType);
      }
    } catch (error) {
      console.error('Error loading user preferences:', error);
    }
  };

  // Function to toggle contrast mode
  const toggleContrast = () => {
    setHighContrast((prev) => {
      const newValue = !prev;
      saveUserPreference({ highContrast: newValue });
      return newValue;
    });
  };

  // Function to increase font size
  const increaseFontSize = () => {
    setFontScale((prevScale) => {
      const newScale = prevScale < 2 ? prevScale + 0.2 : prevScale;
      saveUserPreference({ fontScale: newScale });
      return newScale;
    });
  };

  // Function to toggle color filter
  const toggleColorFilter = () => {
    setColorFilter((prev) => {
      const newValue = !prev;
      saveUserPreference({ colorFilter: newValue });
      return newValue;
    });
  };

  // Function to change font type
  const toggleFontType = (newFontType: string) => {
    setFontType(newFontType);
    saveUserPreference({ fontType: newFontType });
  };

  // Function to reset to default theme settings
  const resetToDefault = () => {
    setHighContrast(false);
    setFontScale(1);
    setColorFilter(false);
    setFontType("System");
    saveUserPreference({
      highContrast: false,
      fontScale: 1,
      colorFilter: false,
      fontType: "System",
    });
  };

  // Dynamically update the theme based on preferences
  const updatedTheme = getCurrentTheme(highContrast, fontScale, colorFilter, fontType);

  return (
    <ThemeContext.Provider value={{ theme: updatedTheme, toggleContrast, increaseFontSize, toggleColorFilter, toggleFontType, resetToDefault, saveUserPreference }}>
      {children}
    </ThemeContext.Provider>
  );
};
