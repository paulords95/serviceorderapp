import { StatusBar } from "expo-status-bar";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { Button, Image, StyleSheet, Text, View } from "react-native";

import logo from "../assets/logo.png";

export default function Landing() {
  const navigation = useNavigation();

  const handleOpenCamera = () => {
    navigation.navigate("Codebar");
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
          handleOpenCamera();
        }}
      >
        <Text style={styles.camBtnTxt}>Abrir leitor de códigos de barras</Text>
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
    fontSize: 25,
    paddingTop: 130,
    maxWidth: 250,
    textAlign: "center",

    fontWeight: "bold",
  },

  camBtn: {
    height: 50,
    width: "58%",
    backgroundColor: "#9871f5",
    borderRadius: 8,
    padding: 15,
    top: 35,
    alignContent: "center",
    justifyContent: "space-between",
  },
  camBtnTxt: {
    fontWeight: "bold",
    color: "white",
  },
});
