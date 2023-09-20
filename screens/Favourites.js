import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES, SHADOWS } from "../constants";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import SimpleLineIcons from "@expo/vector-icons/Ionicons";
import { FlatList } from "react-native";

const Favourites = ({ navigation }) => {
  const [favData, setFavData] = useState([]);

  useEffect(() => {
    checkFavorites();
  }, []);

  const checkFavorites = async () => {
    const id = await AsyncStorage.getItem("id");
    const favoritesId = `favorites${JSON.parse(id)}`;

    try {
      const favoritesObj = await AsyncStorage.getItem(favoritesId);

      if (favoritesObj !== null) {
        const favorites = JSON.parse(favoritesObj);
        const favList = Object.values(favorites);

        setFavData(favList);
        console.log(favList.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFavorites = async (product) => {
    const id = await AsyncStorage.getItem("id");
    const favoritesId = `favorites${JSON.parse(id)}`;
    let productId = product;

    try {
      const existingItem = await AsyncStorage.getItem(favoritesId);
      let favoritesObj = existingItem ? JSON.parse(existingItem) : {};

      if (favoritesObj[productId]) {
        delete favoritesObj[productId];

        checkFavorites();
      }

      await AsyncStorage.setItem(favoritesId, JSON.stringify(favoritesObj));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          ></Ionicons>
        </TouchableOpacity>

        <Text style={styles.titletxt}>Favorites</Text>
      </View>

      <FlatList
        data={favData}
        renderItem={({ item }) => (
          <View style={styles.favContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.image}
              ></Image>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.fav}>{item.title}</Text>
              <Text style={styles.supplier}>{item.supplier}</Text>
              <Text style={styles.fav}>${item.price}</Text>
            </View>

            <TouchableOpacity onPress={() => deleteFavorites(item.id)}>
              <SimpleLineIcons
                name="trash"
                size={24}
                color={COLORS.red}
              ></SimpleLineIcons>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex:1,
    marginTop: 20,
    marginHorizontal: 20,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: SIZES.width - 50,
    marginBottom: 12,
  },

  titletxt: {
    fontFamily: "bold",
    fontSize: SIZES.xLarge,
    letterSpacing: 4,
    marginLeft: SIZES.small,
  },

  favContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: SIZES.xSmall,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.secondary,
  },

  imageContainer: {
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.small,
  },

  image: {
    width: "100%",
    height: 65,
    borderRadius: SIZES.medium,
    resizeMode: "cover",
  },

  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },

  fav: {
    fontFamily: "bold",
    color: COLORS.primary,
    fontSize: SIZES.medium,
  },

  supplier: {
    fontFamily: "regular",
    color: COLORS.gray,
    fontSize: SIZES.small,
  },
});

export default Favourites;
