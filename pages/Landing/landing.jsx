import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RectButton } from "react-native-gesture-handler";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import {
  MPLUSRounded1c_100Thin,
  MPLUSRounded1c_300Light,
  MPLUSRounded1c_400Regular,
  MPLUSRounded1c_500Medium,
  MPLUSRounded1c_700Bold,
  MPLUSRounded1c_800ExtraBold,
  MPLUSRounded1c_900Black,
  useFonts,
} from "@expo-google-fonts/m-plus-rounded-1c";

import logo from "../../assets/logo2.png";

export default function Landing() {
  const [user, setUser] = useState({
    cod: "",
    name: "",
  });

  let [fontsLoaded, error] = useFonts({
    MPLUSRounded1c_700Bold,
    MPLUSRounded1c_500Medium,
  });

  const getUser = async (value) => {
    try {
      const jsonValue = await AsyncStorage.getItem(value);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  const setLoggedUser = async () => {
    let usr = await getUser("user");
    setUser(usr);
  };

  useEffect(() => {
    setLoggedUser();
  }, []);

  const navigation = useNavigation();

  const handleRegisterOS = (user) => {
    navigation.navigate("registerOS", user);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoView}>
        <Image source={logo} style={styles.logo}></Image>
      </View>
      <Text style={styles.title}>
        REGISTRO DE ORDENS DE SERVIÇO DE MANUTENÇÃO
      </Text>
      <StatusBar style="auto" />
      <RectButton
        title="Ler código de barras"
        style={styles.camBtn}
        onPress={() => {
          handleRegisterOS();
        }}
      >
        <Text style={styles.camBtnTxt}>REGISTRAR NOVA O.S.</Text>
      </RectButton>
      <RectButton
        title="Ler código de barras"
        style={styles.camBtnList}
        onPress={() => {
          alert("Lista de OS");
        }}
      >
        <Text style={styles.camBtnTxtList}>CONSULTAR O.S.</Text>
      </RectButton>
      <Text style={styles.userFooter}>Usuário conectado: {user.name} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8f6fc",
    alignItems: "center",
    paddingTop: 50,
  },
  logoView: {
    width: "100%",
    alignItems: "center",
  },
  logo: {
    height: 90,
    width: 292,
  },
  title: {
    position: "relative",
    fontSize: 20,
    paddingTop: 30,
    maxWidth: 270,
    textAlign: "center",
    color: "#003A61",
    fontFamily: "MPLUSRounded1c_700Bold",
  },

  camBtn: {
    height: 50,
    width: "60%",
    backgroundColor: "#9871f5",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginHorizontal: 30,
    top: 60,
    textAlign: "center",
  },
  camBtnTxt: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    fontSize: 15,
  },
  camBtnList: {
    height: 50,
    width: "60%",
    backgroundColor: "#9871f5",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginHorizontal: 30,
    top: 80,
    textAlign: "center",
  },
  camBtnTxtList: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  userFooter: {
    color: "#003A61",
    position: "absolute",
    bottom: 30,
    fontFamily: "MPLUSRounded1c_500Medium",
  },
});
