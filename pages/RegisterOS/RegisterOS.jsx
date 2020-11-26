import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { TextInput, Image, StyleSheet, Text, View } from "react-native";

import logo from "../../assets/logo.png";
export default function RegisterOS({ route }) {
  const [code, setCode] = useState(" ");
  const navigation = useNavigation();

  const handleScanner = () => {
    navigation.navigate("scanner");
  };

  useEffect(() => {
    let dataCode = route.params;
    if (dataCode !== undefined) {
      let result = "";
      for (let i in dataCode) {
        result += dataCode[i];
      }
      setCode(result.toString());
    }
  }, [route]);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo}></Image>
      <View style={styles.readCodWrap}>
        <Text style={styles.title}>Registrar Nova OS</Text>
        <TextInput
          style={styles.newOSInput}
          value={code.toString()}
        ></TextInput>
        <RectButton
          onPress={() => {
            handleScanner();
          }}
          style={styles.readCodeBtn}
        >
          <Text style={styles.readCodeBtnTxt}>Ler Cód</Text>
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  title: {
    position: "absolute",
    paddingTop: 40,
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
  },
  readCodeBtn: {
    alignContent: "center",
    backgroundColor: "dodgerblue",
    height: 30,
    width: 70,
    top: 10,
    padding: 8,
    borderRadius: 3,
  },
  readCodeBtnTxt: {
    color: "white",
    fontWeight: "bold",
  },
  logo: {},
  readCodWrap: {
    paddingTop: 80,
    flex: 1,
    alignItems: "center",
  },
  newOSInput: {
    height: 30,
    width: 180,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 3,
  },
});
