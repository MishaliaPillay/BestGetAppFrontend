import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Import GestureHandlerRootView
import { ThemeProvider } from "./appComponents/Components/Theme"; // Adjust path as necessary
import Nav from "./appComponents/Components/Nav";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}> 
      <ThemeProvider>
        <Nav />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
