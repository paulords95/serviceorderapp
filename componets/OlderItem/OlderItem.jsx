import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import { StyleSheet, Text, View, BackHandler } from "react-native";
import {
  MPLUSRounded1c_500Medium,
  MPLUSRounded1c_700Bold,
  useFonts,
} from "@expo-google-fonts/m-plus-rounded-1c";

export default function OlderItem(props) {
  let [fontsLoaded, error] = useFonts({
    MPLUSRounded1c_700Bold,
    MPLUSRounded1c_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.itemName}>{props.name}</Text>
        <Text style={styles.itemDesc}>{props.desc}</Text>
        <Text style={styles.itemDate}>{props.date}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderTopColor: "grey",
    width: "100%",
    height: "100%",
    marginBottom: 2,
  },
  itemDesc: {
    textAlign: "center",
    paddingHorizontal: 10,
    width: "30%",
    borderLeftWidth: 0.5,
    minHeight: "100%",
  },
  itemName: {
    width: "30%",
    marginLeft: 20,
  },
  itemDate: {
    borderLeftWidth: 0.5,
    textAlign: "center",
    paddingHorizontal: 10,
    left: 40,
  },
});
