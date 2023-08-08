import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";

const BackBtn = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.backButton}>
      <Ionicons
        name="chevron-back-circle"
        size={30}
        color={COLORS.primary}
      ></Ionicons>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    padding: 10,
    position: "absolute",
    zIndex: 999,
  },
});

export default BackBtn;
