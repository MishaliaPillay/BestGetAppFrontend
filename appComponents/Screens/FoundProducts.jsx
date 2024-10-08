import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
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
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://bestgetappscripts.onrender.com/products`
        );

        const allProducts = response.data;
        // Filter products based on the search query
        const filteredProducts = allProducts
          .filter((product) => {
            const productNameWords = product.name.toLowerCase().split(" ");
            return productNameWords.some((word) =>
              word.startsWith(searchQuery.toLowerCase())
            );
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
  }, [searchQuery]); // Only fetch products when searchQuery changes

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

  return (
    <View style={styles.container}>
      <SearchBar
        targetScreen="FoundProducts"
        showFilter={false}
        searchTerm={userInput} // Bind the user's input to the search bar
        setSearchTerm={setUserInput} // Update the user's input as they type
        onSearch={handleSearchSubmit} // Call handleSearchSubmit when the user submits
      />
      {loading ? (
        <LoadingSpinner />
      ) : displayedProducts.length === 0 ? (
        <NoProductsMessage />
      ) : (
        <FlatList
          data={displayedProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductItem item={item} />}
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
});
