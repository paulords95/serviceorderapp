import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import logo from "../../assets/logo.png";
import readCodeLogo from "../../assets/phone.png";
import arrow from "../../assets/arrow.png";

import { Picker } from "@react-native-picker/picker";

const RegisterOS = ({ route }) => {
  const [code, setCode] = useState(" ");
  const [enableShift, setEnableShift] = useState(false);
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [priorityValue, setPriorityValue] = useState();

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
  },
  logo: {
    left: "22%",
    top: "25%",
  },
  title: {
    paddingTop: 40,
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
    height: 40,
    bottom: 10,
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
    height: 40,
    width: "100%",
    borderRadius: 5,
    left: -34,
  },
  dropdownIcon: {
    position: "relative",
    width: 18,
    height: 19,
    top: 16,
    left: -30,
  },
  dropdownIconImg: {
    width: 15,
    height: 10,
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
    left: -30,
    width: 210,
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
    top: 3,
    height: 140,
    alignSelf: "flex-start",
    textAlign: "left",
    textAlignVertical: "top",
  },
});

export default RegisterOS;
