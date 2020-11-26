import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { TextInput, Image, StyleSheet, Text, View } from "react-native";

import logo from "../../assets/logo.png";

import readCodeLogo from "../../assets/phone.png";

export default function RegisterOS({ route }) {
  const [code, setCode] = useState(" ");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
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
      <Text style={styles.title}>REGISTAR NOVA O.S.</Text>
      <View style={styles.readCodWrap}>
        <Text style={styles.inputTitle}>Código do Equipamento</Text>
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
          <View style={styles.imgView}>
            <Image
              style={styles.logoRead}
              onPress={() => {
                handleScanner();
              }}
              source={readCodeLogo}
            ></Image>
          </View>
        </RectButton>
      </View>
      <View style={styles.eqName}>
        <Text style={styles.eqTitle}>Nome do Equipamento</Text>
        <TextInput
          style={styles.nameEqInput}
          onChangeText={(text) => setName(text)}
          value={name}
        ></TextInput>
      </View>
      <View style={styles.descName}>
        <Text style={styles.descTitle}>Descrição do Problema</Text>
        <TextInput
          style={styles.descInput}
          onChangeText={(text) => setDesc(text)}
          value={desc}
        ></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 50,
  },
  title: {
    position: "absolute",
    paddingTop: 40,
    top: 100,
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
  },
  logo: {},
  readCodWrap: {
    position: "absolute",
    top: 220,
    flexDirection: "row",
    flexGrow: 50,
  },
  inputTitle: {
    position: "absolute",
    left: 80,
    top: -25,
  },
  newOSInput: {
    height: 55,
    width: 260,
    borderColor: "gray",
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 3,
  },
  imgView: {
    backgroundColor: "#D5DEFD",
    borderRadius: 3,
    borderColor: "gray",
    borderWidth: 1,
    height: 55,
    padding: 2,
  },
  logoRead: {
    top: 7,
    height: 35,
    width: 40,
    resizeMode: "stretch",
  },
  eqName: {
    position: "absolute",
    top: 350,
    flexDirection: "row",
    justifyContent: "center",
    flexGrow: 50,
  },
  eqTitle: {
    position: "absolute",
    textAlign: "center",
    top: -25,
  },
  nameEqInput: {
    height: 55,
    width: 305,
    borderColor: "gray",
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 3,
  },
  descName: {
    position: "absolute",
    top: 450,
    flexDirection: "row",
    justifyContent: "center",
    flexGrow: 50,
  },
  descTitle: {
    position: "absolute",
    textAlign: "center",
    top: -25,
  },
  descInput: {
    height: 200,
    width: 305,
    borderColor: "gray",
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 3,
  },
});
