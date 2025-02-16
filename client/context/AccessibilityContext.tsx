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
