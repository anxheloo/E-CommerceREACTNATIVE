import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import { SIZES, SHADOWS, COLORS } from "../../constants";
import { AntDesign } from "@expo/vector-icons";

const CartTile = ({ item, onPress, select }) => {
  return (
    <TouchableOpacity
      style={styles.container(!select ? "#FFF" : COLORS.secondary)}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.cartItem.imageUrl }}
          style={styles.image}
        ></Image>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.productTxt} numberOfLines={1}>
          {item.cartItem.title}
        </Text>
        <Text style={styles.supplier} numberOfLines={1}>
          {item.cartItem.supplier}
        </Text>
        <Text style={styles.supplier} numberOfLines={1}>
          {item.cartItem.price} * {item.quantity}
        </Text>
      </View>

      <TouchableOpacity
        style={{ paddingBottom: 20, paddingLeft: 75 }}
        onPress={onPress}
      >
        <AntDesign name="delete" size={18} color={COLORS.red}></AntDesign>
      </TouchableOpacity>
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
});

export default CartTile;
