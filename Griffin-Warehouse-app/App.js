import React, { useState } from "react";
import { StatusBar } from "react-native";
import DamageCalc from "./src/DamageCalc";
import AgiCalc from "./src/AgiCalc";
import GemsCalc from "./src/GemsCalc";
import SimCalc from "./src/SimCalc";
// import Screen3 from './components/screen3';
// import Screen1 from './components/screen4';
// import Screen2 from './components/screen5';
// import Screen3 from './components/screen5';

import { createAppContainer } from "react-navigation";
// import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from "react-navigation-drawer";

const MyDrawerNavigator = createDrawerNavigator(
  {
    DamageCalc: {
      screen: DamageCalc,
      navigationOptions: {
        drawerLabel: "데미지 계산기",
      },
    },
    AgiCalc: {
      screen: AgiCalc,
      navigationOptions: {
        drawerLabel: "최대사속 계산기",
      },
    },
    GemsCalc: {
      screen: GemsCalc,
      navigationOptions: {
        drawerLabel: "필요 보석량 계산기",
      },
    },
    SimCalc: {
      screen: SimCalc,
      navigationOptions: {
        drawerLabel: "필요 모의작전점수 계산기",
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: "#e91e63",
    },
    initialRouteName: "SimCalc",
    hideStatusBar: true,
    statusBarAnimation: false,
  },
  StatusBar.setBarStyle("dark-content"),
);

const App = createAppContainer(MyDrawerNavigator);

export default App;
