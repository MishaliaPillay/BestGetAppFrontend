import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import LoadingSpinner from "../Components/LoadingSpinner";
import NoProductsMessage from "../Components/NoProductsMessage";
import ProductItem from "../Components/ProductItem";
import Pagination from "../Components/Pagination";
import axios from "axios";
import SearchBar from "../Components/Searchbar"; // Import the SearchBar component

export default function FoundProducts({ route }) {
  const { searchTerm } = route.params; // Initial search term from the previous screen
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchTerm); // State for search query (for API call)
  const [userInput, setUserInput] = useState(searchTerm); // State for user's typed input
  const [selectedStores, setSelectedStores] = useState([]); // Stores selected for filtering
  const [showFilter, setShowFilter] = useState(false); // State to manage filter visibility
  const navigation = useNavigation(); // Use the navigation hook here
  const itemsPerPage = 10;

  const handleToggleFilter = () => {
    setShowFilter((prev) => !prev); // Toggle the filter visibility
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://bestgetappscripts.onrender.com/products`
        );
  
        const allProducts = response.data;
  
        // Filter products based on the search query and selected stores
        const filteredProducts = allProducts
          .filter((product) => {
            const productName = product.name.toLowerCase();
            
            // Check if the product name contains the full search query, not just starting with it
            const matchesSearchQuery = productName.includes(searchQuery.toLowerCase());
  
            // Check if the product matches the selected store filter
            const matchesStoreFilter =
              selectedStores.length === 0 ||
              selectedStores.includes(product.source); // Filter by source if selected
  
            return matchesSearchQuery && matchesStoreFilter;
          })
          .sort((a, b) => {
            const priceA = parseFloat(a.price.replace("R", ""));
            const priceB = parseFloat(b.price.replace("R", ""));
            return priceA - priceB; // Sorting by price (ascending)
          });
  
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      } finally {
        setLoading(false);
      }
    };
  
    if (searchQuery) {
      fetchProducts();
    }
  }, [searchQuery, selectedStores]); // Fetch products whenever searchQuery or selectedStores changes
  
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const displayedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Function to handle search submission
  const handleSearchSubmit = () => {
    setSearchQuery(userInput); // Set the search query to the user input (trigger the search)
  };

  // Function to toggle source filter
  const toggleStoreFilter = (source) => {
    setSelectedStores(
      (prevStores) =>
        prevStores.includes(source)
          ? prevStores.filter((s) => s !== source) // Remove source if already selected
          : [...prevStores, source] // Add source if not selected
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar
        targetScreen="FoundProducts"
        showFilter={true}
        toggleFilter={handleToggleFilter} // Pass the toggle function
        searchTerm={userInput} // Bind the user's input to the search bar
        setSearchTerm={setUserInput} // Update the user's input as they type
        onSearch={handleSearchSubmit} // Call handleSearchSubmit when the user submits
      />

      {/* Conditionally render the filter buttons based on showFilter state */}
      {showFilter && (
        <View style={styles.filterContainer}>
          {["Checkers", "Pick n pay", "Woolworths"].map((source) => (
            <TouchableOpacity
              key={source}
              style={[
                styles.filterButton,
                selectedStores.includes(source) && styles.filterButtonActive,
              ]}
              onPress={() => toggleStoreFilter(source)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedStores.includes(source) &&
                    styles.filterButtonTextActive,
                ]}
              >
                {source}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : displayedProducts.length === 0 ? (
        <NoProductsMessage />
      ) : (
        <FlatList
          data={displayedProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("ItemCard", { item })} // Passing item to ItemCard
              >
                <ProductItem item={item} />
              </TouchableOpacity>
            );
          }}
        />
      )}

      {!loading && displayedProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  filterButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 25,
    backgroundColor: "white",
  },
  filterButtonActive: {
    backgroundColor: "#007bff", // Active button color
  },
  filterButtonText: {
    color: "black",
  },
  filterButtonTextActive: {
    color: "white",
  },
});
