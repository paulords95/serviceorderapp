import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  TextInput,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  View,
  KeyboardAvoidingView,
} from "react-native";

import logo from "../../assets/logo_quim.png";

import readCodeLogo from "../../assets/phone.png";

import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterOS({ route }) {
  const [code, setCode] = useState(" ");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [enableShift, setEnableShift] = useState(false);
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

  const getUser = async (value) => {
    try {
      const jsonValue = await AsyncStorage.getItem(value);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        enabled={enableShift}
        style={styles.container}
      >
        <Image source={logo} style={styles.logo}></Image>
        <Text style={styles.title}>REGISTRAR NOVA O.S.</Text>
        <View style={styles.readCodWrap}>
          <Text style={styles.inputTitle}>Cód.: </Text>
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

        <View style={styles.eqNameWrap}>
          <Text style={styles.eqTitle}>Nome: </Text>
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
            onFocus={() => {
              setEnableShift(true);
            }}
          ></TextInput>
        </View>

        <View style={styles.btnView}>
          <RectButton
            style={styles.saveBtn}
            onPress={async () => {
              let user = await getUser("user");
              console.log(user);
            }}
          >
            <Text style={styles.saveBtnTitle}>Gravar</Text>
          </RectButton>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003A61",
    position: "relative",
    alignItems: "center",
  },
  avoidKeyboard: {
    flex: 1,
    backgroundColor: "#003A61",

    alignItems: "center",
  },
  title: {
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
    height: 130,
    width: 350,
    left: -15,
  },
  readCodWrap: {
    top: 150,
    flexDirection: "row",
    flexGrow: 50,
  },
  inputTitle: {
    color: "white",
    top: 10,
  },
  newOSInput: {
    height: 45,
    width: 240,
    left: 10,
    color: "white",
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
    height: 45,
    padding: 2,
  },
  logoRead: {
    top: 7,
    height: 35,
    width: 40,
    resizeMode: "stretch",
  },
  eqNameWrap: {
    top: -80,
    flexDirection: "row",
    flexGrow: 50,
  },
  eqTitle: {
    textAlign: "center",
    top: 5,
    color: "white",
  },
  nameEqInput: {
    height: 45,
    width: 280,
    borderColor: "gray",
    borderWidth: 1,
    color: "white",
    textAlign: "center",
    borderRadius: 3,
  },
  //descName: {
  //  top: 150,
  //  flexDirection: "row",
  //  justifyContent: "center",
  //  flexGrow: 50,
  //},
  //descTitle: {
  //  textAlign: "center",
  //  top: -25,
  //  color: "white",
  //},
  //descInput: {
  //  height: 200,
  //  color: "white",
  //  width: 305,
  //  borderColor: "gray",
  //  borderWidth: 1,
  //  textAlign: "center",
  //  borderRadius: 3,
  //},
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
