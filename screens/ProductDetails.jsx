import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES, COLORS } from "../constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
import {useRoute} from '@react-navigation/native'

const ProductDetails = ({ navigation }) => {
  // const navigation = useNavigation();
  const route = useRoute()
  const {item} = route.params


  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <>
      <View style={styles.upperRow}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back-circle" size={30}></Ionicons>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="heart" size={30} color={COLORS.gray}></Ionicons>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        // overScrollMode="never"
      >
        <Image
          source={{
            // uri: "https://d326fntlu7tb1e.cloudfront.net/uploads/cb2e64a8-ad4c-4d45-b58b-b0c7e11b6bb4-fn1.jpg",
            uri:item.imageUrl
          }}
          style={styles.image}
        ></Image>

        <View style={styles.details}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{item.title}</Text>

            <View style={styles.priceWrapper}>
              <Text style={styles.price}>$ {item.price}</Text>
            </View>
          </View>

          <View style={styles.ratingRow}>
            <View style={styles.rating}>
              {[1, 2, 3, 4, 5].map((index) => {
                return (
                  <Ionicons name="star" key={index} size={24} color="gold" />
                );
              })}

              <Text style={styles.ratingText}>(4.9)</Text>
            </View>

            <View style={styles.rating}>
              <TouchableOpacity
                onPress={() => {
                  increment();
                }}
              >
                <AntDesign name="pluscircleo" size={20} color="black" />
              </TouchableOpacity>

              <Text style={styles.ratingText}>{count}</Text>

              <TouchableOpacity
                onPress={() => {
                  decrement();
                }}
              >
                <AntDesign name="minuscircleo" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.descriptionWrapper}>
            <Text style={styles.desctiption}>Description</Text>

            <Text style={styles.descText}>
              {item.description}
            </Text>
          </View>

          <View style={{ marginBottom: SIZES.small }}>
            <View style={styles.location}>
              <View style={{ flexDirection: "row" }}>
                <Ionicons name="location-outline" size={20}></Ionicons>
                <Text> {item.product_location} </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="truck-check-outline"
                  size={20}
                  color="black"
                />
                <Text> Free Delivery </Text>
              </View>
            </View>
          </View>

          <View style={styles.cartRow}>
            <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
              <Text style={styles.cartTitle}>BUY NOW</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}} style={styles.addCart}>
              <Entypo name="shopping-bag" size={22} color={COLORS.lightWhite} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },

  upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: SIZES.xLarge,
    width: SIZES.width - 44,
    zIndex: 999,
  },

  image: {
    aspectRatio: 1,
    resizeMode: "cover",
  },

  details: {
    marginTop: -SIZES.large,
    backgroundColor: COLORS.lightWhite,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
    // flex: 1,
  },
  titleRow: {
    marginHorizontal: 20,
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 44,
    top: 20,
  },

  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
  },

  priceWrapper: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large,
  },

  price: {
    paddingHorizontal: 10,
    fontFamily: "semibold",
    fontSize: SIZES.large,
  },

  ratingRow: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 10,
    // top: 10,
  },

  rating: {
    top: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: SIZES.large,
  },

  ratingText: {
    paddingHorizontal: SIZES.xSmall,
    color: COLORS.gray,
    fontFamily: "medium",
  },

  descriptionWrapper: {
    marginTop: SIZES.large * 2,
    marginHorizontal: SIZES.large,
  },

  desctiption: {
    fontFamily: "medium",
    fontSize: SIZES.large - 2,
  },

  descText: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    textAlign: "justify",
    marginBottom: SIZES.small,
  },

  location: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.secondary,
    paddingVertical: 5,
    borderRadius: SIZES.large,
    marginHorizontal: 12,
    paddingHorizontal: 10,
  },

  cartRow: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width,
    // backgroundColor: "red",
  },

  cartBtn: {
    width: SIZES.width * 0.7,
    backgroundColor: COLORS.black,
    paddingVertical: 5,
    paddingHorizontal: 10,
    // padding: SIZES.small / 2,
    borderRadius: SIZES.large,
    marginLeft: 12,
  },

  cartTitle: {
    color: COLORS.lightWhite,
    fontFamily: "bold",
    fontSize: SIZES.medium,
    marginLeft: SIZES.small,
  },

  addCart: {
    width: 37,
    height: 37,
    borderRadius: 50,
    margin: SIZES.small,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProductDetails;
