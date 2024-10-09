import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SelectList({ route }) {
  const { list } = route.params; // Get the selected list details

  return (
    <View style={styles.container}>
      <Text style={styles.listTitle}>{list.name}</Text>
      <Text style={styles.listDetails}>Price: ${list.totalPrice.toFixed(2)} | Items: {list.itemCount}</Text>
      {/* Here you can render the items for the selected list */}
      {/* Example: */}
      {/* {list.items.map(item => <Text key={item.id}>{item.name}</Text>)} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listDetails: {
    fontSize: 18,
    color: '#555',
  },
});
