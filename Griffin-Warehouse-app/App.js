import React, { useState } from "react";
import { StatusBar } from "react-native";
import DamageCalc from "./src/DamageCalc";
import AgiCalc from "./src/AgiCalc";
import GemsCalc from "./src/GemsCalc";
import SimCalc from "./src/SimCalc";
import ExpCalc from "./src/ExpCalc";
import OperationalEffectivenessCalc from "./src/OperationalEffectivenessCalc";

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
    ExpCalc: {
      screen: ExpCalc,
      navigationOptions: {
        drawerLabel: "경험치 계산기",
      },
    },
    OperationalEffectivenessCalc: {
      screen: OperationalEffectivenessCalc,
      navigationOptions: {
        drawerLabel: "작전능력 계산기",
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: "#e91e63",
    },
    initialRouteName: "OperationalEffectivenessCalc",
    hideStatusBar: true,
    statusBarAnimation: false,
  },
  StatusBar.setBarStyle("dark-content"),
);

const App = createAppContainer(MyDrawerNavigator);

export default App;
