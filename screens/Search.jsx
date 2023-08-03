import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants";
import { Feather, Ionicons } from "@expo/vector-icons";

const Search = () => (
  <SafeAreaView>
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
          value=""
          onPressIn={() => {}}
          placeholder="What are you looking for"
        ></TextInput>
      </View>

      <View>
        <TouchableOpacity style={styles.searchBtn}>
          <Feather name="search" size={24} style={styles.searchIcon}></Feather>
        </TouchableOpacity>
      </View>
    </View>
  </SafeAreaView>
);

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
});

export default Search;
