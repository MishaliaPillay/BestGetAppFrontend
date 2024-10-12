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
  const [recentSearches, setRecentSearches] = useState([]); // State for recent searches

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

      const loadRecentSearches = async () => {
        try {
          const storedSearches = await AsyncStorage.getItem("recentSearches");
          if (storedSearches) {
            setRecentSearches(JSON.parse(storedSearches));
          }
        } catch (error) {
          console.error("Error loading recent searches:", error);
        }
      };

      fetchName();
      loadRecentSearches();
    }, [])
  );

  const handleToggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      // Save the search term to AsyncStorage
      const updatedSearches = await saveSearch(searchTerm.trim());
      setRecentSearches(updatedSearches); // Update state with recent searches
      navigation.navigate("FoundProducts", { searchTerm });
      setSearchTerm("");
    }
  };

  const saveSearch = async (term) => {
    try {
      const storedSearches = await AsyncStorage.getItem("recentSearches");
      const recentSearchesArray = storedSearches ? JSON.parse(storedSearches) : [];

      // Add the new term and remove duplicates
      const newSearches = [...new Set([term, ...recentSearchesArray])];
      
      // Keep only the last 10 searches
      const updatedSearches = newSearches.slice(0, 10);

      // Save back to AsyncStorage
      await AsyncStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      return updatedSearches;
    } catch (error) {
      console.error("Error saving search:", error);
      return [];
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
        <RecentSearches searches={recentSearches} /> 
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
    paddingTop: "5%",
    paddingHorizontal: 20,
  },
});
