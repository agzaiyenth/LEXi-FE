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
  },
};

// Add a method to toggle the contrast theme globally
export const getCurrentTheme = (contrast: boolean) => {
  return contrast
    ? {
        ...theme,
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
      }
    : theme; // Default theme for normal contrast
};

export default theme;
