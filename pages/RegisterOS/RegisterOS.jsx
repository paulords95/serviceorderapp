import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import {
  TextInput,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  View,
  KeyboardAvoidingView,
} from "react-native";

import logo from "../../assets/logo_quim.png";

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
    <KeyboardAvoidingView style={styles.container}>
      <Image source={logo} style={styles.logo}></Image>
      <Text style={styles.title}>REGISTRAR NOVA O.S.</Text>
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
      <View style={styles.btnView}>
        <RectButton style={styles.saveBtn} onPress={() => [alert("Salvo")]}>
          <Text style={styles.saveBtnTitle}>Gravar</Text>
        </RectButton>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003A61",
    alignItems: "center",
    paddingTop: 50,
  },
  title: {
    position: "absolute",
    paddingTop: 40,
    top: 100,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
  },
  logo: {
    flex: 1,
    position: "absolute",
    top: 10,
    left: 0,
    height: 130,
    width: 400,
  },
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
    color: "white",
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
    color: "white",
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
    color: "white",
  },
  descInput: {
    height: 200,
    width: 305,
    borderColor: "gray",
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 3,
  },
  btnView: {
    top: Math.round(Dimensions.get("window").height) - 150,
  },
  saveBtn: {
    backgroundColor: "#9871f5",
    padding: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  saveBtnTitle: {
    color: "white",
    fontFamily: "MPLUSRounded1c_700Bold",
    fontSize: 18,
  },
});
