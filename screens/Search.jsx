import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants";
import { Feather, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import SearchTile from "../components/products/SearchTile";

const Search = () => {
  // http://10.0.2.2:3001/api/products/search/${searchKey}

  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchKey.trim() === "") {
      setSearchResults([]);
    }
  }, [searchKey]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:3001/api/products/search/${searchKey}`
      );

      // console.log(searchKey);
      // console.log('==========================================')
      console.log(response.data);
      // console.log('==========================================')
      setSearchResults(response.data);
    } catch (error) {
      console.log("failed to get products", error);
    }
  };

  // console.log(searchKey)
  return (
    <SafeAreaView style={styles.productContainer}>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons
            name="camera-outline"
            size={SIZES.xLarge}
            color={COLORS.gray}
            style={{ paddingHorizontal: 10 }}
          ></Ionicons>
        </TouchableOpacity>

        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchKey}
            onChangeText={(text) => setSearchKey(text)}
            placeholder="What are you looking for"
          ></TextInput>
        </View>

        <View>
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => {
              handleSearch();
            }}
          >
            <Feather
              name="search"
              size={24}
              style={styles.searchIcon}
            ></Feather>
          </TouchableOpacity>
        </View>
      </View>

      {searchResults.length === 0 || searchKey.trim() === "" ? (
        <View style={{ flex: 1 }}>
          <Image
            source={require("../assets/images/Pose23.png")}
            style={styles.searchImage}
          ></Image>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <SearchTile item={item}></SearchTile>}
          style={{ marginHorizontal: 12 }}
        ></FlatList>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    marginHorizontal: SIZES.small,
    height: 50,
  },

  searchIcon: {
    marginHorizontal: 10,
    color: COLORS.white,
  },

  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },

  searchInput: {
    fontFamily: "regular",
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.small,
    // textAlign: "center",
  },

  searchBtn: {
    width: 50,
    backgroundColor: COLORS.primary,
    height: "100%",
    borderRadius: SIZES.medium,
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    alignItems: "center",
    paddingTop: SIZES.xxLarge,
    paddingLeft: SIZES.small / 2,
  },

  separator: {
    height: 16,
  },

  searchImage: {
    resizeMode: "contain",
    width: SIZES.width - 100,
    height: SIZES.height - 200,
    marginLeft: 20,
    opacity: 0.9,
  },
});

export default Search;
