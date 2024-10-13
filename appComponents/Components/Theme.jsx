import React, { createContext, useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native"; // Import Text here
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightThemeColors, darkThemeColors } from "../Components/Colors"; // Import theme colors

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("appTheme");
        if (savedTheme) {
          setTheme(savedTheme);
        }
      } catch (error) {
        console.error("Failed to load theme:", error);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem("appTheme", newTheme);
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  };

  const themeColors = theme === "light" ? lightThemeColors : darkThemeColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ThemedView component
export const ThemedView = ({ children, style }) => {
  const { themeColors } = useTheme();
  return (
    <View
      style={[
        styles.container,
        style,
        { backgroundColor: themeColors.background },
      ]}
    >
      {children}
    </View>
  );
};
// ThemedViewShadow component
export const ThemedViewShadow = ({ children, style }) => {
  const { themeColors } = useTheme();
  return (
    <View
      style={[
        style,
        { backgroundColor: themeColors.background },
        themeColors.boxShadow, // Apply box shadow styles
      ]}
    >
      {children}
    </View>
  );
};

// ThemedText component
export const ThemedText = ({ children, style }) => {
  const { themeColors } = useTheme();
  return (
    <Text style={[styles.text, style, { color: themeColors.text }]}>
      {children}
    </Text>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    // Any common text styles can be added here
    fontSize: 16,
  },
});
