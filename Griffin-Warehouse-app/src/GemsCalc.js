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
} from "./style/color";

const GemsCalc = props => {
  const [inputFlag, setInputFlag] = useState(false);
  const [inputGems, setInputGems] = useState("");
  const [remainingDays, setRemainingDays] = useState("");
  const [gemXDay, setGemXDay] = useState(0);
  const [currentGems, setCurrentGems] = useState();
  const [monthly, setMonthly] = useState(0);
  const [mockPurchaseCount, setMockPurchaseCount] = useState();
  const [mockGems, setMockGems] = useState(0);
  const [shareGems, setShareGems] = useState(0);
  const [needGems, setNeedGems] = useState(0);

  useEffect(() => {
    let targetGems = 0;
    let mockSum = 0;

    let parse_inputGems = parseInt(inputGems ? inputGems : 0);
    let parse_remainingDays = parseInt(remainingDays ? remainingDays : 0);
    let parse_monthly = parseInt(monthly ? monthly : 0);
    let parse_mockPurchaseCount = parseInt(
      mockPurchaseCount ? mockPurchaseCount : 0,
    );
    let parse_mockGems = parseInt(mockGems ? mockGems : 0);
    let parse_shareGems = parseInt(shareGems ? shareGems : 0);
    let parse_needGems = parseInt(needGems ? needGems : 0);
    let parse_currentGems = parseInt(currentGems ? currentGems : 0);

    // console.log(parse_inputGems);
    // console.log(parse_remainingDays);
    // console.log(parse_monthly);
    // console.log(parse_mockPurchaseCount);
    // console.log(parse_mockGems);
    // console.log(parse_shareGems);
    // console.log(parse_needGems);
    // console.log(parse_currentGems);

    // 오늘의 요일 반환
    let todayLabel = new Date().getDay();
    // 일요일 기준으로 몇주 경과했는지 계산
    let weeklyCount = Math.floor((todayLabel + parse_remainingDays) / 7);
    // D-day의 요일을 계산
    let afterDayLabel = (todayLabel + parse_remainingDays) % 7;
    let calc_monthly = 0;
    let calc_mockGems = 0;

    if (!inputFlag) {
      targetGems = parse_inputGems * parse_remainingDays;
    } else {
      targetGems = parse_inputGems;
    }

    calc_monthly = parse_remainingDays * 30;
    if (isNaN(calc_monthly)) {
      setMonthly(0);
    } else {
      setMonthly(calc_monthly);
    }

    for (let i = 0; i < parse_mockPurchaseCount; i++) {
      mockSum += (i + 1) * 20;
    }
    calc_mockGems = mockSum * parse_remainingDays;
    if (isNaN(calc_mockGems)) {
      setMockGems(0);
    } else {
      setMockGems(calc_mockGems);
    }

    if (isNaN(parse_inputGems * parse_remainingDays)) {
      setGemXDay(0);
    } else {
      setGemXDay(parse_inputGems * parse_remainingDays);
    }
    // 일~토: 0~6
    if (parse_remainingDays !== 0) {
      // (일요일 기준)1주 이상 경과했을 경우
      if (weeklyCount > 0) {
        // D-Day가 그 주의 월요일을 지난 경우
        if (afterDayLabel > 0) {
          setShareGems(weeklyCount * 30);
          // D-Day가 그 주의 월요일을 지나지 않은 경우
        } else {
          setShareGems((weeklyCount - 1) * 30);
        }
        // 입력 날짜가 1주일 미만인 경우
      } else {
        // 오늘이 일요일 인경우, D-Day가 그 주의 월요일을 지난 경우
        if (todayLabel === 0 && afterDayLabel > 0) {
          setShareGems(30);
          // D-Day가 그 주의 월요일을 지나지 않은 경우
        } else {
          setShareGems(0);
        }
      }
    } else {
      setShareGems(0);
    }

    setNeedGems(
      targetGems -
        parse_currentGems -
        parse_monthly +
        parse_mockGems -
        parse_shareGems,
    );
  });

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
              필요 보석량 계산기
            </Text>
          </View>
          <View style={{ width: 50 }} />
        </View>

        <View style={{ padding: "5%" }}>
          <View style={styles.flexRow}>
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
              <Text style={{ textAlign: "center" }}>매일 패키지 계산</Text>
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
              <Text style={{ textAlign: "center" }}>목표 보석량으로 계산</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.flexRow}>
            <View style={[styles.inputLabelsView, { flex: 2 }]}>
              <Text style={styles.inputLabels}>가격 / 수량 입력</Text>
            </View>
            <TextInput
              style={[styles.inputsMiddle, { flex: 2 }]}
              placeholder=""
              keyboardType="numeric"
              onChangeText={text => setInputGems(text)}
              value={inputGems}
            />
            <View style={[styles.valueLables, { flex: 3 }]}>
              <Text style={styles.inputLabels}>
                {!inputFlag
                  ? `${inputGems}개 * ${remainingDays}일 = ${gemXDay}개`
                  : `${inputGems}개`}
              </Text>
            </View>
          </View>

          <View style={styles.flexRow}>
            <View style={[styles.inputLabelsView, { flex: 3 }]}>
              <Text style={styles.inputLabels}>남은 일수 입력</Text>
            </View>
            <TextInput
              style={[styles.inputs, { flex: 2 }]}
              placeholder=""
              keyboardType="numeric"
              onChangeText={text => setRemainingDays(text)}
              value={remainingDays}
            />
          </View>

          <View style={styles.flexRow}>
            <View style={[styles.inputLabelsView, { flex: 3 }]}>
              <Text style={styles.inputLabels}>현재 보석 보유량 입력</Text>
            </View>
            <TextInput
              style={[styles.inputs, { flex: 2 }]}
              placeholder=""
              keyboardType="numeric"
              onChangeText={text => setCurrentGems(text)}
              value={currentGems}
            />
          </View>

          <View style={styles.flexRow}>
            <View style={[styles.inputLabelsView, { flex: 3 }]}>
              <Text style={styles.inputLabels}>월정액 충전량</Text>
            </View>
            <View style={[styles.valueLables, { flex: 2 }]}>
              <Text style={{ textAlign: "right" }}>{monthly}</Text>
            </View>
          </View>

          <View style={styles.flexRow}>
            <View style={[styles.inputLabelsView, { flex: 3 }]}>
              <Text style={styles.inputLabels}>
                모의점수 하루 구매횟수 입력
              </Text>
            </View>
            <TextInput
              style={[styles.inputsMiddle, { flex: 2 }]}
              placeholder=""
              keyboardType="numeric"
              onChangeText={text => setMockPurchaseCount(text)}
              value={mockPurchaseCount}
            />
            {/* type number처럼 가능한지? */}
            <View style={[styles.valueLables, { flex: 1 }]}>
              <Text style={styles.inputLabels}>총 {mockGems}개</Text>
            </View>
          </View>

          <View style={styles.flexRow}>
            <View style={[styles.inputLabelsView, { flex: 3 }]}>
              <Text style={styles.inputLabels}>공유 보석 충전량</Text>
            </View>
            <View style={[styles.valueLables, { flex: 2 }]}>
              <Text style={{ textAlign: "right" }}>{shareGems}개</Text>
            </View>
          </View>

          <View style={styles.flexRow}>
            <View style={[styles.inputLabelsView, { flex: 3 }]}>
              <Text style={styles.inputLabels}>최소 필요량</Text>
            </View>
            <View style={[styles.valueLables, { flex: 2 }]}>
              <Text style={{ textAlign: "right" }}>
                {needGems < 0
                  ? `충분, ${needGems * -1}개 남음`
                  : `${needGems}개 필요`}
              </Text>
            </View>
          </View>
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
  inputs: {
    // flex: 2,
    textAlign: "right",
    height: 40,
    paddingRight: 5,
    paddingLeft: 5,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
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
  switch: {
    flex: 1,
    justifyContent: "center",
    height: 40,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
});

export default GemsCalc;
