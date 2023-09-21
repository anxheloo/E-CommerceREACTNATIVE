import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SIZES, COLORS } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(userId);

      if (currentUser !== null) {
        const parsedData = JSON.parse(currentUser);
        setUserData(parsedData);
        setUserLogin(true);
      }
    } catch (error) {
      console.log("Error retrieving the data: ", error);
    }
  };

  const userLogout = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;

    try {
      await AsyncStorage.multiRemove([userId, "id"]);
      navigation.replace("BottomTabBar");
    } catch (error) {
      console.log("Error logging out the user: ", error);
    }
  };

  const logout = () => {
    Alert.alert("Logout", "Are you sure you want to logout", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel pressed"),
      },
      {
        text: "Continue",
        onPress: () => {
          userLogout();
        },
      },
      // { defaultIndex: 1 },
    ]);
  };

  const clearCache = () => {
    Alert.alert(
      "Clear Cache",
      "Are you sure you want to delete all saved data on your device",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel clear cache"),
        },
        {
          text: "Continue",
          onPress: () => cacheClear(),
        },
        // { defaultIndex: 1 },
      ]
    );
  };

  const cacheClear = async () => {
    const id = await AsyncStorage.getItem("id");
    const favId = `favorites${JSON.parse(id)}`;

    try {
      await AsyncStorage.removeItem(favId);
    } catch (error) {
      console.log("Error logging out the user: ", error);
    }
  };

  const userDelete = async () => {
    try {
      const id = await AsyncStorage.getItem("id");
      const userId = `user${JSON.parse(id)}`;
      const endpoint = `http://10.0.2.2:3001/api/users/${JSON.parse(id)}`;
      const response = await axios.delete(endpoint);

      console.log(id);
      console.log(userId);

      if (response.status === 200) {
        await AsyncStorage.multiRemove([userId, "id"]);
        navigation.replace("BottomTabBar");
      }
    } catch (error) {
      console.log(error);
      console.log("Error deleting the user: ", error);
    }
  };

  const deleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel pressed"),
        },
        {
          text: "Continue",
          onPress: () => {
            userDelete();
          },
        },
        // { defaultIndex: 1 },
      ]
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.gray}></StatusBar>

        <View style={{ width: "100%" }}>
          <Image
            source={require("../assets/images/space.jpg")}
            style={styles.cover}
          ></Image>
        </View>

        <View style={styles.profileContainer}>
          <Image
            source={require("../assets/images/profile.jpeg")}
            style={styles.profileImage}
          ></Image>

          <Text style={styles.name}>
            {userLogin === true
              ? userData.username
              : "Please login into your account!"}
          </Text>

          {userLogin === false ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>L O G I N </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>{userData.email}</Text>
            </View>
          )}

          {userLogin === false ? (
            <View></View>
          ) : (
            <View style={styles.menuWrapper}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Favourites");
                }}
              >
                <View style={styles.menuItem(0.7)}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    size={24}
                    color={COLORS.primary}
                  ></MaterialCommunityIcons>
                  <Text style={styles.menuText}>Favourites</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Orders");
                }}
              >
                <View style={styles.menuItem(0.7)}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    size={24}
                    color={COLORS.primary}
                  ></MaterialCommunityIcons>
                  <Text style={styles.menuText}>Orders</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Cart");
                }}
              >
                <View style={styles.menuItem(0.7)}>
                  <SimpleLineIcons
                    name="bag"
                    size={24}
                    color={COLORS.primary}
                  ></SimpleLineIcons>
                  <Text style={styles.menuText}>Cart</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  clearCache();
                }}
              >
                <View style={styles.menuItem(0.7)}>
                  <MaterialCommunityIcons
                    name="cached"
                    size={24}
                    color={COLORS.primary}
                  ></MaterialCommunityIcons>
                  <Text style={styles.menuText}>Clear cache</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  deleteAccount();
                }}
              >
                <View style={styles.menuItem(0.7)}>
                  <AntDesign
                    name="deleteuser"
                    size={24}
                    color={COLORS.primary}
                  ></AntDesign>
                  <Text style={styles.menuText}>Delete Account</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  logout();
                }}
              >
                <View style={styles.menuItem(0.7)}>
                  <AntDesign
                    name="logout"
                    size={24}
                    color={COLORS.primary}
                  ></AntDesign>
                  <Text style={styles.menuText}>Log Out</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },

  cover: {
    height: 290,
    width: "100%",
    resizeMode: "cover",
  },

  profileContainer: {
    flex: 1,
    alignItems: "center",
  },

  profileImage: {
    height: 155,
    width: 155,
    borderRadius: 999,
    borderColor: COLORS.primary,
    borderWidth: 2,
    resizeMode: "cover",
    marginTop: -90,
  },

  name: {
    fontFamily: "bold",
    color: COLORS.primary,
    marginVertical: 5,
  },

  loginBtn: {
    // width:,
    padding: 2,
    borderWidth: 0.4,
    borderColor: COLORS.primary,
    borderRadius: SIZES.xLarge,
    backgroundColor: COLORS.secondary,
  },

  menuText: {
    fontFamily: "regular",
    color: COLORS.gray,
    marginHorizontal: 20,
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 26,
  },

  menuWrapper: {
    marginTop: SIZES.xLarge,
    width: SIZES.width - SIZES.large,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },

  menuItem: (borderBottomWidth) => ({
    borderBottomWidth: borderBottomWidth,
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderBottomColor: COLORS.gray,
  }),
});

export default Profile;
