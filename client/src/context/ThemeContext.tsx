import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { theme as defaultTheme } from '@/src/theme';
import tinycolor from 'tinycolor2';
import { useSession } from '../ctx';
import apiClient from '../apiClient';

// Define color matrices for different filters
const PROTANOPIA_MATRIX = [
  0.567, 0.433, 0, 0, 0,
  0.558, 0.442, 0, 0, 0,
  0, 0.242, 0.758, 0, 0,
  0, 0, 0, 1, 0,
];

const DEUTERANOPIA_MATRIX = [
  0.625, 0.375, 0, 0, 0,
  0.7, 0.3, 0, 0, 0,
  0, 0.142, 0.858, 0, 0,
  0, 0, 0, 1, 0,
];

const TRITANOPIA_MATRIX = [
  0.95, 0.05, 0, 0, 0,
  0, 0.433, 0.567, 0, 0,
  0, 0.475, 0.525, 0, 0,
  0, 0, 0, 1, 0,
];

type ColorFilterType = 
| 'greyscale'
| 'protanopia'
| 'deuteranopia'
| 'tritanopia'
| 'tint';

type ThemeContextType = {
  theme: typeof defaultTheme;
  updateFontSizeMultiplier: (multiplier: number) => void;
  toggleContrast: () => void;
  updateFontType: (fontType: string) => void;
  setColorFilter: (filter: ColorFilterType | null) => void;
  setColorIntensity: (intensity: number) => void;
  activeColorFilter: ColorFilterType | null;
  colorIntensity: number;
  resetAccessibilitySettings: () => void;
  saveUserPreference: (preferences: any) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  updateFontSizeMultiplier: () => {},
  toggleContrast: () => {},
  updateFontType: () => {},
  setColorFilter: () => {},
  setColorIntensity: () => {},
  activeColorFilter: null,
  colorIntensity: 1,
  resetAccessibilitySettings: () => {},
  saveUserPreference: (preferences: any) => {},
});

const applyColorMatrix = (color: string, matrix: number[], intensity: number) => {
  const rgb = tinycolor(color).toRgb();
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const newR = r * matrix[0] + g * matrix[1] + b * matrix[2] + matrix[3];
  const newG = r * matrix[5] + g * matrix[6] + b * matrix[7] + matrix[8];
  const newB = r * matrix[10] + g * matrix[11] + b * matrix[12] + matrix[13];

  return tinycolor({
    r: (newR + (r - newR) * (1 - intensity)) * 255,
    g: (newG + (g - newG) * (1 - intensity)) * 255,
    b: (newB + (b - newB) * (1 - intensity)) * 255
  }).toHexString();
};

const colorFilters = {
  greyscale: (color: string, intensity: number) => {
    const c = tinycolor(color);
    const sat = c.toHsl().s * (1 - intensity);
    return c.saturate(sat).greyscale().toString();
  },
  protanopia: (color: string, intensity: number) => 
    applyColorMatrix(color, PROTANOPIA_MATRIX, intensity),
  deuteranopia: (color: string, intensity: number) => 
    applyColorMatrix(color, DEUTERANOPIA_MATRIX, intensity),
  tritanopia: (color: string, intensity: number) => 
    applyColorMatrix(color, TRITANOPIA_MATRIX, intensity),
  tint: (color: string, intensity: number) => 
    tinycolor.mix(color, '#ff9999', intensity * 100).toString(),
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { username } = useSession();
  
  // Initialize state with valid defaults
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [highContrast, setHighContrast] = useState(false);
  const [fontType, setFontType] = useState(defaultTheme.fonts.regular || "System");
  const [activeColorFilter, setActiveColorFilter] = useState<ColorFilterType | null>(null);
  const [colorIntensity, setColorIntensity] = useState(1);

  // Load preferences on mount
  useEffect(() => {
    if (username) {
      loadUserPreference();
    }
  }, [username]);

  // Save preferences whenever any setting changes
  useEffect(() => {
    if (username) {
      const preferences = {
        userName: username,
        highContrast,
        fontScale: fontSizeMultiplier,
        colorFilterType: activeColorFilter,
        colorIntensity,
        fontType,
      };
      saveUserPreference(preferences);
    }
  }, [highContrast, fontSizeMultiplier, activeColorFilter, colorIntensity, fontType, username]);

  // Function to save user preferences
  const saveUserPreference = async (preferences: any) => {
    try {
      if (!username) return;

      await apiClient.post('/accessibility', preferences);
    } catch (error) {
      console.error('Error saving user preferences:', error);
    }
  };

  // Function to load user preferences
  const loadUserPreference = async () => {
    try {
      if (!username) return;

      const response = await apiClient.get(`/accessibility/user`);
      const preferences = response.data;

      if (preferences) {
        setHighContrast(preferences.highContrast);
        setFontSizeMultiplier(preferences.fontScale);
        setActiveColorFilter(preferences.colorFilterType);
        setColorIntensity(preferences.colorIntensity);
        setFontType(preferences.fontType);
      }

    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const applyColorModifications = (color: string) => {
    const contrastAdjusted = highContrast 
      ? tinycolor(color).darken(20).toString()
      : color;
    
    return activeColorFilter && colorFilters[activeColorFilter]
      ? colorFilters[activeColorFilter](contrastAdjusted, colorIntensity)
      : contrastAdjusted;
  };

  const modifiedTheme = useMemo(() => {
    const processColors = (colors: any): any => {
      if (typeof colors !== 'object') return colors;
      
      return Object.entries(colors).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: typeof value === 'object' 
          ? processColors(value) 
          : applyColorModifications(value as string)
      }), {});
    };

    const fontSizeMultiplier1 = Math.max(fontSizeMultiplier, 1);
    
    return {
      ...defaultTheme,
      colors: processColors(defaultTheme.colors),
      fonts: {
        ...defaultTheme.fonts,
        sizes: Object.fromEntries(
          Object.entries(defaultTheme.fonts.sizes).map(([key, value]) => [
            key,
            value * fontSizeMultiplier1
          ])
        ),
        regular: fontType,
      },
    };
  }, [fontSizeMultiplier, highContrast, fontType, activeColorFilter, colorIntensity]);

  const resetAccessibilitySettings = () => {
    setHighContrast(false);
    setFontSizeMultiplier(1);
    setActiveColorFilter(null);
    setColorIntensity(1);
    setFontType(defaultTheme.fonts.regular);

    saveUserPreference({
      userName: username,
      highContrast: false,
      fontScale: 1,
      colorFilterType: null,
      colorIntensity: 1,
      fontType: defaultTheme.fonts.regular,
    });
  };

  return (
    <ThemeContext.Provider 
      value={{
        theme: modifiedTheme,
        updateFontSizeMultiplier: setFontSizeMultiplier,
        toggleContrast: () => setHighContrast(prev => !prev),
        updateFontType: setFontType,
        setColorFilter: setActiveColorFilter,
        setColorIntensity,
        activeColorFilter,
        colorIntensity,
        resetAccessibilitySettings,
        saveUserPreference
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);