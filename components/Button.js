import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../constants";
import { ActivityIndicator } from "react-native";

const Button = ({ onPress, title, isValid, loader }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.buttonContainer(!isValid ? COLORS.gray : COLORS.primary)}
    >
      {loader === false ? (
        <Text style={styles.btnText}>{title}</Text>
      ) : (
        <ActivityIndicator></ActivityIndicator>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: (backgroundColor) => ({
    width: "100%",
    height: 50,
    marginVertical: 20,
    backgroundColor: backgroundColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  }),

  btnText: {
    fontFamily: "bold",
    color: COLORS.white,
    fontSize: 18,
  },
});

export default Button;
