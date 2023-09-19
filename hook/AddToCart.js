import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AddToCart = async (productId, quantity) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const endpoint = "http://10.0.2.2:3001/api/carts";

    console.log("TOKENNNNN:", token);

    const data = {
      cartItem: productId,
      quantity,
    };

    const headers = {
      "Content-Type": "application/json",
      token: "Bearer " + JSON.parse(token),
    };

    await axios.post(endpoint, data, { headers });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default AddToCart;
