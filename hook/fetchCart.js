import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import axios from "axios";

const fetchCart = () => {
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

      console.log("Before making the axios request");
      const response = await axios.get(endpoint, { headers });
      console.log("After axios request, before logging response:", response);

      console.log("THIS IS response:", response);

      const cartProducts = response.data[0].products;

      console.log("THIS IS cartProducts:", cartProducts);

      setData(cartProducts);
      console.log("THIS IS DATA:", data);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setLoading(true);
    fetchData();
  };

  return { data, refetch, loading, error };
};

export default fetchCart;
