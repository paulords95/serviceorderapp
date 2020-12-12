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
    marginBottom: 5,
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 2,
    borderTopWidth: 1,
    borderTopColor: "grey",
  },
  itemDesc: {
    textAlign: "center",
    marginLeft: 0,
    maxWidth: 200,
    marginRight: 50,
    paddingHorizontal: 10,
    minHeight: "100%",
  },
  itemDate: {
    marginRight: 22,
    marginLeft: 0,
    paddingHorizontal: 10,
    borderLeftWidth: 1,
  },
});
