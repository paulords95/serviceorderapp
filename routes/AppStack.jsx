import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

import Landing from "../pages/landing";
import CodeScanner from "../componets/barcode/CodeScanner";

const AppStack = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Landing" component={Landing} />
        <Screen name="Codebar" component={CodeScanner} />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
