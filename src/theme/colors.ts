export const colors = {
  // Primary colors
  primary: "#000000",
  primaryLight: "#1f1f1f",

  // Text colors
  text: {
    primary: "#FFFFFF",
    secondary: "#CCCCCC",
  },

  // Background colors
  background: {
    primary: "#000000",
    secondary: "#1f1f1f",
  },

  // Common colors
  white: "#FFFFFF",
  black: "#000000",
  gray: "#CCCCCC",

  // Status colors
  success: "#4CAF50",
  error: "#F44336",
  warning: "#FFC107",
  info: "#2196F3",
};

// Export a function to get colors with opacity
export const getColorWithOpacity = (color: string, opacity: number): string => {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
