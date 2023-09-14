import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { COLORS, SIZES } from "../.././constants";
import useFetch from "../../hook/useFetch";
import ProductCardView from "./ProductCardView";

const ProductList = () => {
  const { data, isLoading, error } = useFetch();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size={SIZES.xxLarge}
          color={COLORS.primary}
        ></ActivityIndicator>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCardView item={item}></ProductCardView>
        )}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // alignContent:'center'
  },

  container: {
    alignItems: "center",
    paddingTop: SIZES.xxLarge,
    paddingLeft: SIZES.small / 2,
  },

  separator: {
    height: 16,
  },
});

export default ProductList;
