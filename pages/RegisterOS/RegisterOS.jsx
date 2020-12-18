import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AwesomeAlert from "react-native-awesome-alerts";

import logo from "../../assets/logo2.png";
import readCodeLogo from "../../assets/phone.png";

import api from "../../services/api";

import { Picker } from "@react-native-picker/picker";
import { eq } from "react-native-reanimated";

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
  const [postData, setPostData] = useState({
    codEqp: "",
    desAnm: "",
    tipOsv: 1,
    desEqp: "",
  });
  const [newAlert, setNewAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("Erro!");
  const [eqpList, setEqpList] = useState();
  const [newEqpList, setNewEqpList] = useState([]);
  const [eqp, setEqp] = useState({
    cod: "",
    name: "",
  });
  const [completed, setCompleted] = useState(false);

  const eqpArray = [];

  const navigation = useNavigation();

  const showAlert = () => {
    setNewAlert(true);
  };

  const hideAlert = () => {
    setNewAlert(false);
  };

  const handleApiPopulateName = () => {
    //<----------------

    const newArray = [];
    api
      .get("/api/allEqps")
      .then(function (response) {
        setEqpList(response.data.data.rows);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});

    for (let eqp in eqpList) {
      eqpArray.push(eqpList[eqp]);
    }

    for (let user of eqpArray) {
      newArray.push({
        cod: user[0],
        name: user[1],
      });

      setNewEqpList(newArray);
    }
    for (let i of newArray) {
      if (i.cod.trim() == code.trim()) {
        setCode(i.cod.toString());
        setName(i.name.toString());
      }
    }
  };

  useEffect(() => {
    let dataCode = route.params;
    if (dataCode !== undefined) {
      let result = "";
      for (let i in dataCode) {
        result += dataCode[i];
      }
      setCode(result);
      setPostData({
        codEqp: result,
        desAnm: postData.desAnm,
        tipOsv: postData.tipOsv,
        desEqp: postData.desEqp,
      });
    }
  }, [route]);

  useEffect(() => {
    setCode(code);
    handleApiPopulateName();
  }, [code]);

  const handleScanner = () => {
    navigation.navigate("scanner", "register");
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

  const RenderAlert = () => {
    return (
      <AwesomeAlert
        show={newAlert}
        showProgress={false}
        title="Aviso"
        message={alertMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="  Ok  "
        confirmButtonColor="#003A61"
        onCancelPressed={() => {
          hideAlert();
        }}
        onConfirmPressed={() => {
          hideAlert();
          if (completed) {
            navigation.navigate("Landing");
          }
        }}
      />
    );
  };

  const handlePostData = () => {
    if (isNaN(user.cod) || user.cod === "") {
      setAlertMessage("ERRO: Código do usuário não informado");
      showAlert();
      return;
    }

    if (
      postData.codEqp === "" ||
      postData.codEqp === null ||
      postData.codEqp === undefined
    ) {
      setAlertMessage("Código do equipamento não informado!");
      showAlert();
      return;
    }

    if (postData.desEqp.length < 1) {
      setAlertMessage("Descrição da anomalia não informada!");
      showAlert();
      return;
    }

    if (isNaN(postData.tipOsv) || postData.tipOsv === "") {
      setAlertMessage("Tipo da O.S não informado!");
      showAlert();
      return;
    }

    api
      .post(
        `/api/newos/${user.cod}/${postData.codEqp}/${postData.desEqp}/${postData.tipOsv}/${postData.desAnm}`
      )
      .then(function (response) {
        setAlertMessage("O.S Gravada com sucesso!");
        setCompleted(true);
        showAlert();
      })
      .catch(function (error) {
        setAlertMessage("Erro ao gravar");
        showAlert();
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={{ width: "100%" }}
      >
        <View style={styles.logoView}>
          <Image source={logo} style={styles.logo}></Image>
        </View>
        <Text style={styles.title}>REGISTRAR NOVA O.S.</Text>
        <TextInput style={styles.input}></TextInput>
        <View style={styles.pickerWrap}>
          <Text style={styles.pickerTitle}>Tipo</Text>
          <Picker
            selectedValue={priorityValue}
            style={styles.priorityPicker}
            onValueChange={(itemValue, itemIndex) => {
              setPriorityValue(itemValue);
              setPostData({
                codEqp: postData.codEqp,
                desEqp: postData.desEqp,
                tipOsv: itemValue,
                desAnm: postData.desAnm,
              });
            }}
          >
            <Picker.Item label="Normal" value="1" />
            <Picker.Item label="Normal Urgente" value="2" />
            <Picker.Item label="Imediato" value="3" />
            <Picker.Item label="Urgente Não Imediato" value="4" />
          </Picker>
        </View>

        <View style={styles.readCodWrap}>
          <Text style={styles.inputTitle}>Código</Text>
          <TextInput
            style={styles.newOSInput}
            value={code}
            autoCapitalize={"characters"}
            onChangeText={(text) => {
              setCode(text);
              setPostData({
                codEqp: text,
                desAnm: postData.desAnm,
                tipOsv: postData.tipOsv,
                desEqp: postData.desEqp,
              });
            }}
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
          <Text style={styles.eqTitle}>Nome</Text>
          <TextInput
            style={styles.nameEqInput}
            onChangeText={(text) => {
              setName(text);
              setPostData({
                codEqp: postData.codEqp,
                desAnm: postData.desAnm,
                tipOsv: postData.tipOsv,
                desEqp: text,
              });
            }}
            value={name}
          ></TextInput>
        </View>

        <View style={styles.descWrap}>
          <Text style={styles.descTitle}>Descrição</Text>
          <TextInput
            multiline={true}
            numberOfLines={10}
            autoCapitalize={"sentences"}
            style={styles.descInput}
            onChangeText={(text) => {
              setDesc(text);
              setPostData({
                codEqp: postData.codEqp,
                desAnm: text,
                tipOsv: postData.tipOsv,
                desEqp: postData.desEqp,
              });
            }}
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
                handlePostData();
              }}
            >
              <Text style={styles.saveBtnTitle}>REGISTRAR</Text>
            </RectButton>
          </View>
        </View>
        {<RenderAlert />}
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
    height: Dimensions.get("screen").height,
  },
  logoView: {
    width: "90%",
    top: 30,
    alignItems: "center",
  },
  logo: {
    height: 60,
    width: 322,
    marginBottom: 50,
  },
  title: {
    paddingVertical: 35,
    color: "#003A61",
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 10,
  },

  pickerWrap: {
    height: 45,
    flexDirection: "row",
    width: "80%",
    height: 45,
    bottom: 40,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#C9C9C9",
    flexDirection: "column",
  },
  pickerTitle: {
    color: "#003A61",
    top: -20,
    fontWeight: "bold",
  },
  priorityPicker: {
    top: -20,
    height: 45,
    width: "100%",
    borderRadius: 5,
    left: 0,
  },

  readCodWrap: {
    backgroundColor: "white",
    height: 45,
    width: "80%",
    borderRadius: 5,
    bottom: 10,
    borderWidth: 1,
    borderColor: "#C9C9C9",
  },
  inputTitle: {
    color: "#003A61",
    fontWeight: "bold",
    top: -20,
  },
  newOSInput: {
    height: 45,
    left: 5,
    width: "100%",
    bottom: 20,
  },
  readCodeBtn: {
    position: "absolute",
    right: 3,
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
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#C9C9C9",
  },
  eqTitle: {
    fontWeight: "bold",
    color: "#003A61",
    top: -20,
  },
  nameEqInput: {
    height: 45,
    width: "95%",
    top: -20,
    left: 8,
  },
  descWrap: {
    backgroundColor: "white",
    height: 145,
    width: "80%",
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#C9C9C9",
    alignItems: "center",
  },
  descTitle: {
    color: "#003A61",
    top: -82,
    fontWeight: "bold",
  },
  descInput: {
    left: -35,
    width: "95%",
    top: 15,
    height: 140,
    alignSelf: "flex-start",
    textAlignVertical: "top",
  },
  btnView: {
    alignItems: "center",
    width: "50%",
    top: -10,
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
