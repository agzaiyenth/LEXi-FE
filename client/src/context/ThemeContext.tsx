import React, { createContext, useContext, useState, useMemo } from 'react';
import { theme as defaultTheme } from '@/src/theme';
import tinycolor from 'tinycolor2';

type ColorFilterType = 
| 'greyscale'
| 'protanopia'
| 'deuteranopia'
| 'tritanopia'
| 'tint';

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
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [highContrast, setHighContrast] = useState(false);
  const [fontType, setFontType] = useState(defaultTheme.fonts.regular);
  const [activeColorFilter, setActiveColorFilter] = useState<ColorFilterType | null>(null);
  const [colorIntensity, setColorIntensity] = useState(1);

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

    return {
      ...defaultTheme,
      colors: processColors(defaultTheme.colors),
      fonts: {
        ...defaultTheme.fonts,
        sizes: Object.fromEntries(
          Object.entries(defaultTheme.fonts.sizes).map(([key, value]) => [
            key,
            value * fontSizeMultiplier
          ])
        ),
        regular: fontType,
      },
    };
  }, [fontSizeMultiplier, highContrast, fontType, activeColorFilter, colorIntensity]);

  const resetAccessibilitySettings = () => {
    setActiveColorFilter(null);
    setColorIntensity(1);
    setFontSizeMultiplier(1);
    setHighContrast(false);
    setFontType(defaultTheme.fonts.regular);
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
        resetAccessibilitySettings
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);