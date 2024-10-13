// Colors.jsx
export const lightThemeColors = {
  background: "#ffffff",
  text: "#000000",
  button: "#007bff",
  border: "#06974d", // Border outline for light mode
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6, // For Android shadow support
  },
};

export const darkThemeColors = {
  background: "#000000",
  text: "#fcfcfc",
  button: "#ff5733",
  border: "#06974d", // Same border outline for dark mode
  boxShadow: {
    shadowColor: "white",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6, // For Android shadow support
  },
};
