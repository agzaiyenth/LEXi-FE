// ThemeContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { theme as defaultTheme, getCurrentTheme } from '@/src/theme'; // assuming theme is exported from this path

// Create a context for the theme
const ThemeContext = createContext<any>(defaultTheme);

// Custom hook to use the theme
export const useTheme = () => {
  return useContext(ThemeContext);
};

// Theme provider to wrap the app and provide the theme
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize the theme state
  const [highContrast, setHighContrast] = useState(defaultTheme.accessibility.highContrast);
  const [fontScale, setFontScale] = useState(1); // Default scale is 1
  const [colorFilter, setColorFilter] = useState(defaultTheme.accessibility.colorFilter); // Manage color filter state
  const [fontType, setFontType] = useState<string>(defaultTheme.accessibility.fontType);

  // Function to toggle contrast
  const toggleContrast = () => {
    setHighContrast((prev) => !prev);
  };

  const increaseFontSize = () => {
    setFontScale((prevScale) => (prevScale < 2 ? prevScale + 0.2 : prevScale)); // Limit to 2x scale
  };

  const toggleColorFilter = () => { // Function to toggle color filter
    setColorFilter((prev1) => !prev1);
  };

  const toggleFontType = (newFontType: string) => {
    setFontType(newFontType); // Update the font type
  };

  // Reset to default theme settings
  const resetToDefault = () => {
    setHighContrast(false);
    setFontScale(1);
    setColorFilter(false);
    setFontType("System");
  };

  // Dynamically update the theme based on the highContrast state
  const updatedTheme = getCurrentTheme(highContrast, fontScale, colorFilter, fontType);

  return (
    <ThemeContext.Provider value={{ theme: updatedTheme, toggleContrast, increaseFontSize, toggleColorFilter, toggleFontType, resetToDefault }}>
      {children}
    </ThemeContext.Provider>
  );
};
