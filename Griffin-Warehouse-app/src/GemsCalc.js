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
            <View style={[styles.inputLabelsView, { flex: 3 }]}>
              <Text style={styles.inputLabels}>가격 / 수량 입력</Text>
            </View>
            <TextInput
              style={[styles.inputs, { flex: 2 }]}
              placeholder=""
              keyboardType="numeric"
            />
          </View>

          <View style={styles.flexRow}>
            <View style={[styles.inputLabelsView, { flex: 3 }]}>
              <Text style={styles.inputLabels}>남은 일수 입력</Text>
            </View>
            <TextInput
              style={[styles.inputs, { flex: 2 }]}
              placeholder=""
              keyboardType="numeric"
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
            />
          </View>

          <View style={styles.flexRow}>
            <View style={[styles.inputLabelsView, { flex: 3 }]}>
              <Text style={styles.inputLabels}>월정액 충전량</Text>
            </View>
            <View style={[styles.valueLables, { flex: 2 }]}>
              <Text style={{ textAlign: "right" }}>결과값</Text>
            </View>
          </View>

          <View style={styles.flexRow}>
            <View style={[styles.inputLabelsView, { flex: 3 }]}>
              <Text style={styles.inputLabels}>
                모의점수 하루 구매횟수 입력
              </Text>
            </View>
            <TextInput
              style={[styles.inputs, { flex: 2 }]}
              placeholder=""
              keyboardType="numeric"
            />
            {/* type number처럼 가능한지? */}
          </View>

          <View style={styles.flexRow}>
            <View style={[styles.inputLabelsView, { flex: 3 }]}>
              <Text style={styles.inputLabels}>공유 보석 충전량</Text>
            </View>
            <View style={[styles.valueLables, { flex: 2 }]}>
              <Text style={{ textAlign: "right" }}>결과값</Text>
            </View>
          </View>

          <View style={styles.flexRow}>
            <View style={[styles.inputLabelsView, { flex: 3 }]}>
              <Text style={styles.inputLabels}>최소 필요량</Text>
            </View>
            <View style={[styles.valueLables, { flex: 2 }]}>
              <Text style={{ textAlign: "right" }}>결과값</Text>
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
