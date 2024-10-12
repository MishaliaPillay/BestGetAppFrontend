import React, { useState, useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../Components/Header";
import SearchBar from "../Components/Searchbar";
import Filter from "../Components/Fliter";
import RecentSearches from "../Components/RecentSearches";
import Recommendations from "../Components/Recommendations";
import CategoryBoxes from "../Components/CategoryBoxes";
import { useTheme, ThemedView, ThemedText } from "../Components/Theme"; // Import useTheme and Themed components

export default function Home() {
  const navigation = useNavigation();
  const { themeColors } = useTheme(); // Get theme colors from context
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("");

  const HomeFilterOptions = [
    "Vegetables",
    "Dairy & Eggs",
    "Meat",
    "Seafood",
    "Plant-based",
    "Bread & Bakery",
    "Canned Goods",
    "Snacks & Sweets",
    "Tea & Coffee",
    "Soft Drinks",
    "Juices",
    "Water",
  ];

  useFocusEffect(
    useCallback(() => {
      const fetchName = async () => {
        try {
          const storedName = await AsyncStorage.getItem("userName");
          if (storedName) {
            setName(storedName);
          }
        } catch (error) {
          console.error("Error fetching name:", error);
        }
      };

      fetchName();
    }, [])
  );

  const handleToggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigation.navigate("FoundProducts", { searchTerm });
      setSearchTerm("");
    }
  };

  const handleFilterSelect = (filter) => {
    navigation.navigate("Categories", { selectedCategory: filter });
    setShowFilter(false);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
       
        <Header name={name} />
        <SearchBar
          targetScreen="FoundProducts"
          showFilter={true}
          toggleFilter={handleToggleFilter}
          options={HomeFilterOptions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />
        {showFilter && (
          <Filter
            options={HomeFilterOptions}
            onFilterSelect={handleFilterSelect}
          />
        )}
        <RecentSearches />
        <Recommendations />
        <CategoryBoxes />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Use dynamic background color from theme context
  },
  scrollContainer: {
    paddingTop: "1%",
    paddingHorizontal: 20,
  },
});
