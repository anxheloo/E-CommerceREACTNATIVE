import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import { SIZES, COLORS, SHADOWS } from "../constants";
import { AntDesign } from "@expo/vector-icons";

const OrdersTile = ({ item }) => {
  return (
    <TouchableOpacity style={styles.container(COLORS.secondary)}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.productId.imageUrl }}
          style={styles.image}
        ></Image>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.productTxt} numberOfLines={1}>
          {item.productId.title}
        </Text>
        <Text style={styles.supplier} numberOfLines={1}>
          {item.productId.supplier}
        </Text>
        <Text style={styles.supplier} numberOfLines={1}>
          {item.productId.price} * {item.quantity}
        </Text>
      </View>

      <View style={styles.orders}>
        <Text style={styles.productTxt}>{item.payment_status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: (color) => ({
    // flex: 1,
    // justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: SIZES.xSmall,
    padding: SIZES.small,
    borderRadius: SIZES.small,
    backgroundColor: color,
    ...SHADOWS.medium,
    shadowColor: COLORS.secondary,
  }),

  imageContainer: {
    width: 70,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: 65,
    borderRadius: SIZES.small,
    resizeMode: "cover",
  },

  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },

  productTxt: {
    fontSize: SIZES.medium,
    fontFamily: "bold",
    color: COLORS.primary,
  },

  supplier: {
    fontSize: SIZES.small + 2,
    fontFamily: "regular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },

  orders: {
    paddingHorizontal: 30,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
});

export default OrdersTile;
