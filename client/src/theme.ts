// theme.ts
export const theme = {
  colors: {
    primary: {
      dark1: "#264653", // Darkest shade
      dark2: "#254d4e",
      dark3: "#03767a", // Darker shade
      medium: "#2A9D8F", // Medium shade
      medium2: "#98c1b9", // Medium shade
      light: "#A8DADC", // Lighter shade
      light2: "#D3E0DE",
      light3: "#9ac3bb",
    },
    secondary: {
      dark1: "#A17E56",
      dark2: "#",
      medium: "#F4A261",
      light: "#",
      light2: "#fef8ea",
    },
    accent: {
      dark: "#6D597A",
      medium: "#B56576",
      light: "#E56B6F",
    },
    background: {
      offWhite: "#FFF9EB", // Off-white
      beige: "#F8ECD1", // Beige
      dark: "#D9CAB3", // Darker beige
    },
    blacks: {
      medium: "#151717",
      dark: "#000000",
    },
  },
  fonts: {
    regular: "System",
    regular2: "OpenDyslexic",
    bold: "System",
    sizes: {
      small: 16,
      medium: 20,
      large: 30,
      extraLarge: 40,
      s10:10,
      s12:12,
      s14: 14,
      s16: 16,
      s18: 18,
      s20: 20,
      s22: 22,
      s24: 24,
      s26: 26,
      s28: 28,
      s30: 30,
      s32: 32,
      s34: 34,
      s36: 36,
      s38: 38,
      s40: 40,
      s60:60,
    },
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
    extraLarge: 32,
    14: 14,
    16: 16,
    18: 18,
    20: 20,
    22: 22,
    24: 24,
    26: 26,
    28: 28,
    30: 30,
    32: 32,
    34: 34,
    36: 36,
    38: 38,
    40: 40,
  },
  accessibility: {
    highContrast: false,
    fontScale: 1, // 1 for normal, >1 for larger fonts
    colorFilter: false, // property for color filter
    fontType: "System", // Default font type
    lineHeight: 1, // Default line height
    letterSpacing: 0, // Default text spacing
    alphabeticalKeyboard: false, // Default keyboard setting
    textAlign: "left", // Default text alignment
  },
};

// Add a method to toggle the contrast theme globally
export const getCurrentTheme = (
  contrast: boolean, 
  fontScale: number, 
  colorFilter: boolean, 
  fontType: string,
  lineHeight: number,
  letterSpacing: number,
  alphabeticalKeyboard: boolean,
  textAlign: string
) => {
  const fontScale1 = Math.max(fontScale, 1);
  const lineHeight1 = Math.max(lineHeight, 1);
  const letterSpacing1 = Math.max(letterSpacing, 0);

  const baseTheme = {
    ...theme,
    fonts: {
      ...theme.fonts,
      regular: fontType, // Dynamically update the fontType
      sizes: {
        small: Math.round(16 * fontScale1),
        medium: Math.round(20 * fontScale1),
        large: Math.round(30 * fontScale1),
        extraLarge: Math.round(40 * fontScale1),
        s10: Math.round(10 * fontScale1),
        s12: Math.round(12 * fontScale1),
        s14: Math.round(14 * fontScale1),
        s16: Math.round(16 * fontScale1),
        s18: Math.round(18 * fontScale1),
        s20: Math.round(20 * fontScale1),
        s22: Math.round(22 * fontScale1),
        s24: Math.round(24 * fontScale1),
        s26: Math.round(26 * fontScale1),
        s28: Math.round(28 * fontScale1),
        s30: Math.round(30 * fontScale1),
        s32: Math.round(32 * fontScale1),
        s34: Math.round(34 * fontScale1),
        s36: Math.round(36 * fontScale1),
        s38: Math.round(38 * fontScale1),
        s40: Math.round(40 * fontScale1),
        s60: Math.round(60 * fontScale1),
      },
    },
    accessibility: {
      ...theme.accessibility,
      fontScale: fontScale1,
      lineHeight: lineHeight1, // Dynamically set lineHeight
      letterSpacing: letterSpacing1, // Dynamically set letterSpacing
      alphabeticalKeyboard: alphabeticalKeyboard, // Dynamically set keyboard type
      textAlign: "center", // Dynamically set text alignment
    },
  };

  let finalTheme = { ...baseTheme };

  if (contrast) {
    finalTheme = {
      ...finalTheme,
      colors: {
        ...theme.colors,
        primary: {
          dark1: "#0F1B21", // Much darker
          dark2: "#12343b", 
          dark3: "#025A5E", // Higher contrast
          medium: "#1F8A80", 
          medium2: "#A2DED0", 
          light: "#D8F5F1", // Lighter for contrast
          light2: "#E9F7F5",
          light3: "#B0DFD9",
        },
        secondary: {
          dark1: "#5E3D1E", // Darker for contrast
          dark2: "#8D5A2B",
          medium: "#E4792D", // More vibrant
          light: "#FDD9A4",
          light2: "#FFF4E5", // Higher contrast against text
        },
        accent: {
          dark: "#472E3D",
          medium: "#98394D",
          light: "#FF3B4A", // More vibrant contrast
        },
        background: {
          offWhite: "#FFFFFF", // Pure white for maximum contrast
          beige: "#F5E6C6", 
          dark: "#B3A38A", // Darker to contrast with text
        },
        blacks: {
          medium: "#121212", // Adjusted for clarity
          dark: "#000000",
        },
      },
    };
  }

  // Apply color filter
  if (colorFilter) {
    finalTheme = {
      ...finalTheme,
      colors: {
        ...theme.colors,
        primary: {
          dark1: "rgba(38, 70, 83, 0.5)",  
          dark2: "rgba(37, 77, 78, 0.5)",
          dark3: "rgba(3, 118, 122, 0.5)",
          medium: "rgba(42, 157, 143, 0.6)",
          medium2: "rgba(152, 193, 185, 0.6)",
          light: "rgba(168, 218, 220, 0.6)",
          light2: "rgba(211, 224, 222, 1)",
          light3: "rgba(154, 195, 187, 0.6)",
        },
        secondary: {
          dark1: "rgba(161, 126, 86, 0.6)",
          dark2: "rgba(138, 107, 79, 0.6)",
          medium: "rgba(244, 162, 97, 0.6)",
          light: "rgba(252, 213, 165, 0.6)",
          light2: "rgba(254, 248, 234, 0.6)",
        },
        accent: {
          dark: "rgba(109, 89, 122, 0.6)",
          medium: "rgba(181, 101, 118, 0.6)",
          light: "rgba(229, 107, 111, 0.6)",
        },
        background: {
          offWhite: "rgba(255, 249, 235, 0.9)",
          beige: "rgba(248, 236, 209, 1)",
          dark: "rgba(217, 202, 179, 0.6)",
        },
        blacks: {
          medium: "rgba(21, 23, 23, 0.6)",
          dark: "rgba(0, 0, 0, 0.6)",
        },
      },
    };
  }

  return finalTheme;
};

export default theme;
