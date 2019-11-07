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

  const [fairyCurrentLv, setFairyCurrentLv] = useState("1");
  const [fairyCurrentExp, setFairyCurrentExp] = useState();
  const [fairyTarget, setFairyTarget] = useState();
  const [fairyNeedReport, setFairyNeedReport] = useState();

  useEffect(() => {});

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

        <View style={{ padding: "5%" }}>
          {tab === 0 ? (
            // =============================탭1====================================
            <View>
              <Text>1</Text>
            </View>
          ) : tab === 1 ? (
            // =============================탭2====================================
            <View>
              <View style={styles.flexRow}>
                <View style={[styles.inputLabelsView, { flex: 3 }]}>
                  <Text style={styles.inputLabels}>현재 레벨</Text>
                </View>
                <TextInput
                  style={[styles.inputs, { flex: 2 }]}
                  placeholder=""
                  keyboardType="numeric"
                  onChangeText={text => setFairyCurrentLv(text)}
                  value={fairyCurrentLv}
                />
              </View>

              <View style={styles.flexRow}>
                <View style={[styles.inputLabelsView, { flex: 3 }]}>
                  <Text style={styles.inputLabels}>현재 경험치</Text>
                </View>
                <TextInput
                  style={[styles.inputs, { flex: 2 }]}
                  placeholder=""
                  keyboardType="numeric"
                  onChangeText={text => setFairyCurrentExp(text)}
                  value={fairyCurrentExp}
                />
              </View>

              <View style={styles.flexRow}>
                <View style={[styles.inputLabelsView, { flex: 3 }]}>
                  <Text style={styles.inputLabels}>목표 레벨</Text>
                </View>
                <TextInput
                  style={[styles.inputs, { flex: 2 }]}
                  placeholder=""
                  keyboardType="numeric"
                  onChangeText={text => setFairyTarget(text)}
                  value={fairyTarget}
                />
              </View>

              <View style={styles.flexRow}>
                <View style={[styles.inputLabelsView, { flex: 3 }]}>
                  <Text style={styles.inputLabels}>필요 작전보고서</Text>
                </View>
                <View style={[styles.valueLables, { flex: 2 }]}>
                  <Text style={{ textAlign: "right" }}>
                    {fairyNeedReport}개
                  </Text>
                </View>
              </View>

              <View style={styles.flexRow}>
                <View style={[styles.inputLabelsView, { flex: 3 }]}>
                  <Text style={styles.inputLabels}>
                    작보 제작에 필요한 전지
                  </Text>
                </View>
                <View style={[styles.valueLables, { flex: 2 }]}>
                  <Text style={{ textAlign: "right" }}>
                    {fairyNeedReport * 3}개
                  </Text>
                </View>
              </View>
            </View>
          ) : tab === 2 ? (
            // =============================탭3====================================
            <View>
              <Text>3</Text>
            </View>
          ) : null}
        </View>
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
  inputLabelsView: {
    // flex: 3,
    height: 40,
    paddingRight: 5,
    paddingLeft: 5,

    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRightWidth: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: ADDON_LABEL,
    alignItems: "stretch",
    justifyContent: "center",
  },
  inputLabels: {
    // flex: 3,
    // height: 40,
    // lineHeight: 40,
    textAlign: "right",

    // borderColor: 'gray',
    // borderWidth: 1,
    // borderTopLeftRadius: 5,
    // borderBottomLeftRadius: 5,
  },
  valueLables: {
    height: 40,
    paddingRight: 5,
    paddingLeft: 5,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    backgroundColor: OUTPUT_LABEL,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: "center",
  },
});

export default ExpCalc;
