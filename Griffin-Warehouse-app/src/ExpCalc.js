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
  Modal,
  KeyboardAvoidingView,
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
import { exp, expPledge, expFairy, expFST, area } from "./data";

const ExpCalc = props => {
  const [tab, setTab] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [penaltyTableVisible, setPenaltyTableVisible] = useState(false);
  const [inputFlag, setInputFlag] = useState(false);

  const [tdollCurrentLv, setTdollCurrentLv] = useState("1");
  const [tdollCurrentExp, setTdollCurrentExp] = useState();
  const [tdollTarget, setTdollTarget] = useState();
  const [areaSelected, setAreaSelected] = useState(0);
  const [areaExpDirectInput, setAreaExpDirectInput] = useState("0");
  const [areaPenaltyDirectInput, setAreaPenaltyDirectInput] = useState("0");
  const [getExp, setGetExp] = useState(370 * 4);
  const [dummy, setDummy] = useState(5);
  const [leader, setLeader] = useState(false);
  const [leaderCoefficient, setLeaderCoefficient] = useState(1);
  const [mvp, setMvp] = useState(false);
  const [mvpCoefficient, setMvpCoefficient] = useState(1);
  const [pledge, setPledge] = useState(false);
  const [pledgeCoefficient, setPledgeCoefficient] = useState(1);
  const commandSkill = [5, 8, 10, 12, 14, 16, 18, 20, 22, 25];
  const [command, setCommand] = useState(false);
  const [commandSkillLv, setCommandSkillLv] = useState(10);
  const [commandCoefficient, setCommandCoefficient] = useState(1);
  const [event, setEvent] = useState(false);
  const [eventCoefficient, setEventCoefficient] = useState("2");
  const [needExp, setNeedExp] = useState(0);
  const [needCount, setNeedCount] = useState(0);
  const [tdollNeedReport, setTdollNeedReport] = useState(0);

  const [fairyCurrentLv, setFairyCurrentLv] = useState("1");
  const [fairyCurrentExp, setFairyCurrentExp] = useState();
  const [fairyTarget, setFairyTarget] = useState();
  const [fairyNeedReport, setFairyNeedReport] = useState(0);

  const [FSTCurrentLv, setFSTCurrentLv] = useState("1");
  const [FSTCurrentExp, setFSTCurrentExp] = useState();
  const [FSTTarget, setFSTTarget] = useState();
  const [FSTNeedReport, setFSTNeedReport] = useState(0);
  const [FSTTime, setFSTTime] = useState(0);

  getExpFinal = (cumulativeExp, penaltyLv) => {
    if (getPenalty(cumulativeExp, penaltyLv) == 0) {
      return 10;
    } else {
      return (
        getExp * getPenalty(cumulativeExp, penaltyLv) * getDummy(cumulativeExp)
      );
    }
  };

  getPenalty = (cumulativeExp, penaltyLv) => {
    if (cumulativeExp >= exp[penaltyLv + 50 - 1]) {
      return 0;
    } else if (cumulativeExp > exp[penaltyLv + 40 - 1]) {
      return 0.2;
    } else if (cumulativeExp > exp[penaltyLv + 30 - 1]) {
      return 0.4;
    } else if (cumulativeExp > exp[penaltyLv + 20 - 1]) {
      return 0.6;
    } else if (cumulativeExp > exp[penaltyLv + 10 - 1]) {
      return 0.8;
    } else {
      return 1;
    }
  };

  getDummy = cumulativeExp => {
    if (cumulativeExp >= exp[89]) {
      if (dummy < 5) {
        return 0.5 + 0.5 * dummy;
      } else {
        return 3;
      }
    } else if (cumulativeExp >= exp[69]) {
      if (dummy < 4) {
        return 0.5 + 0.5 * dummy;
      } else {
        return 2.5;
      }
    } else if (cumulativeExp >= exp[29]) {
      if (dummy < 3) {
        return 0.5 + 0.5 * dummy;
      } else {
        return 2;
      }
    } else if (cumulativeExp >= exp[9]) {
      if (dummy < 2) {
        return 0.5 + 0.5 * dummy;
      } else {
        return 1.5;
      }
    } else {
      return 1;
    }
  };

  useEffect(() => {
    setGetExp(
      areaSelected != 7 ? area[areaSelected].exp : parseInt(areaExpDirectInput),
    );

    let calc_tdollCurrentLv = parseInt(tdollCurrentLv ? tdollCurrentLv : 0);
    let calc_tdollCurrentExp = parseInt(tdollCurrentExp ? tdollCurrentExp : 0);
    let calc_tdollTarget = parseInt(tdollTarget ? tdollTarget : 0);
    let cumulativeExp = exp[calc_tdollCurrentLv - 1] + calc_tdollCurrentExp;
    let tdollTargetExp;
    let calc_needExp;
    let calc_needCount = 0;
    let penaltyLv = parseInt(
      areaSelected != 7 ? area[areaSelected].penalty : areaPenaltyDirectInput,
    );
    let calc_eventCoefficient = 1;
    let regnondig = /\D+/;

    if (areaSelected == 7) {
      if (
        regnondig.test(areaExpDirectInput) ||
        regnondig.test(areaExpDirectInput) ||
        areaExpDirectInput < 100
      ) {
        return;
      }
    }

    if (!inputFlag) {
      tdollTargetExp = exp[calc_tdollTarget - 1];
      calc_needExp =
        exp[calc_tdollTarget - 1] -
        (exp[calc_tdollCurrentLv - 1] + calc_tdollCurrentExp);
      if (isNaN(calc_needExp)) {
        setNeedExp(0);
      } else {
        setNeedExp(calc_needExp);
      }
    } else {
      tdollTargetExp = calc_tdollTarget;
      calc_needExp =
        tdollTargetExp - (exp[calc_tdollCurrentLv - 1] + calc_tdollCurrentExp);
      if (isNaN(calc_needExp)) {
        setNeedExp(0);
      } else {
        setNeedExp(calc_needExp);
      }
    }

    if (!pledge) {
      setTdollNeedReport(Math.ceil(needExp / 3000));
    } else {
      setTdollNeedReport(
        Math.ceil(
          (expPledge[calc_tdollTarget - 1] -
            (expPledge[calc_tdollCurrentLv - 1] + calc_tdollCurrentExp / 2)) /
            3000,
        ),
      );
    }

    for (calc_needCount = 0; cumulativeExp < tdollTargetExp; calc_needCount++) {
      if (getExpFinal(cumulativeExp, penaltyLv) == 10) {
        break;
      }

      if (pledge) {
        if (cumulativeExp >= exp[99]) {
          setPledgeCoefficient(2);
        }
      } else {
        setPledgeCoefficient(1);
      }

      if (mvp) {
        setMvpCoefficient(1.3);
      } else {
        setMvpCoefficient(1);
      }

      if (leader) {
        setLeaderCoefficient(1.2);
      } else {
        setLeaderCoefficient(1);
      }

      if (command) {
        setCommandCoefficient(1 + commandSkill[commandSkillLv - 1] / 100);
      } else {
        setCommandCoefficient(1);
      }

      if (event) {
        if (eventCoefficient != "" && eventCoefficient > 0) {
          calc_eventCoefficient = eventCoefficient;
        }
      }

      cumulativeExp +=
        getExpFinal(cumulativeExp, penaltyLv) *
        pledgeCoefficient *
        mvpCoefficient *
        leaderCoefficient *
        commandCoefficient *
        calc_eventCoefficient;
    }

    if (getExpFinal(cumulativeExp, penaltyLv) == 10) {
      setNeedCount(calc_needCount + "회 + α (이후 경험치는 10으로 고정)");
    } else {
      setNeedCount(calc_needCount);
    }

    // 요정 계산
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

    // 화력지원소대 계산
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
        <TouchableOpacity
          style={styles.btnMenu}
          onPress={() => setPenaltyTableVisible(true)}
        >
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            <Icon name="md-information-circle-outline" size={30} color="#555" />
          </Text>
        </TouchableOpacity>
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

      <Modal animationType="slide" visible={penaltyTableVisible}>
        <View
          style={{
            flex: 1,
            padding: 10,
            paddingTop: Constants.statusBarHeight,
          }}
        >
          <View
            style={{
              height: 60,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomWidth: 2,
            }}
          >
            <TouchableOpacity
              style={styles.btnMenu}
              onPress={() => setPenaltyTableVisible(false)}
            >
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                <Icon name="md-close" size={30} color="#555" />
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: 20,
              }}
            >
              경험치 패널티 표
            </Text>
            <View style={{ width: 50 }} />
          </View>
          <ScrollView>
            <View style={[styles.penaltyTable, { marginTop: 10 }]}>
              <View style={[styles.penaltyTableHeader, { flex: 1 }]}>
                <Text>레벨링 지역</Text>
              </View>
              <View style={[styles.penaltyTableHeader, { flex: 1 }]}>
                <Text>패널티 레벨</Text>
              </View>
              <View style={[styles.penaltyTableHeader, { flex: 1 }]}>
                <Text>입수 경험치</Text>
              </View>
            </View>
            <View style={styles.penaltyTable}>
              <View style={[styles.penaltyTableBody, { flex: 1 }]}>
                <Text>4-3e</Text>
              </View>
              <View style={[styles.penaltyTableBody, { flex: 1 }]}>
                <Text>65</Text>
              </View>
              <View style={[styles.penaltyTableBody, { flex: 1 }]}>
                <Text>370 * 4</Text>
              </View>
            </View>
            <View style={styles.penaltyTable}>
              <View style={[styles.penaltyTableBody, { flex: 1 }]}>
                <Text>0-2</Text>
              </View>
              <View style={[styles.penaltyTableBody, { flex: 1 }]}>
                <Text>100</Text>
              </View>
              <View style={[styles.penaltyTableBody, { flex: 1 }]}>
                <Text>490 * 5</Text>
              </View>
            </View>
            <View style={styles.penaltyTable}>
              <View style={[styles.penaltyTableBody, { flex: 1 }]}>
                <Text>8-1n</Text>
              </View>
              <View style={[styles.penaltyTableBody, { flex: 1 }]}>
                <Text>111</Text>
              </View>
              <View style={[styles.penaltyTableBody, { flex: 1 }]}>
                <Text>500 * 5</Text>
              </View>
            </View>
            <View style={styles.penaltyTable}>
              <View style={[styles.penaltyTableBody, { flex: 1 }]}>
                <Text>11-5</Text>
              </View>
              <View style={[styles.penaltyTableBody, { flex: 1 }]}>
                <Text>120</Text>
              </View>
              <View style={[styles.penaltyTableBody, { flex: 1 }]}>
                <Text>550 * 5</Text>
              </View>
            </View>
            <View style={styles.penaltyTable}>
              <View style={[styles.penaltyTableBody, { flex: 1 }]}>
                <Text>5-4e 보스런</Text>
              </View>
              <View style={[styles.penaltyTableBody, { flex: 1 }]}>
                <Text>83</Text>
              </View>
              <View style={[styles.penaltyTableBody, { flex: 1 }]}>
                <Text>430 * 5</Text>
              </View>
            </View>
            <View style={styles.penaltyTable}>
              <View style={[styles.penaltyTableBody, { flex: 1 }]}>
                <Text>0-4 보스런</Text>
              </View>
              <View style={[styles.penaltyTableBody, { flex: 1 }]}>
                <Text>106</Text>
              </View>
              <View style={[styles.penaltyTableBody, { flex: 1 }]}>
                <Text>500 * 4</Text>
              </View>
            </View>
            <View style={styles.penaltyTable}>
              <View style={[styles.penaltyTableBody, { flex: 1 }]}>
                <Text>특이점 4드라런</Text>
              </View>
              <View style={[styles.penaltyTableBody, { flex: 1 }]}>
                <Text>106</Text>
              </View>
              <View style={[styles.penaltyTableBody, { flex: 1 }]}>
                <Text>500 * 4</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                margin: 20,
              }}
            >
              <Text>패널티 레벨을 초과할 시, 10레벨 당 획득치 20% 감소</Text>
              <Text>50레벨 이상 높을 경우, 획득경험치 10으로 고정</Text>
            </View>
          </ScrollView>
        </View>
      </Modal>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" enabled>
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
                    onChangeText={text => setTdollCurrentLv(text)}
                    value={tdollCurrentLv}
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
                    onChangeText={text => setTdollCurrentExp(text)}
                    value={tdollCurrentExp}
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
                    <Text style={styles.inputLabels}>
                      {!inputFlag ? "목표 레벨" : "목표 경험치"}
                    </Text>
                  </View>
                  <TextInput
                    style={[styles.inputs, { flex: 2 }]}
                    placeholder=""
                    keyboardType="numeric"
                    onChangeText={text => setTdollTarget(text)}
                    value={tdollTarget}
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
                    <Switch
                      onChange={() => setLeader(!leader)}
                      value={leader}
                    />
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
                    <Switch onChange={() => setMvp(!mvp)} value={mvp} />
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
                    <Switch
                      onChange={() => setPledge(!pledge)}
                      value={pledge}
                    />
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
                    <Switch
                      onChange={() => setCommand(!command)}
                      value={command}
                    />
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
                    <Switch onChange={() => setEvent(!event)} value={event} />
                  </View>
                </View>

                {event ? (
                  <View style={styles.flexRow}>
                    <View style={[styles.inputLabelsView, { flex: 3 }]}>
                      <Text style={styles.inputLabels}>
                        경험치 이벤트 배율 입력
                      </Text>
                    </View>
                    <TextInput
                      style={[styles.inputs, { flex: 2 }]}
                      placeholder=""
                      keyboardType="numeric"
                      onChangeText={text => setEventCoefficient(text)}
                      value={eventCoefficient}
                    />
                  </View>
                ) : null}

                {command ? (
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
                      <Text style={{ textAlign: "center" }}>
                        지휘요정 스킬 레벨
                      </Text>
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
                        maximumValue={10}
                        step={1}
                        maximumTrackTintColor={"#fff"}
                        value={commandSkillLv}
                        onSlidingComplete={value => setCommandSkillLv(value)}
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
                      <Text style={{ textAlign: "center" }}>
                        {commandSkillLv}Lv {commandSkill[commandSkillLv - 1]}%
                      </Text>
                    </View>
                  </View>
                ) : null}

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
                    <Text style={{ textAlign: "center" }}>
                      최대 링크수 제한
                    </Text>
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

                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={modalVisible}
                >
                  <View
                    style={{
                      flex: 1,
                      padding: 10,
                      paddingTop: Constants.statusBarHeight,
                    }}
                  >
                    <View
                      style={{
                        height: 60,
                        alignItems: "stretch",
                        justifyContent: "center",
                        borderBottomWidth: 2,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontWeight: "600",
                          fontSize: 20,
                        }}
                      >
                        요정 특성 선택
                      </Text>
                    </View>
                    <ScrollView>
                      {area.map(data => {
                        return (
                          <TouchableHighlight
                            key={data.id}
                            underlayColor={OUTPUT_LABEL}
                            style={styles.selectItem}
                            onPress={() => {
                              setAreaSelected(data.id);
                              setModalVisible(false);
                            }}
                          >
                            <Text style={styles.selectItemText}>
                              {data.name}
                            </Text>
                          </TouchableHighlight>
                        );
                      })}
                    </ScrollView>
                  </View>
                </Modal>

                {/* ★ 이어서 처리해야 할 부분 */}
                <View style={styles.flexRow}>
                  <View style={[styles.inputLabelsView, { flex: 2 }]}>
                    <Text style={styles.inputLabels}>레벨링 지역</Text>
                  </View>
                  <TouchableHighlight
                    underlayColor={OUTPUT_LABEL}
                    style={[
                      styles.selectsView,
                      { flex: 3, borderRightWidth: 0 },
                    ]}
                    onPress={() => setModalVisible(true)}
                  >
                    <Text style={{ textAlign: "right" }}>
                      {area[areaSelected].name} ▼
                    </Text>
                  </TouchableHighlight>
                  <View style={[styles.valueLables, { flex: 4 }]}>
                    <Text style={{ textAlign: "right" }}>
                      1회당 입수 경험치{" "}
                      {areaSelected != 7
                        ? area[areaSelected].exp
                        : areaExpDirectInput}
                    </Text>
                  </View>
                </View>

                {areaSelected == 7 ? (
                  <View>
                    <View style={styles.flexRow}>
                      <View style={[styles.inputLabelsView, { flex: 3 }]}>
                        <Text style={styles.inputLabels}>1전역당 경험치</Text>
                      </View>
                      <TextInput
                        style={[styles.inputs, { flex: 2 }]}
                        placeholder=""
                        keyboardType="numeric"
                        onChangeText={text => setAreaExpDirectInput(text)}
                        value={areaExpDirectInput}
                      />
                    </View>
                    <View style={styles.flexRow}>
                      <View style={[styles.inputLabelsView, { flex: 3 }]}>
                        <Text style={styles.inputLabels}>전역 패널티</Text>
                      </View>
                      <TextInput
                        style={[styles.inputs, { flex: 2 }]}
                        placeholder=""
                        keyboardType="numeric"
                        onChangeText={text => setAreaPenaltyDirectInput(text)}
                        value={areaPenaltyDirectInput}
                      />
                    </View>
                  </View>
                ) : null}

                <View style={styles.flexRow}>
                  <View style={[styles.inputLabelsView, { flex: 3 }]}>
                    <Text style={styles.inputLabels}>남은 경험치</Text>
                  </View>
                  <View style={[styles.valueLables, { flex: 2 }]}>
                    <Text style={{ textAlign: "right" }}>{needExp}</Text>
                  </View>
                </View>

                <View style={styles.flexRow}>
                  <View style={[styles.inputLabelsView, { flex: 3 }]}>
                    <Text style={styles.inputLabels}>남은 횟수</Text>
                  </View>
                  <View style={[styles.valueLables, { flex: 2 }]}>
                    <Text style={{ textAlign: "right" }}>{needCount}회</Text>
                  </View>
                </View>

                <View style={styles.flexRow}>
                  <View style={[styles.inputLabelsView, { flex: 3 }]}>
                    <Text style={styles.inputLabels}>필요 작전보고서</Text>
                  </View>
                  <View style={[styles.valueLables, { flex: 2 }]}>
                    <Text style={{ textAlign: "right" }}>
                      {tdollNeedReport}개
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
                      {tdollNeedReport * 3}개
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
                    <Text style={{ textAlign: "right" }}>
                      {FSTNeedReport}개
                    </Text>
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
      </KeyboardAvoidingView>
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
    justifyContent: "space-between",
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

  selectItem: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    height: 60,
    borderColor: BORDER_COLOR,
    borderTopWidth: 1,
    marginRight: 20,
    marginLeft: 20,
  },
  selectItemText: {
    textAlign: "center",
    fontSize: 18,
  },

  penaltyTable: {
    flex: 1,
    flexDirection: "row",
    height: 50,
  },
  penaltyTableHeader: {
    backgroundColor: ADDON_LABEL,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
    borderWidth: 1,
  },
  penaltyTableBody: {
    backgroundColor: OUTPUT_LABEL,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
    borderWidth: 1,
  },
});

export default ExpCalc;
