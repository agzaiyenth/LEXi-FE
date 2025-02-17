import React, { createContext, useContext, useState } from 'react';

type AccessibilitySettings = {
  highContrastMode: boolean;
  largeTextMode: boolean;
  darkMode: boolean;
  monochromeMode: boolean; // New option
  screenReader: boolean; // New option for text-to-speech
  fontScale: number; // For dynamic font scaling
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleDarkMode: () => void;
  toggleMonochrome: () => void; // New function
  toggleScreenReader: () => void; // New function
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
};

const AccessibilityContext = createContext<AccessibilitySettings | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [largeTextMode, setLargeTextMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [monochromeMode, setMonochromeMode] = useState(false); // New state
  const [screenReader, setScreenReader] = useState(false); // New state
  const [fontScale, setFontScale] = useState(1);

  const toggleHighContrast = () => setHighContrastMode((prev) => !prev);
  const toggleLargeText = () => setLargeTextMode((prev) => !prev);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleMonochrome = () => setMonochromeMode((prev) => !prev); // New toggle
  const toggleScreenReader = () => setScreenReader((prev) => !prev); // New toggle

  const increaseFontSize = () => setFontScale((prev) => Math.min(prev + 0.1, 2)); // Max font scale: 2
  const decreaseFontSize = () => setFontScale((prev) => Math.max(prev - 0.1, 1)); // Min font scale: 1

  return (
    <AccessibilityContext.Provider
      value={{
        highContrastMode,
        largeTextMode,
        darkMode,
        monochromeMode,
        screenReader,
        fontScale,
        toggleHighContrast,
        toggleLargeText,
        toggleDarkMode,
        toggleMonochrome,
        toggleScreenReader,
        increaseFontSize,
        decreaseFontSize,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
