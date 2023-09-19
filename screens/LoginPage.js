import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackBtn from "../components/BackBtn";
import { COLORS, SIZES } from "../constants";
import Button from "../components/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAvoidingView } from "react-native";

// ().shape
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Provide a valid email address")
    .required("Required"),
  password: Yup.string()
    .min(8, "Must be 8 characters or more")
    .required("Required"),
});

const LoginPage = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  // const [responseData, setResponseData] = useState(null);
  const [obsecureText, setObsecureText] = useState(false);

  const login = async (values) => {
    setLoader(true);

    try {
      const endpoint = "http://10.0.2.2:3001/api/login";
      const data = values;
      const response = await axios.post(endpoint, data);

      if (response.status === 200) {
        setLoader(false);
        await AsyncStorage.setItem(
          `user${response.data._id}`,
          JSON.stringify(response.data)
        );

        await AsyncStorage.setItem("id", JSON.stringify(response.data._id));
        await AsyncStorage.setItem(
          "token",
          JSON.stringify(response.data.token)
        );
        console.log("THIS IS TOKEN: ", response.data.token);
        navigation.replace("BottomTabBar");

        // const newUser = await AsyncStorage.getItem(`user${responseData._id}`);
        // console.log(newUser);
      } else {
        Alert.alert("Error Loggin in", "Please provide valid credentials", [
          {
            text: "Cancel",
            onPress: () => console.log(),
          },
          {
            text: "Continue",
            onPress: () => console.log(),
          },
          // { defaultIndex: 1 },
        ]);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Oops, Error loggin in try again with correct credentials",
        [
          {
            text: "Cancel",
            onPress: () => console.log(),
          },
          {
            text: "Continue",
            onPress: () => console.log(),
          },
          // { defaultIndex: 1 },
        ]
      );
    } finally {
      setLoader(false);
    }
  };

  const invalidForm = () => {
    Alert.alert("Invalid Form", "Please provide all required fields", [
      {
        text: "Cancel",
        onPress: () => console.log(),
      },
      {
        text: "Continue",
        onPress: () => console.log(),
      },
      // { defaultIndex: 1 },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView>
        <SafeAreaView style={{ marginHorizontal: 20 }}>
          <View>
            <BackBtn onPress={() => navigation.goBack()}></BackBtn>
            <Image
              source={require("../assets/images/bk.png")}
              style={styles.loginImage}
            ></Image>

            <Text style={styles.title}> Unlimited Luxurious Furniture</Text>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => login(values)}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
                setFieldTouched,
                touched,
              }) => (
                <View>
                  <View style={styles.wrapper}>
                    <Text style={styles.label}>Email</Text>
                    <View
                      style={styles.inputWrapper(
                        touched.email ? COLORS.secondary : COLORS.offwhite
                      )}
                    >
                      <MaterialCommunityIcons
                        name="email-outline"
                        size={20}
                        color={COLORS.gray}
                        style={styles.iconStyle}
                      ></MaterialCommunityIcons>
                      <TextInput
                        placeholder="Enter email"
                        onFocus={() => {
                          setFieldTouched("email");
                        }}
                        onBlur={() => {
                          setFieldTouched("email", "");
                        }}
                        value={values.email}
                        onChangeText={handleChange("email")}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{ flex: 1, height: "100%" }}
                      ></TextInput>
                    </View>

                    {touched.email && errors.email && (
                      <Text style={styles.errorMessage}>{errors.email}</Text>
                    )}
                  </View>

                  <View style={styles.wrapper}>
                    <Text style={styles.label}>Password</Text>
                    <View
                      style={styles.inputWrapper(
                        touched.password ? COLORS.secondary : COLORS.offwhite
                      )}
                    >
                      <MaterialCommunityIcons
                        name="lock-outline"
                        size={20}
                        color={COLORS.gray}
                        style={styles.iconStyle}
                      ></MaterialCommunityIcons>
                      <TextInput
                        secureTextEntry={!obsecureText}
                        placeholder="Enter password"
                        onFocus={() => {
                          setFieldTouched("password");
                        }}
                        onBlur={() => {
                          setFieldTouched("password", "");
                        }}
                        value={values.password}
                        onChangeText={handleChange("password")}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{ flex: 1, height: "100%" }}
                      ></TextInput>

                      <TouchableOpacity
                        onPress={() => {
                          setObsecureText(!obsecureText);
                        }}
                      >
                        <MaterialCommunityIcons
                          name={
                            obsecureText ? "eye-outline" : "eye-off-outline"
                          }
                          size={18}
                        ></MaterialCommunityIcons>
                      </TouchableOpacity>
                    </View>

                    {touched.password && errors.password && (
                      <Text style={styles.errorMessage}>{errors.password}</Text>
                    )}
                  </View>

                  <Button
                    loader={loader}
                    onPress={() => {
                      isValid ? handleSubmit() : invalidForm();
                    }}
                    title={"L O G I N"}
                    isValid={isValid}
                  ></Button>

                  <Text
                    style={styles.registration}
                    onPress={() => {
                      navigation.navigate("SignUp");
                    }}
                  >
                    Register
                  </Text>
                </View>
              )}
            </Formik>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loginImage: {
    height: SIZES.height / 2.4,
    width: SIZES.width - 16,
    resizeMode: "contain",
    marginBottom: SIZES.xxLarge,
  },

  title: {
    fontFamily: "bold",
    fontSize: SIZES.xLarge,
    alignSelf: "center",
    color: COLORS.primary,
    marginBottom: SIZES.xxLarge,
  },

  wrapper: {
    marginBottom: 20,
    // marginHorizontal: 20,
  },

  label: {
    fontFamily: "regular",
    fontSize: SIZES.xSmall,
    marginBottom: 5,
    marginEnd: 5,
    textAlign: "right",
  },

  inputWrapper: (borderColor) => ({
    borderColor: borderColor,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
  }),

  iconStyle: {
    marginRight: 10,
  },

  errorMessage: {
    color: COLORS.red,
    fontFamily: "regular",
    marginTop: 5,
    marginLeft: 5,
    fontSize: SIZES.xSmall,
  },

  registration: {
    // marginTop: 20,
    color: "black",
    textAlign: "center",
    padding: SIZES.small,
  },
});

export default LoginPage;
