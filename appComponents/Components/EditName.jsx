import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditName = ({ navigation }) => {
  const [name, setName] = useState("");

  const saveName = async () => {
    const trimmedName = name.trim(); // Remove any extra spaces

    // Validate if the name is empty after trimming
    if (trimmedName === "") {
      Alert.alert("Invalid Name", "Please enter a valid name."); // Show alert if empty
      return; // Stop execution if invalid
    }

    try {
      await AsyncStorage.setItem("userName", trimmedName); // Save the trimmed name
      Alert.alert("Success", "Name saved successfully!");
      navigation.goBack(); // Navigate back to Home page after saving
    } catch (error) {
      console.error("Error saving name:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Your Name"
        maxLength={20}
      />
      <Button title="Save" onPress={saveName} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default EditName;
