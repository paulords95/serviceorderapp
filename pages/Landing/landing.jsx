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
          navigation.navigate("checkOS");
        }}
      >
        <Text style={styles.camBtnTxtList}>CONSULTAR O.S.</Text>
      </RectButton>
      <View style={styles.footer}>
        <Text style={styles.userFooter}>
          Usuário conectado: <Text style={styles.loggedUser}>{user.name}</Text>
        </Text>
        <RectButton
          title="Desconectar"
          style={styles.dscntBtn}
          onPress={async () => {
            try {
              await AsyncStorage.removeItem("user");
            } catch (e) {
              console.log(e);
            }
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.dscntBtnTxt}>desconectar</Text>
        </RectButton>
      </View>
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
    width: "90%",
    top: 30,
    alignItems: "center",
  },
  logo: {
    height: 70,
    width: 350,
    marginBottom: 70,
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
  footer: {
    justifyContent: "center",
    position: "absolute",
    bottom: 25,
    alignItems: "center",
  },
  userFooter: {
    color: "black",
    fontFamily: "MPLUSRounded1c_500Medium",
  },
  loggedUser: {
    color: "#003A61",
  },
  dscntBtn: {
    top: 8,
    backgroundColor: "#606060",
    padding: 3,
    borderRadius: 3,
  },
  dscntBtnTxt: {
    color: "white",
    fontFamily: "MPLUSRounded1c_500Medium",
  },
});
