import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { Navigator, Screen } = createStackNavigator();

import Landing from "../pages/Landing/landing";
import CodeScanner from "../componets/barcode/CodeScanner";
import RegisterOS from "../pages/RegisterOS/RegisterOS";
import HandleConnection from "../componets/HandleConnection/HandleConnection";
import CheckServiceOrder from "../pages/CheckServiceOrder/CheckServiceOrder";

const AppStack = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Login" component={HandleConnection} />
        <Screen name="Landing" component={Landing} />
        <Screen name="checkOS" component={CheckServiceOrder} />
        <Screen name="registerOS" component={RegisterOS} />
        <Screen name="scanner" component={CodeScanner} />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
