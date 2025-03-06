import React, { createContext, useContext, useState, useMemo } from 'react';
import { theme as defaultTheme } from '@/src/theme';
import tinycolor from 'tinycolor2';

const ThemeContext = createContext({
  theme: defaultTheme,
  updateFontSizeMultiplier: (multiplier: number) => {},
  toggleContrast: () => {},
  updateFontType: (fontType: string) => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [highContrast, setHighContrast] = useState(false);
  const [fontType, setFontType] = useState(defaultTheme.fonts.regular);

  const adjustContrast = (color: string, amount: number) => {
    return tinycolor(color).darken(amount).toString();
  };

  const modifiedTheme = useMemo(() => {
    const contrastAmount = highContrast ? 20 : 0;

    return {
      ...defaultTheme,
      colors: {
        primary: {
          dark1: adjustContrast(defaultTheme.colors.primary.dark1, contrastAmount),
          dark2: adjustContrast(defaultTheme.colors.primary.dark2, contrastAmount),
          dark3: adjustContrast(defaultTheme.colors.primary.dark3, contrastAmount),
          medium: adjustContrast(defaultTheme.colors.primary.medium, contrastAmount),
          medium2: adjustContrast(defaultTheme.colors.primary.medium2, contrastAmount),
          light: adjustContrast(defaultTheme.colors.primary.light, contrastAmount),
          light2: adjustContrast(defaultTheme.colors.primary.light2, contrastAmount),
          light3: adjustContrast(defaultTheme.colors.primary.light3, contrastAmount),
        },
        background: {
          offWhite: highContrast ? "#FFFFFF" : defaultTheme.colors.background.offWhite,
          beige: highContrast ? "#F5F5DC" : defaultTheme.colors.background.beige,
        },
        text: {
          // primary: highContrast ? "#000000" : defaultTheme.colors.text.primary,
        },
      },
      fonts: {
        ...defaultTheme.fonts,
        sizes: Object.fromEntries(
          Object.entries(defaultTheme.fonts.sizes).map(([key, value]) => [
            key,
            value * fontSizeMultiplier,
          ])
        ),
        regular: fontType, // Update the font type
      },
    };
  }, [fontSizeMultiplier, highContrast, fontType]);

  const updateFontType = (fontType: string) => {
    setFontType(fontType);
  };

  return (
    <ThemeContext.Provider 
      value={{ theme: modifiedTheme, updateFontSizeMultiplier: setFontSizeMultiplier, toggleContrast: () => setHighContrast(prev => !prev), updateFontType }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
