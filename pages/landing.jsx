import { StatusBar } from "expo-status-bar";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { Button, Image, StyleSheet, Text, View } from "react-native";

import logo from "../assets/logo.png";

export default function Landing() {
  const navigation = useNavigation();

  const handleRegisterOS = () => {
    navigation.navigate("registerOS");
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo}></Image>
      <Text style={styles.title}>
        Registro de Ordens de Serviço de Manutenção
      </Text>
      <StatusBar style="auto" />
      <RectButton
        title="Ler código de barras"
        style={styles.camBtn}
        onPress={() => {
          handleRegisterOS();
        }}
      >
        <Text style={styles.camBtnTxt}>Registrar Nova OS</Text>
      </RectButton>
      <RectButton
        title="Ler código de barras"
        style={styles.camBtnList}
        onPress={() => {
          alert("Lista de OS");
        }}
      >
        <Text style={styles.camBtnTxtList}>Consultar OS</Text>
      </RectButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 80,
  },
  logo: {
    flex: 1,
    position: "absolute",
    top: 100,
  },
  title: {
    position: "relative",
    fontSize: 22,
    paddingTop: 130,
    maxWidth: 270,
    textAlign: "center",

    fontWeight: "bold",
  },

  camBtn: {
    height: 50,
    width: "38%",
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
    width: "38%",
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
});
