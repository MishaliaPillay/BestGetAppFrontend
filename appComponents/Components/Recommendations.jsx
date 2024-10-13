import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import ItemBlock from "../Components/ItemBlocks"; // Import the ItemBlock component
import LoadingSpinner from "../Components/LoadingSpinner"; // Import the LoadingSpinner

export default function Recommendations() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://bestgetappscripts.onrender.com/products`
        );

        const recommendedProducts = response.data.slice(0, 10);
        setProducts(recommendedProducts);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const handleProductClick = (product) => {
    if (product) {
      navigation.navigate("ItemCard", { item: product });
    } else {
      console.error("Product is undefined"); // Log error if product is undefined
    }
  };

  if (loading) {
    return <LoadingSpinner />; // Show the loading spinner when loading
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>You might also like</Text>
      <FlatList
        horizontal
        data={products}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProductClick(item)}>
            <ItemBlock item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
});
