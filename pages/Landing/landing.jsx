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

import logo from "../../assets/logo_quim.png";

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
      <Image source={logo} style={styles.logo}></Image>
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
        <Text style={styles.camBtnTxt}>Registrar Nova O.S.</Text>
      </RectButton>
      <RectButton
        title="Ler código de barras"
        style={styles.camBtnList}
        onPress={() => {
          alert("Lista de OS");
        }}
      >
        <Text style={styles.camBtnTxtList}>Consultar O.S.</Text>
      </RectButton>
      <Text style={styles.userFooter}>Usuário conectado: {user.name} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003A61",
    alignItems: "center",
    paddingTop: 80,
  },
  logo: {
    flex: 1,
    position: "absolute",
    top: 50,
    left: -10,
    height: 150,
    width: 420,
  },
  title: {
    position: "relative",
    fontSize: 20,
    paddingTop: 130,
    maxWidth: 270,
    textAlign: "center",
    color: "white",
    fontFamily: "MPLUSRounded1c_700Bold",
  },

  camBtn: {
    height: 50,
    width: "40%",
    backgroundColor: "#9871f5",
    borderRadius: 8,
    padding: 15,
    top: 60,
    alignContent: "center",
    justifyContent: "space-between",
  },
  camBtnTxt: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
  },
  camBtnList: {
    height: 50,
    justifyContent: "center",
    width: "40%",
    backgroundColor: "#9871f5",
    borderRadius: 8,
    padding: 15,
    top: 70,
    alignContent: "center",
    justifyContent: "space-between",
  },
  camBtnTxtList: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  userFooter: {
    color: "white",
    position: "absolute",
    bottom: 5,
    fontFamily: "MPLUSRounded1c_500Medium",
  },
});
