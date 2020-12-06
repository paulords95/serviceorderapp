import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import { StyleSheet, Text, View, BackHandler } from "react-native";
import {
  MPLUSRounded1c_500Medium,
  MPLUSRounded1c_700Bold,
  useFonts,
} from "@expo-google-fonts/m-plus-rounded-1c";

export default function ConnectionError(props) {
  let [fontsLoaded, error] = useFonts({
    MPLUSRounded1c_700Bold,
    MPLUSRounded1c_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.errMsg}>
          Erro ao estabelecer comunicação com o banco de dados!
        </Text>
        <Text style={styles.errDesc}>
          Verifique se você está conectado a rede sem fio Quimtia e tente
          novamente. Se o erro persistir, entre em contato com a equipe de TI.
        </Text>
        {props.tryAgain}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003A61",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 70,
  },

  errMsg: {
    color: "white",
    fontFamily: "MPLUSRounded1c_700Bold",
    width: "80%",
    textAlign: "center",
    paddingTop: 50,
    fontSize: 20,
  },
  errDesc: {
    color: "white",
    fontFamily: "MPLUSRounded1c_500Medium",
    width: "80%",
    textAlign: "center",
    paddingTop: 50,
    fontSize: 16,
  },
  exitBtn: {
    backgroundColor: "#0085CB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    top: 50,
    borderRadius: 5,
  },
  exitBtnTxt: {
    color: "white",
    fontFamily: "MPLUSRounded1c_700Bold",
    width: "80%",
  },
});
