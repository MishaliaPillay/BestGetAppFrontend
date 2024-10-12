import React from "react";
import { ThemeProvider } from "./appComponents/Components/Theme"; // Adjust path as necessary
import Nav from "./appComponents/Components/Nav";

export default function App() {
  return (
    <ThemeProvider>
      <Nav />
    </ThemeProvider>
  );
}