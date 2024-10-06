import React, { useState } from "react";
import { TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; // For icons
import { useNavigation } from '@react-navigation/native';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigation.navigate('FoundProducts', { searchTerm });
      setSearchTerm(''); // Clear the input after navigating
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <TextInput
          placeholder="Search here"
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch} // Trigger search on Enter
        />
        <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
          <FontAwesome5 name="search" size={20} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => {}} style={styles.categoryIcon}>
        <FontAwesome5 name="filter" size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  searchSection: {
    flex: 1,
    position: "relative",
  },
  searchInput: {
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 25,
  },
  searchIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  categoryIcon: {
    marginLeft: 10, // Add space between search bar and category icon
  },
});
