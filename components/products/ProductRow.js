import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { COLORS, SIZES } from "../.././constants";
import ProductCardView from "./ProductCardView";

const ProductRow = () => {
  const product = [1, 2, 3, 4];

  return (
    <View style={styles.container}>
      <FlatList
        data={product}
        renderItem={({ item }) => <ProductCardView></ProductCardView>}
        horizontal
        contentContainerStyle={{ columnGap: SIZES.medium }}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.medium,
    marginLeft: 12,
  },
});

export default ProductRow;
