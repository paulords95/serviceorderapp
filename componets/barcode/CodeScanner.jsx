import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RectButton } from "react-native-gesture-handler";

export default function App({ route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const navigation = useNavigation();
  const handleBack = (data) => {
    if (route.params == "register") {
      navigation.navigate("registerOS", data);
    } else {
      navigation.navigate("checkOS", data);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    handleBack(data);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.acessDenied}>
        <Text style={styles.acessDeniedText}>Solictando acesso a câmera</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.acessDenied}>
        <Text style={styles.acessDeniedText}>Acesso a câmera foi negado</Text>
        <RectButton
          style={styles.backBtn}
          onPress={() => {
            handleBack();
          }}
        >
          <Text style={styles.backBtnTxt}>Voltar</Text>
        </RectButton>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  acessDenied: {
    flex: 1,
    backgroundColor: "#003A61",
    justifyContent: "center",
    alignItems: "center",
  },
  acessDeniedText: {
    color: "white",
  },
  backBtn: {
    backgroundColor: "#9871f5",
    padding: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    top: 130,
  },
  backBtnTxt: {
    color: "white",
  },
});
