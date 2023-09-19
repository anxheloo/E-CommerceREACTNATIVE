import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

const fetchCart = async () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");
      const endpoint = "http://10.0.2.2:3001/api/carts/find";

      const headers = {
        "Content-Type": "application/json",
        token: "Bearer " + JSON.parse(token),
      };

      const response = await axios.get(endpoint, { headers });
      const newData = JSON.stringify(response.data);

      const parsedData = JSON.parse(newData);
      const products = parsedData[0].products;

      await AsyncStorage.setItem("cartCount", JSON.stringify(products.length));

      setData(products);
      setLoading(false);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect =
    (() => {
      fetchData();
    },
    []);

  const refetch = () => {
    setLoading(true);
    fetchData();
  };

  return { data, refetch, loading, error };
};

export default fetchCart;
