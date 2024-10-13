import React, { useState, useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../Components/Header";
import SearchBar from "../Components/Searchbar";
import Filter from "../Components/Fliter"; // Fixed typo from 'Fliter' to 'Filter'
import RecentSearches from "../Components/RecentSearches";
import Recommendations from "../Components/Recommendations";
import CategoryBoxes from "../Components/CategoryBoxes";
import { useTheme, ThemedView } from "../Components/Theme";

export default function Home() {
  const navigation = useNavigation();
  const { themeColors } = useTheme();
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

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

  const handleSearch = async (term) => {
    // Ensure term is a string before trimming
    const searchQuery =
      typeof term === "string" ? term.trim() : searchTerm.trim();

    if (searchQuery) {
      // Save the search term to AsyncStorage regardless of how it was triggered
      const updatedSearches = await saveSearch(searchQuery);
      setRecentSearches(updatedSearches); // Update state with recent searches
      navigation.navigate("FoundProducts", { searchTerm: searchQuery });
      setSearchTerm(""); // Clear the search term after submitting
    }
  };

  const saveSearch = async (term) => {
    try {
      // Retrieve existing searches from AsyncStorage
      const storedSearches = await AsyncStorage.getItem("recentSearches");
      const recentSearchesArray = storedSearches
        ? JSON.parse(storedSearches) // Parse to array if exists
        : []; // If not, start with an empty array

      // Add the new term and remove duplicates using Set
      const newSearches = [...new Set([term, ...recentSearchesArray])];

      // Keep only the last 10 searches
      const updatedSearches = newSearches.slice(0, 10);

      // Save updated searches back to AsyncStorage
      await AsyncStorage.setItem(
        "recentSearches",
        JSON.stringify(updatedSearches)
      );
      console.log("Updated Recent Searches:", updatedSearches);

      return updatedSearches; // Return the updated array
    } catch (error) {
      console.error("Error saving search:", error); // Log error if it occurs
      return []; // Return an empty array in case of error
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
        <RecentSearches
          searches={recentSearches}
          onSearch={handleSearch} // Pass handleSearch to RecentSearches
        />

        <Recommendations />
        <CategoryBoxes />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
  },
  scrollContainer: {
    paddingTop: "5%",
    paddingHorizontal: 20,
  },
});
