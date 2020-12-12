import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { AppLoading } from "expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  MPLUSRounded1c_500Medium,
  MPLUSRounded1c_700Bold,
  MPLUSRounded1c_400Regular,
  useFonts,
} from "@expo-google-fonts/m-plus-rounded-1c";

import logo from "../../assets/logo2.png";
import readCodeLogo from "../../assets/phone.png";

import OlderItem from "../../componets/OlderItem/OlderItem";

const CheckServiceOrder = ({ route }) => {
  const [code, setCode] = useState(" ");
  const [postData, setPostData] = useState({
    codEqp: "",
    desEqp: "",
    tipOsv: 1,
  });
  const navigation = useNavigation();

  let [fontsLoaded, error] = useFonts({
    MPLUSRounded1c_700Bold,
    MPLUSRounded1c_500Medium,
    MPLUSRounded1c_400Regular,
  });

  const handleScanner = () => {
    navigation.navigate("scanner", "check");
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
        desEqp: postData.desEqp,
        tipOsv: postData.tipOsv,
      });
    }
  }, [route]);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ alignItems: "center" }}
          style={{ width: "100%" }}
        >
          <View style={styles.logoView}>
            <Image source={logo} style={styles.logo}></Image>
          </View>
          <Text style={styles.title}>CONSULTAR EQUIPAMENTO</Text>

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
                  desEqp: postData.desEqp,
                  tipOsv: postData.tipOsv,
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
          <View style={styles.containerWrap}>
            <View style={styles.eqpInfoWrap}>
              <Text style={styles.infoTitle}>Nome</Text>
              <Text style={styles.dataText}>name placeholder</Text>
            </View>
            <View style={styles.eqpInfoData}>
              <Text style={styles.infoTitle}>Data de registro</Text>
              <Text style={styles.dataText}>20/12/2020</Text>
            </View>
          </View>
          <View style={styles.descriptionWrap}>
            <Text style={styles.eqpDescription}>Descrição</Text>
            <Text style={styles.eqpDescriptionText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>

          <Text style={styles.listTitle}>Ordens de serviço anteriores</Text>
          <View style={styles.listWrap}>
            <Text style={styles.listTitle1}>Descrição</Text>
            <Text style={styles.listTitle2}>Data</Text>
          </View>
          <View style={styles.olderItemWrap}>
            <OlderItem
              desc="consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua."
              date="02/12/2020"
            />
            <OlderItem
              desc="consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua."
              date="02/12/2020"
            />
            <OlderItem
              desc="consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua."
              date="02/12/2020"
            />
            <OlderItem
              desc="consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua."
              date="02/12/2020"
            />
            <OlderItem
              desc="consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua."
              date="02/12/2020"
            />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
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
    paddingVertical: 10,
    color: "#003A61",
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 30,
    fontFamily: "MPLUSRounded1c_700Bold",
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
  containerWrap: {
    flex: 1,
    flexDirection: "row",
  },
  infoTitle: {
    fontFamily: "MPLUSRounded1c_700Bold",
    paddingHorizontal: 30,
    textAlign: "center",
  },
  dataText: {
    fontFamily: "MPLUSRounded1c_400Regular",
    textAlign: "center",
    marginHorizontal: 20,
  },
  descriptionWrap: {
    marginTop: 40,
  },
  eqpDescription: {
    fontFamily: "MPLUSRounded1c_700Bold",

    textAlign: "center",
  },
  eqpDescriptionText: {
    marginTop: 0,
    maxWidth: "80%",
    textAlign: "center",
    fontFamily: "MPLUSRounded1c_400Regular",
  },
  listTitle: {
    marginTop: 40,
    marginBottom: 10,
    fontFamily: "MPLUSRounded1c_700Bold",
    fontSize: 18,
  },
  listWrap: {
    flex: 1,
    flexDirection: "row",
  },
  listTitle1: {
    marginHorizontal: 70,
    fontFamily: "MPLUSRounded1c_500Medium",
  },
  listTitle2: {
    marginHorizontal: 70,
    fontFamily: "MPLUSRounded1c_500Medium",
  },
  olderItemWrap: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 30,
  },
});

export default CheckServiceOrder;
