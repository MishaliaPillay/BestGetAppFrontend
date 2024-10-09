import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../Components/Header";
import SearchBar from "../Components/Searchbar";
import Filter from "../Components/Fliter"; // Corrected import
import RecentSearches from "../Components/RecentSearches";
import Recommendations from "../Components/Recommendations";
import CategoryBoxes from "../Components/CategoryBoxes";

export default function Home() {
  const navigation = useNavigation();
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
    navigation.navigate("Categories", { selectedCategory: filter }); // Change here
    setShowFilter(false); // Optionally hide the filter after selection
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />
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
            onFilterSelect={handleFilterSelect} // Pass the filter selection function
          />
        )}
        <RecentSearches />
        <Recommendations />
        <CategoryBoxes />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingTop: "1%",
    paddingHorizontal: 20,
  },
});
