import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { COLORS, SIZES } from "../.././constants";
import Ionicons from "@expo/vector-icons/Ionicons";

const ProductCardView = () => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://d326fntlu7tb1e.cloudfront.net/uploads/cb2e64a8-ad4c-4d45-b58b-b0c7e11b6bb4-fn1.jpg",
            }}
            style={styles.image}
          ></Image>
        </View>

        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            Product asdfsadfasdfsadfsadf
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            Product
          </Text>
          <Text style={styles.price}>$2353</Text>
        </View>

        <TouchableOpacity style={styles.addBtn}>
          <Ionicons
            name="add-circle"
            size={35}
            color={COLORS.primary}
          ></Ionicons>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 182,
    height: 240,
    marginEnd: 22,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.secondary,
    marginBottom: 20,
  },

  imageContainer: {
    flex: 1,
    width: 170,
    marginLeft: SIZES.small / 2,
    marginTop: SIZES.small / 2,
    borderRadius: SIZES.small,
    overflow: "hidden",
  },

  image: {
    aspectRatio: 1,
    resizeMode: "cover",
  },

  details: {
    padding: SIZES.small,
  },

  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    marginBottom: 2,
  },

  supplier: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    color: COLORS.gray,
  },

  price: {
    fontFamily: "medium",
    fontSize: SIZES.large,
    marginBottom: 2,
  },

  addBtn: {
    position: "absolute",
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
  },
});

export default ProductCardView;
