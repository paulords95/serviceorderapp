import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { AppLoading } from "expo";
import { RectButton } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  MPLUSRounded1c_100Thin,
  MPLUSRounded1c_300Light,
  MPLUSRounded1c_400Regular,
  MPLUSRounded1c_500Medium,
  MPLUSRounded1c_700Bold,
  MPLUSRounded1c_800ExtraBold,
  MPLUSRounded1c_900Black,
  useFonts,
} from "@expo-google-fonts/m-plus-rounded-1c";

import logo from "../../assets/logo_quim.png";

export default function Landing() {
  const navigation = useNavigation();
  const [user, setUser] = useState();

  const handleLogin = (usr) => {
    navigation.navigate("Landing", usr);
  };

  let [fontsLoaded, error] = useFonts({
    MPLUSRounded1c_700Bold,
    MPLUSRounded1c_500Medium,
    MPLUSRounded1c_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo}></Image>
        <Text style={({ fontFamily: "MPLUSRounded1c_700Bold" }, styles.title)}>
          QUIMTIA MANUTENÇÃO
        </Text>
        <StatusBar style="auto" />
        <View style={styles.userSelectionView}>
          <Text style={styles.userSelectionTitle}>Selecione o usuário</Text>
          <Text style={styles.pickerWrap}>
            <Picker
              selectedValue={user}
              style={styles.userPicker}
              onValueChange={(itemValue, itemIndex) => setUser(itemValue)}
            >
              <Picker.Item label="Selecionar" value="0" />
              <Picker.Item label="paulo.silva" value="paulo.silva" />
              <Picker.Item label="mecanico.um" value="mecanico.um" />
              <Picker.Item label="eletricista.um" value="eletricista.um" />
              <Picker.Item label="eletricista.um" value="eletricista.um" />
            </Picker>
            <View style={styles.dropdownIcon}>
              <Text style={styles.dropdownIconText}>V</Text>
            </View>
          </Text>
        </View>
        <RectButton
          style={styles.userCntBtn}
          onPress={() => {
            if (user === "0") {
              return;
            } else {
              handleLogin(user);
            }
          }}
        >
          <Text style={styles.userCntBtnTitle}>Conectar</Text>
        </RectButton>
        <Text style={styles.infoFooter}>2020</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003A61",
    alignItems: "center",
    paddingTop: 120,
  },
  logo: {
    flex: 1,
    position: "absolute",
    top: 50,
    left: -10,
    height: 150,
    width: 420,
  },
  title: {
    position: "relative",
    fontSize: 22,
    paddingTop: 130,
    maxWidth: 270,
    fontFamily: "MPLUSRounded1c_700Bold",
    textAlign: "center",
    color: "white",
  },
  userPicker: {
    flexDirection: "row",
    textAlign: "center",
    backgroundColor: "white",
    width: 200,
  },
  userSelectionView: {
    top: 80,
  },
  pickerWrap: {
    top: 10,
    backgroundColor: "white",
    height: 50,
  },
  dropdownIcon: {
    width: 20,
    height: 35,
  },
  dropdownIconText: {
    fontFamily: "MPLUSRounded1c_800ExtraBold",
  },
  userSelectionTitle: {
    color: "white",
    fontFamily: "MPLUSRounded1c_500Medium",
    textAlign: "center",
    fontSize: 20,
    bottom: 10,
  },
  userCntBtn: {
    backgroundColor: "#9871f5",
    padding: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    top: 200,
  },
  userCntBtnTitle: {
    color: "white",
    fontFamily: "MPLUSRounded1c_700Bold",
    fontSize: 18,
  },
  infoFooter: {
    color: "white",
    position: "absolute",
    bottom: 5,
    fontFamily: "MPLUSRounded1c_700Bold",
  },
});
