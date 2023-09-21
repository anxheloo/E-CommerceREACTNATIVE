import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES, SHADOWS, COLORS } from "../constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import OrdersTile from "../components/OrdersTile";
import FetchOrders from "../hook/FetchOrders";

const Orders = ({ navigation }) => {
  const { data, refetch, loading, error } = FetchOrders();

  // console.log(data);

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

        <Text style={styles.titletxt}>Orders</Text>
      </View>

      {loading ? (
        <ActivityIndicator></ActivityIndicator>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <OrdersTile item={item}></OrdersTile>}
        ></FlatList>
      )}
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
});

export default Orders;
