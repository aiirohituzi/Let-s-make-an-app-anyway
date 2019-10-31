import React, { useState } from "react";
import { StatusBar } from "react-native";
import DamageCalc from "./src/DamageCalc";
import AgiCalc from "./src/AgiCalc";
import GemsCalc from "./src/GemsCalc";
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
    // Screen3: {
    //   screen: Screen3,
    //   navigationOptions: {
    //     drawerLabel: '화면3',
    //   }
    // },
    // Screen4: {
    //   screen: Screen4,
    //   navigationOptions: {
    //     drawerLabel: '화면4',
    //   }
    // },
    // Screen5: {
    //   screen: Screen5,
    //   navigationOptions: {
    //     drawerLabel: '화면5',
    //   }
    // },
    // Screen6: {
    //   screen: Screen6,
    //   navigationOptions: {
    //     drawerLabel: '화면6',
    //   }
    // }
  },
  {
    contentOptions: {
      activeTintColor: "#e91e63",
    },
    initialRouteName: "AgiCalc",
    hideStatusBar: true,
    statusBarAnimation: false,
  },
  StatusBar.setBarStyle("dark-content"),
);

const App = createAppContainer(MyDrawerNavigator);

export default App;
