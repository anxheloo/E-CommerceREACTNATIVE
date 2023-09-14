import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { COLORS, SIZES } from "../.././constants";
import ProductCardView from "./ProductCardView";
import useFetch from "../../hook/useFetch";

const ProductRow = () => {
  const { data, isLoading, error } = useFetch();

  const product = [1, 2, 3, 4];

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={SIZES.large}></ActivityIndicator>
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <FlatList
          // data={product}
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ProductCardView item={item}></ProductCardView>
          )}
          horizontal
          contentContainerStyle={{ columnGap: SIZES.medium }}
        ></FlatList>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: SIZES.medium,
    marginLeft: 12,
    marginBottom: 50,
  },
});

export default ProductRow;
