import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { AppLoading } from "expo";
import { RectButton } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import api from "../../services/api";

import {
  MPLUSRounded1c_500Medium,
  MPLUSRounded1c_700Bold,
  MPLUSRounded1c_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/m-plus-rounded-1c";

import logo from "../../assets/logo2.png";

export default function Landing() {
  const navigation = useNavigation();
  const [user, setUser] = useState();
  const [userValue, setUserValue] = useState();
  const [userList, setUserlist] = useState();

  const handleLogin = (usr) => {
    navigation.navigate("Landing", usr);
  };

  const [usersObject, setUsersObject] = useState([]);

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      const result = JSON.parse(jsonValue);

      if (result != null) {
        setUserValue(result.name);
        navigation.navigate("Landing", result.name);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    api
      .get("/api/allUsers")
      .then(function (response) {
        setUsersObject(response.data);
        getUser();
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  }, []);

  useEffect(() => {}, [userList]);

  let [fontsLoaded, error] = useFonts({
    MPLUSRounded1c_700Bold,
    MPLUSRounded1c_500Medium,
    MPLUSRounded1c_800ExtraBold,
  });

  const storeUser = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={{ width: "100%" }}
      >
        <View style={styles.container}>
          <View style={styles.logoView}>
            <Image source={logo} style={styles.logo}></Image>
          </View>
          <Text
            style={({ fontFamily: "MPLUSRounded1c_700Bold" }, styles.title)}
          >
            MANUTENÇÃO
          </Text>
          <StatusBar style="auto" />

          <View style={styles.pickerWrap}>
            <Text style={styles.pickerTitle}>Selecione o usuário</Text>
            <Picker
              selectedValue={userValue}
              style={styles.userPicker}
              onValueChange={(itemValue, itemIndex) => {
                setUserValue(itemValue);
                for (let user of usersObject) {
                  if (user.name === itemValue) {
                    setUser(user);
                  }
                }
              }}
            >
              {usersObject.map((user) => {
                return (
                  <Picker.Item
                    label={user.name}
                    key={user.cod}
                    value={user.name}
                  />
                );
              })}
            </Picker>
          </View>

          <RectButton
            style={styles.userCntBtn}
            onPress={() => {
              if (user === "0") {
                return;
              } else {
                storeUser(user);
                handleLogin(user);
              }
            }}
          >
            <Text style={styles.userCntBtnTitle}>CONECTAR</Text>
          </RectButton>
          <Text style={styles.infoFooter}>2020</Text>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#e8f6fc",
    paddingTop: 10,
    width: "100%",
    height: Dimensions.get("screen").height - 50,
  },
  logoView: {
    width: "80%",
    top: 80,
    alignItems: "center",
  },
  logo: {
    height: 70,
    width: 350,
    marginBottom: 70,
  },
  title: {
    position: "relative",
    fontSize: 22,
    paddingTop: 80,
    maxWidth: 270,
    fontFamily: "MPLUSRounded1c_700Bold",
    textAlign: "center",
    color: "#003A61",
  },
  userPicker: {
    position: "absolute",
    textAlign: "center",
    backgroundColor: "blue",
    width: "100%",
    top: 120,
  },
  pickerWrap: {
    height: 45,
    top: 100,
    flexDirection: "row",
    width: "60%",
    height: 45,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#C9C9C9",
    justifyContent: "center",
  },
  pickerTitle: {
    top: -25,
    color: "#003A61",
    fontWeight: "bold",
    left: 110,
  },
  userPicker: {
    top: 0,
    left: -60,
    height: 45,
    width: "100%",
    borderRadius: 5,
  },
  userSelectionTitle: {
    color: "#003A61",
    fontFamily: "MPLUSRounded1c_500Medium",
    textAlign: "center",
    fontSize: 20,
    bottom: 10,
  },
  userCntBtn: {
    backgroundColor: "#003A61",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    top: 160,
  },
  userCntBtnTitle: {
    color: "white",
    fontFamily: "MPLUSRounded1c_700Bold",
    fontSize: 18,
  },
  infoFooter: {
    color: "white",
    position: "absolute",
    bottom: 5,
    fontFamily: "MPLUSRounded1c_700Bold",
  },
});
