import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';


import CodeScanner from './componets/barcode/CodeScanner'
import logo from './assets/logo.png'

export default function App() {
 let [fontsLoaded] = useFonts({
   'Montserrat': require('./assets/fonts/Montserrat/Montserrat-Bold.ttf'),
 });

 if (!fontsLoaded) {
   return <AppLoading />;
 } else {
  return (
    <View style={styles.container}>
      
      <Image source={logo} style={styles.logo}></Image>
      <Text style={styles.title}>Registro de Ordens de Serviço de Manutenção</Text>
      <StatusBar style="auto" />
      <Button title='Ler código de barras' onPress={()=> {
        return(
<CodeScanner/>
        )
      }}></Button>
      
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 80

  },
  logo: {
    flex: 1,
    position: "absolute",
    top:  100,
    
  },
  title: {
    position: 'relative',
    fontSize: 25,
    paddingTop: 130,
    maxWidth: 250,
    textAlign: "center",
  fontFamily: 'Montserrat',
    fontWeight: "bold"
  }
});
