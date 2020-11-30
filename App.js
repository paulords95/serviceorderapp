import { StatusBar } from "expo-status-bar";
import React from "react";
import { AppLoading } from "expo";

import AppStack from "./routes/AppStack";


//fonts https://directory.now.sh/


export default function App() {


 
    return (
      <>
        <AppStack />
        <StatusBar style="light" />
      </>
    );
  }
