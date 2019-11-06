import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
} from "react-native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import "./style/color";
import {
  BORDER_COLOR,
  BORDER_SHADOW,
  OUTPUT_LABEL,
  ADDON_LABEL,
  SWITCH_ACTIVE,
  SWITCH_UNDERLAY,
  TAB_ACTIVE,
  TAB_INACTIVE,
  TAB_UNDERLAY,
} from "./style/color";

const ExpCalc = props => {
  const [tab, setTab] = useState(0);

  useEffect(() => {});

  // 이곳에서 각 탭의 화면 편집
  tabInstance = [
    <View>
      <Text>1</Text>
    </View>,
    <View>
      <Text>2</Text>
    </View>,
    <View>
      <Text>3</Text>
    </View>,
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.navbar}>
          <TouchableOpacity
            style={styles.btnMenu}
            onPress={() => props.navigation.openDrawer()}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              <Icon name="ios-menu" size={30} color="#555" />
            </Text>
          </TouchableOpacity>
          <View style={styles.status}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              경험치 계산기
            </Text>
          </View>
          <View style={{ width: 50 }} />
        </View>

        <View style={styles.flexRow}>
          <TouchableHighlight
            style={[
              styles.tab,
              tab === 0
                ? {
                    backgroundColor: TAB_ACTIVE,
                    borderBottomWidth: 1.5,
                    borderRightWidth: 1,
                    borderBottomColor: BORDER_SHADOW,
                    borderRightColor: BORDER_SHADOW,
                  }
                : {},
            ]}
            underlayColor={TAB_UNDERLAY}
            onPress={() => setTab(0)}
          >
            <Text style={{ textAlign: "center" }}>인형</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[
              styles.tab,
              {
                borderLeftWidth: 0,
              },
              tab === 1
                ? {
                    backgroundColor: TAB_ACTIVE,
                    borderBottomWidth: 1.5,
                    borderRightWidth: 1,
                    borderBottomColor: BORDER_SHADOW,
                    borderRightColor: BORDER_SHADOW,
                  }
                : {},
            ]}
            underlayColor={TAB_UNDERLAY}
            onPress={() => setTab(1)}
          >
            <Text style={{ textAlign: "center" }}>요정</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[
              styles.tab,
              {
                borderLeftWidth: 0,
              },
              tab === 2
                ? {
                    backgroundColor: TAB_ACTIVE,
                    borderBottomWidth: 1.5,
                    borderRightWidth: 1,
                    borderBottomColor: BORDER_SHADOW,
                    borderRightColor: BORDER_SHADOW,
                  }
                : {},
            ]}
            underlayColor={TAB_UNDERLAY}
            onPress={() => setTab(2)}
          >
            <Text style={{ textAlign: "center" }}>화력지원소대</Text>
          </TouchableHighlight>
        </View>

        <View style={{ padding: "5%" }}>{tabInstance[tab]}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    padding: 10,
    flex: 1,
    // justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
  },
  flexRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  flexRowNoMargin: {
    flexDirection: "row",
  },
  navbar: {
    width: Dimensions.get("window").width,
    height: 50,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d6d7da",
  },
  btnMenu: {
    width: 50,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  status: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  tab: {
    flex: 1,
    justifyContent: "center",
    height: 40,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: BORDER_COLOR,
    backgroundColor: TAB_INACTIVE,
  },

  inputs: {
    textAlign: "right",
    height: 40,
    paddingRight: 5,
    paddingLeft: 5,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  baseLabelsView: {
    height: 40,
    paddingRight: 5,
    paddingLeft: 5,

    borderColor: BORDER_COLOR,
    borderWidth: 1,
    backgroundColor: ADDON_LABEL,
    alignItems: "stretch",
    justifyContent: "center",
  },
  baseLabelsAlignCenter: {
    textAlign: "center",
  },
  inputsMiddle: {
    flex: 2,
    textAlign: "right",
    height: 40,
    paddingRight: 5,
    paddingLeft: 5,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRightWidth: 0,
  },
  radiusTitle: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  resultLabelsView: {
    // flex: 3,
    height: 40,
    paddingRight: 5,
    paddingLeft: 5,

    borderColor: BORDER_COLOR,
    borderWidth: 1,
    backgroundColor: OUTPUT_LABEL,
    alignItems: "stretch",
    justifyContent: "center",
  },
});

export default ExpCalc;
