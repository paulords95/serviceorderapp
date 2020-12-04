import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

import logo from "../../assets/logo2.png";
import readCodeLogo from "../../assets/phone.png";

import { Picker } from "@react-native-picker/picker";

const RegisterOS = ({ route }) => {
  const [code, setCode] = useState(" ");
  const [enableShift, setEnableShift] = useState(false);
  const [user, setUser] = useState({
    cod: "",
    name: "",
  });
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [priorityValue, setPriorityValue] = useState();

  const navigation = useNavigation();

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

  const handleScanner = () => {
    navigation.navigate("scanner");
  };

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      const result = JSON.parse(jsonValue);
      setUser(result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView style={{ width: "100%" }}>
        <View style={styles.logoView}>
          <Image source={logo} style={styles.logo}></Image>
        </View>
        <Text style={styles.title}>REGISTRAR NOVA O.S.</Text>
        <TextInput style={styles.input}></TextInput>
        <View style={styles.pickerWrap}>
          <Text style={styles.pickerTitle}>Tipo: </Text>
          <Picker
            selectedValue={priorityValue}
            style={styles.priorityPicker}
            onValueChange={(itemValue, itemIndex) => {
              setPriorityValue(itemValue);
            }}
          >
            <Picker.Item label="Normal" value="1" />
            <Picker.Item label="Normal Urgente" value="2" />
            <Picker.Item label="Imediato" value="3" />
            <Picker.Item label="Urgente Não Imediato" value="4" />
          </Picker>
        </View>

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

        <View style={styles.descWrap}>
          <Text style={styles.descTitle}>Desc: </Text>
          <TextInput
            multiline={true}
            numberOfLines={10}
            autoCapitalize={"sentences"}
            style={styles.descInput}
            onChangeText={(text) => setDesc(text)}
            value={desc}
            onFocus={() => {
              setEnableShift(true);
            }}
          ></TextInput>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            paddingTop: 20,
          }}
        >
          <View style={styles.btnView}>
            <RectButton
              style={styles.saveBtn}
              onPress={() => {
                console.log(user);
              }}
            >
              <Text style={styles.saveBtnTitle}>REGISTRAR</Text>
            </RectButton>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#e8f6fc",
    paddingTop: 10,
  },
  logoView: {
    width: "100%",
    top: 20,
    alignItems: "center",
  },
  logo: {
    height: 90,
    width: 292,
  },
  title: {
    paddingVertical: 40,
    color: "#003A61",
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
  },

  pickerWrap: {
    height: 45,
    flexDirection: "row",
    left: 50,
    width: "80%",
    height: 45,
    bottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#C9C9C9",
  },
  pickerTitle: {
    color: "#003A61",
    left: -35,
    paddingTop: 10,
  },
  priorityPicker: {
    top: 0,
    height: 45,
    width: "100%",
    borderRadius: 5,
    left: -34,
  },

  readCodWrap: {
    backgroundColor: "white",
    height: 45,
    width: "80%",
    borderRadius: 5,
    flexDirection: "row",
    left: 50,
    borderWidth: 1,
    borderColor: "#C9C9C9",
  },
  inputTitle: {
    color: "#003A61",
    left: -36,
    paddingTop: 10,
  },
  newOSInput: {
    height: 45,
    left: -30,
    width: 260,
  },
  readCodeBtn: {
    position: "absolute",
    right: 5,
    height: 45,
    borderRadius: 5,
    alignContent: "center",
  },
  logoRead: {
    width: 35,
    top: 5,
    height: 35,
  },
  eqNameWrap: {
    backgroundColor: "white",
    height: 45,
    width: "80%",
    borderRadius: 5,
    flexDirection: "row",
    left: 50,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#C9C9C9",
  },
  eqTitle: {
    color: "#003A61",
    left: -45,
    top: 10,
  },
  nameEqInput: {
    height: 45,
    left: -35,
    width: 300,
  },
  descWrap: {
    backgroundColor: "white",
    height: 145,
    width: "80%",
    borderRadius: 5,
    flexDirection: "row",
    left: 50,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#C9C9C9",
  },
  descTitle: {
    color: "#003A61",
    left: -40,
    top: 50,
  },
  descInput: {
    left: -35,
    width: "98%",
    top: 5,
    height: 140,
    alignSelf: "flex-start",
    textAlign: "center",
    textAlignVertical: "top",
  },
  btnView: {
    alignItems: "center",
    width: "50%",
  },
  saveBtn: {
    backgroundColor: "#003A61",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  saveBtnTitle: {
    textAlign: "center",
    color: "white",
    fontFamily: "MPLUSRounded1c_700Bold",
    fontSize: 18,
  },
});

export default RegisterOS;
