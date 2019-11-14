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
  Slider,
  Switch,
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
import { expFairy, expFST } from "./data";

const ExpCalc = props => {
  const [tab, setTab] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputFlag, setInputFlag] = useState(false);

  const [fairyCurrentLv, setFairyCurrentLv] = useState("1");
  const [fairyCurrentExp, setFairyCurrentExp] = useState();
  const [fairyTarget, setFairyTarget] = useState();
  const [fairyNeedReport, setFairyNeedReport] = useState(0);

  const [FSTCurrentLv, setFSTCurrentLv] = useState("1");
  const [FSTCurrentExp, setFSTCurrentExp] = useState();
  const [FSTTarget, setFSTTarget] = useState();
  const [FSTNeedReport, setFSTNeedReport] = useState(0);
  const [FSTTime, setFSTTime] = useState(0);

  const [dummy, setDummy] = useState(5);

  useEffect(() => {
    let fairyNeedExp =
      expFairy[parseInt(fairyTarget ? fairyTarget : 0) - 1] -
      (expFairy[parseInt(fairyCurrentLv ? fairyCurrentLv : 0) - 1] +
        parseInt(fairyCurrentExp ? fairyCurrentExp : 0));
    if (isNaN(fairyNeedExp)) {
      // fairyNeedExp = 0;
      setFairyNeedReport(0);
    } else {
      setFairyNeedReport(Math.ceil(fairyNeedExp / 3000));
    }

    let FSTNeedExp =
      expFST[parseInt(FSTTarget ? FSTTarget : 0) - 1] -
      (expFST[parseInt(FSTCurrentLv ? FSTCurrentLv : 0) - 1] +
        parseInt(FSTCurrentExp ? FSTCurrentExp : 0));
    if (isNaN(FSTNeedExp)) {
      // FSTNeedExp = 0
      setFSTNeedReport(0);
      setFSTTime(0);
    } else {
      setFSTNeedReport(Math.ceil(FSTNeedExp / 3000));
      setFSTTime(Math.ceil(FSTNeedReport / 15));
    }
  });

  return (
    <SafeAreaView style={styles.container}>
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
          <Text style={{ fontSize: 20, fontWeight: "600" }}>경험치 계산기</Text>
        </View>
        <View style={{ width: 50 }} />
      </View>
      <View style={styles.flexRowNoMargin}>
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

      <ScrollView>
        <View style={{ padding: "5%" }}>
          {tab === 0 ? (
            // =============================탭1====================================
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

              <View style={[styles.flexRow, { marginTop: 5 }]}>
                <TouchableHighlight
                  style={[
                    styles.switch,
                    {
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                    },
                    inputFlag
                      ? {}
                      : {
                          backgroundColor: SWITCH_ACTIVE,
                          borderBottomWidth: 1.5,
                          borderRightWidth: 1,
                          borderBottomColor: BORDER_SHADOW,
                          borderRightColor: BORDER_SHADOW,
                        },
                  ]}
                  underlayColor={SWITCH_UNDERLAY}
                  onPress={() => setInputFlag(false)}
                >
                  <Text style={{ textAlign: "center" }}>목표 레벨</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={[
                    styles.switch,
                    {
                      borderLeftWidth: 0,
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                    },
                    inputFlag
                      ? {
                          backgroundColor: SWITCH_ACTIVE,
                          borderBottomWidth: 1.5,
                          borderRightWidth: 1,
                          borderBottomColor: BORDER_SHADOW,
                          borderRightColor: BORDER_SHADOW,
                        }
                      : {},
                  ]}
                  underlayColor={SWITCH_UNDERLAY}
                  onPress={() => setInputFlag(true)}
                >
                  <Text style={{ textAlign: "center" }}>목표 경험치</Text>
                </TouchableHighlight>
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

              <View
                style={[
                  styles.flexRow,
                  { justifyContent: "space-between", marginTop: 5 },
                ]}
              >
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    flex: 1,
                  }}
                >
                  <Text>리더</Text>
                  <Switch></Switch>
                </View>

                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    flex: 2,
                  }}
                >
                  <Text>MVP</Text>
                  <Switch></Switch>
                </View>

                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    flex: 2,
                  }}
                >
                  <Text>서약 여부</Text>
                  <Switch></Switch>
                </View>
              </View>
              <View style={[styles.flexRow]}>
                <View style={{ flex: 1 }}></View>
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    flex: 2,
                  }}
                >
                  <Text>지휘요정 발동</Text>
                  <Switch></Switch>
                </View>

                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    flex: 2,
                  }}
                >
                  <Text>경험치 이벤트</Text>
                  <Switch></Switch>
                </View>
              </View>

              <View style={styles.flexRow}>
                <View
                  style={[
                    styles.sliderValueView,
                    {
                      flex: 2,
                      justifyContent: "center",
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                    },
                  ]}
                >
                  <Text style={{ textAlign: "center" }}>최대 링크수 제한</Text>
                </View>
                <View
                  style={[
                    styles.inputLabelsView,
                    {
                      flex: 3,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    },
                  ]}
                >
                  <Slider
                    minimumValue={1}
                    maximumValue={5}
                    step={1}
                    maximumTrackTintColor={"#fff"}
                    value={dummy}
                    onSlidingComplete={value => setDummy(value)}
                  />
                </View>
                <View
                  style={[
                    styles.sliderValueView,
                    {
                      flex: 1,
                      justifyContent: "center",
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                    },
                  ]}
                >
                  <Text style={{ textAlign: "center" }}>{dummy}링크</Text>
                </View>
              </View>

              <View style={styles.flexRow}>
                <View style={[styles.inputLabelsView, { flex: 2 }]}>
                  <Text style={styles.inputLabels}>레벨링 지역</Text>
                </View>
                <TouchableHighlight
                  underlayColor={OUTPUT_LABEL}
                  style={[styles.selectsView, { flex: 3, borderRightWidth: 0 }]}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={{ textAlign: "right" }}>
                    {/* {fairyPassive[fairySelected].name} ▼ */}
                    asdf ▼
                  </Text>
                </TouchableHighlight>
                <View style={[styles.valueLables, { flex: 4 }]}>
                  <Text style={{ textAlign: "right" }}>
                    1회당 입수 경험치 {fairyNeedReport}
                  </Text>
                </View>
              </View>

              <View style={styles.flexRow}>
                <View style={[styles.inputLabelsView, { flex: 3 }]}>
                  <Text style={styles.inputLabels}>남은 경험치</Text>
                </View>
                <View style={[styles.valueLables, { flex: 2 }]}>
                  <Text style={{ textAlign: "right" }}>{fairyNeedReport}</Text>
                </View>
              </View>

              <View style={styles.flexRow}>
                <View style={[styles.inputLabelsView, { flex: 3 }]}>
                  <Text style={styles.inputLabels}>남은 횟수</Text>
                </View>
                <View style={[styles.valueLables, { flex: 2 }]}>
                  <Text style={{ textAlign: "right" }}>
                    {fairyNeedReport}회
                  </Text>
                </View>
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
              <View style={styles.flexRow}>
                <View style={[styles.inputLabelsView, { flex: 3 }]}>
                  <Text style={styles.inputLabels}>현재 레벨</Text>
                </View>
                <TextInput
                  style={[styles.inputs, { flex: 2 }]}
                  placeholder=""
                  keyboardType="numeric"
                  onChangeText={text => setFSTCurrentLv(text)}
                  value={FSTCurrentLv}
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
                  onChangeText={text => setFSTCurrentExp(text)}
                  value={FSTCurrentExp}
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
                  onChangeText={text => setFSTTarget(text)}
                  value={FSTTarget}
                />
              </View>

              <View style={styles.flexRow}>
                <View style={[styles.inputLabelsView, { flex: 3 }]}>
                  <Text style={styles.inputLabels}>필요 특수작전보고서</Text>
                </View>
                <View style={[styles.valueLables, { flex: 2 }]}>
                  <Text style={{ textAlign: "right" }}>{FSTNeedReport}개</Text>
                </View>
              </View>

              <View style={styles.flexRow}>
                <View style={[styles.inputLabelsView, { flex: 3 }]}>
                  <Text style={styles.inputLabels}>소요 시간</Text>
                </View>
                <View style={[styles.valueLables, { flex: 2 }]}>
                  <Text style={{ textAlign: "right" }}>{FSTTime}시간</Text>
                </View>
              </View>

              <View style={styles.flexRow}>
                <View style={[styles.inputLabelsView, { flex: 3 }]}>
                  <Text style={styles.inputLabels}>소모 전지</Text>
                </View>
                <View style={[styles.valueLables, { flex: 2 }]}>
                  <Text style={{ textAlign: "right" }}>{FSTTime * 5}개</Text>
                </View>
              </View>

              <View style={styles.flexRow}>
                <View style={[styles.inputLabelsView, { flex: 3 }]}>
                  <Text style={styles.inputLabels}>
                    특작보 제작에 필요한 전지
                  </Text>
                </View>
                <View style={[styles.valueLables, { flex: 2 }]}>
                  <Text style={{ textAlign: "right" }}>
                    {FSTNeedReport * 3}개
                  </Text>
                </View>
              </View>
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
  sliderValueView: {
    justifyContent: "center",
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    backgroundColor: OUTPUT_LABEL,
  },
  selectsView: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    height: 40,
    paddingRight: 5,
    paddingLeft: 5,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
  },
  switch: {
    flex: 1,
    justifyContent: "center",
    height: 40,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
});

export default ExpCalc;
