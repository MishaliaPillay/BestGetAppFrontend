// Import necessary libraries
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image"; // Importing Image from expo-image
import axios from "axios";

// Define the logos for different sources
const logos = {
  Woolworths: require("../../assets/images/woolworths_sa.jpg"),
  "Pick n pay": require("../../assets/images/Pnp.png"),
  Checkers: require("../../assets/images/Checkers_sa.jpg"),
};

export default function FoundProducts({ route }) {
  const { searchTerm } = route.params;
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://bestgetappscripts.onrender.com/products`
        );
        const allProducts = response.data;
        const filteredProducts = allProducts.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const displayedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <View style={styles.productDetails}>
              <Image
                source={{ uri: item.image }}
                style={styles.productImage}
                contentFit="cover" // Similar to resizeMode in FastImage
              />
              <View style={styles.productInfo}>
                <View style={styles.productHeader}>
                  <Text style={styles.productName}>{item.name}</Text>
                  {item.source && logos[item.source] && (
                    <Image
                      source={logos[item.source]}
                      style={styles.storeLogo}
                    />
                  )}
                </View>
                <Text style={styles.productPrice}>{item.price}</Text>
              </View>
            </View>
          </View>
        )}
      />

      {/* Pagination component */}
      <View style={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setCurrentPage(index + 1)}
            style={[
              styles.pageButton,
              currentPage === index + 1 && styles.activePageButton,
            ]}
          >
            <Text style={styles.pageButtonText}>{index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  productItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingBottom: 10,
    paddingVertical: 10,
  },
  productDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    width: 80, // Adjusted width for better layout
    height: 80, // Adjusted height for better layout
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productName: {
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
  },
  storeLogo: {
    width: 30,
    height: 30,
  },
  productPrice: {
    color: "gray",
    marginTop: 5,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  pageButton: {
    marginHorizontal: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  activePageButton: {
    backgroundColor: "#007BFF",
  },
  pageButtonText: {
    color: "black",
  },
});
