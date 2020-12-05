import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

import Landing from "../pages/Landing/landing";
import CodeScanner from "../componets/barcode/CodeScanner";
import RegisterOS from "../pages/RegisterOS/RegisterOS";
import Login from "../pages/Login/Login";
import CheckConnection from "../pages/CheckConnection/CheckConnection";

import api from "../services/api";

const AppStack = () => {
  const [CheckCon, setCheckCon] = useState(false);

  useEffect(() => {
    api
      .get("/api/checkdb")
      .then(function (response) {
        setCheckCon(true);
      })
      .catch(function (error) {
        setCheckCon(false);
        console.log(error);
      })
      .then(function () {});
  }, []);

  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        {CheckCon ? (
          <Screen name="Login" component={Login} />
        ) : (
          <Screen name="CheckConnection" component={CheckConnection} />
        )}
        <Screen name="Landing" component={Landing} />
        <Screen name="registerOS" component={RegisterOS} />
        <Screen name="scanner" component={CodeScanner} />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
