import React from "react";
import { Button, StyleSheet } from "react-native";
import { useTheme, ThemedView } from "../Components/Theme"; // Ensure the import is correct

const Settings = ({ navigation }) => {
  // Ensure navigation is destructured from props
  const { toggleTheme } = useTheme(); // Access toggle function from context

  return (
    <ThemedView style={styles.container}>
      <Button
        title="Edit Name"
        onPress={() => navigation.navigate("EditName")} // Navigate to EditName screen
      />
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});

export default Settings;
