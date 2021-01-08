import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LastServiceOrder = (props) => {
  return (
    <>
      <View style={styles.containerWrap}>
        <Text style={styles.lastOs}>ÚLTIMO REGISTRO</Text>
        <View style={styles.eqpInfoWrap}>
          <Text style={styles.infoTitle}>Nome</Text>
          <Text style={styles.dataText}>{props.name}</Text>
        </View>
        <View style={styles.eqpInfoData}>
          <Text style={styles.infoTitle}>Data do registro</Text>
          <Text style={styles.dataText}>{props.date}</Text>
        </View>
      </View>
      <View style={styles.descriptionWrap}>
        <Text style={styles.eqpDescription}>Descrição</Text>
        <Text style={styles.eqpDescriptionText}>{props.description}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerWrap: {
    flex: 1,
  },
  infoTitle: {
    fontFamily: "MPLUSRounded1c_700Bold",
    paddingHorizontal: 30,
    textAlign: "center",
    marginTop: 15,
  },
  dataText: {
    fontFamily: "MPLUSRounded1c_400Regular",
    textAlign: "center",
    marginHorizontal: 20,
  },
  descriptionWrap: {
    marginTop: 20,
  },
  eqpDescription: {
    fontFamily: "MPLUSRounded1c_700Bold",

    textAlign: "center",
  },
  eqpDescriptionText: {
    marginTop: 0,
    maxWidth: "70%",
    fontSize: 15,
    textAlign: "justify",
    fontFamily: "MPLUSRounded1c_400Regular",
    paddingBottom: 30,
  },
  lastOs: {
    marginTop: 30,
    color: "#003A61",
    fontSize: 16,
    alignSelf: "center",
    fontFamily: "MPLUSRounded1c_700Bold",
  },
});
export default LastServiceOrder;
