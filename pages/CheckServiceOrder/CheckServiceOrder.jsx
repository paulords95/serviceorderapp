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

import LastServiceOrder from "../../componets/LastServiceOrder/LastSeviceOrder";
import api from "../../services/api";
import SearchEquipament from "../../componets/searchEquipament/searchEquipament";

const CheckServiceOrder = ({ route }) => {
  const [code, setCode] = useState(" ");
  const [name, setName] = useState("");
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const [postData, setPostData] = useState({
    codEqp: "",
    desEqp: "",
    tipOsv: 1,
  });
  const [lastFive, setLastFive] = useState([]);
  const [codeBool, setCodeBool] = useState(false);
  const [searchBool, setSearchBool] = useState(false);
  const [lastOs, setLastOs] = useState({
    nameEqp: "",
    date: "",
    anomaly: "",
  });
  const [searchOs, setSearchOs] = useState({
    nameEqp: "",
    date: "",
    anomaly: "",
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

  useEffect(() => {
    api
      .get("/api/lastos")
      .then((res) => {
        setLastOs({
          nameEqp: res.data.nameEqp,
          date: res.data.date,
          anomaly: res.data.anomaly,
        });
        setItemsLoaded(true);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleApiPopulateSearch = (codSearch) => {
    api
      .get(`/api/geteqpbycode/${codSearch}`)
      .then(function (response) {
        setSearchOs({
          nameEqp: response.data[0].name,
          date: response.data[0].date,
          anomaly: response.data[0].anomaly,
        });
        setSearchBool(true);
        setCodeBool(false);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  };

  useEffect(() => {
    if (code.length > 1) {
      setCodeBool(true);
      setItemsLoaded(false);
    } else {
      setCodeBool(false);
      setItemsLoaded(true);
    }
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ alignItems: "center" }}
          style={{ width: "100%", height: "100%" }}
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

          {codeBool ? (
            <>
              {searchBool ? (
                <SearchEquipament
                  name={searchOs.nameEqp}
                  date={searchOs.date}
                  description={searchOs.anomaly}
                />
              ) : (
                <RectButton>
                  <Text
                    style={styles.searchBtnTxt}
                    onPress={() => {
                      handleApiPopulateSearch(code);
                    }}
                  >
                    Buscar
                  </Text>
                </RectButton>
              )}
            </>
          ) : (
            <></>
          )}

          {itemsLoaded ? (
            <LastServiceOrder
              name={lastOs.nameEqp}
              date={lastOs.date}
              description={lastOs.anomaly}
            />
          ) : (
            <></>
          )}

          {/*<RectButton style={styles.backBtn}>
            <Text
              style={styles.backBtnTxt}
              onPress={() => {
                navigation.navigate("Landing");
              }}
            >
              Voltar
            </Text>
          </RectButton>*/}
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
  },
  logoView: {
    width: "90%",
    top: 30,
    alignItems: "center",
  },
  logo: {
    height: 70,
    width: 350,
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

  listTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontFamily: "MPLUSRounded1c_700Bold",
    fontSize: 18,
  },
  listWrap: {
    flex: 1,
    flexDirection: "row",
  },
  listTitle1: {
    marginHorizontal: 50,
    fontFamily: "MPLUSRounded1c_500Medium",
  },
  listTitle2: {
    marginHorizontal: 50,
    fontFamily: "MPLUSRounded1c_500Medium",
  },
  olderItemWrap: {
    flex: 1,
    paddingTop: 5,
    width: "90%",
    height: "100%",
  },
  searchBtnTxt: {
    backgroundColor: "#9871f5",
    color: "white",
    fontFamily: "MPLUSRounded1c_500Medium",
    fontSize: 18,
    padding: 5,
    borderRadius: 3,
  },
  backBtn: {
    backgroundColor: "#9871f5",
    marginTop: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
    bottom: 20,
  },
  backBtnTxt: {
    color: "white",
    fontFamily: "MPLUSRounded1c_500Medium",
    fontSize: 18,
  },
});

export default CheckServiceOrder;
