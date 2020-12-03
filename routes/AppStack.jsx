import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

import Landing from "../pages/Landing/landing";
import CodeScanner from "../componets/barcode/CodeScanner";
import RegisterOS from "../pages/RegisterOS/RegisterOS";
import Login from "../pages/Login/Login";

const AppStack = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Login" component={Login} />
        <Screen name="Landing" component={Landing} />
        <Screen name="registerOS" component={RegisterOS} />
        <Screen name="scanner" component={CodeScanner} />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
