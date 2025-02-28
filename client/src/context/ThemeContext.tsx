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

  // Function to toggle contrast
  const toggleContrast = () => {
    setHighContrast((prev) => !prev);
  };

  // Dynamically update the theme based on the highContrast state
  const updatedTheme = getCurrentTheme(highContrast);

  return (
    <ThemeContext.Provider value={{ theme: updatedTheme, toggleContrast }}>
      {children}
    </ThemeContext.Provider>
  );
};
