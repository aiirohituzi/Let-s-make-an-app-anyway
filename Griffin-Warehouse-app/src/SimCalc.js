import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
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
} from "./style/color";

const SimCalc = props => {
  const [basicData, setBasicData] = useState("");
  const [intermediateData, setIntermediateData] = useState("");
  const [advancedData, setAdvancedData] = useState("");
  const [currentSimEnergy, setCurrentSimEnergy] = useState("");

  const [needBasicData, setNeedBasicData] = useState("");
  const [needIntermediateData, setNeedIntermediateData] = useState("");
  const [needAdvancedData, setNeedAdvancedData] = useState("");

  const [needSimEnergy_basic, setNeedSimEnergy_basic] = useState(0);
  const [needSimEnergy_intermediate, setNeedSimEnergy_intermediate] = useState(
    0,
  );
  const [needSimEnergy_advanced, setNeedSimEnergy_advanced] = useState(0);
  const [needSimEnergy_sum, setNeedSimEnergy_sum] = useState(0);
  const [needSimPurchase, setNeedSimPurchase] = useState(0);

  const [getBasicData, setGetBasicData] = useState(218);
  const [getIntermediateData, setGetIntermediateData] = useState(98);
  const [getAdvancedData, setGetAdvancedData] = useState(53);

  useEffect(() => {
    if (
      (needBasicData - basicData) / getBasicData < 0 ||
      isNaN((needBasicData - basicData) / getBasicData)
    ) {
      setNeedSimEnergy_basic(0);
    } else {
      setNeedSimEnergy_basic(
        Math.ceil((needBasicData - basicData) / getBasicData),
      );
    }
    if (
      (needIntermediateData - intermediateData) / getIntermediateData < 0 ||
      isNaN((needIntermediateData - intermediateData) / getIntermediateData)
    ) {
      setNeedSimEnergy_intermediate(0);
    } else {
      setNeedSimEnergy_intermediate(
        Math.ceil(
          (needIntermediateData - intermediateData) / getIntermediateData,
        ) * 2,
      );
    }
    if (
      (needAdvancedData - advancedData) / getAdvancedData < 0 ||
      isNaN((needAdvancedData - advancedData) / getAdvancedData)
    ) {
      setNeedSimEnergy_advanced(0);
    } else {
      setNeedSimEnergy_advanced(
        Math.ceil((needAdvancedData - advancedData) / getAdvancedData) * 3,
      );
    }

    if (
      needSimEnergy_basic +
        needSimEnergy_intermediate +
        needSimEnergy_advanced -
        currentSimEnergy <
        0 ||
      isNaN(
        needSimEnergy_basic +
          needSimEnergy_intermediate +
          needSimEnergy_advanced -
          currentSimEnergy,
      )
    ) {
      setNeedSimEnergy_sum(0);
    } else {
      setNeedSimEnergy_sum(
        needSimEnergy_basic +
          needSimEnergy_intermediate +
          needSimEnergy_advanced -
          currentSimEnergy,
      );
    }

    setNeedSimPurchase(Math.ceil(needSimEnergy_sum / 3));
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
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            필요 모의작전점수 계산기
          </Text>
        </View>
        <View style={{ width: 50 }} />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" enabled>
        <ScrollView>
          <View style={{ padding: "5%" }}>
            <View style={[styles.flexRow, { justifyContent: "center" }]}>
              <Text>
                모의작전 1회당 스킬칩 획득량 / 초급:{getBasicData}, 중급:
                {getIntermediateData}, 고급:{getAdvancedData}
              </Text>
            </View>
            <View style={[styles.baseLabelsView, styles.radiusTitle]}>
              <Text style={styles.baseLabelsAlignCenter}>
                스킬칩 및 모의점수 보유량 입력
              </Text>
            </View>
            <View style={styles.flexRowNoMargin}>
              <View
                style={[
                  styles.baseLabelsView,
                  { flex: 1, borderTopWidth: 0, borderRightWidth: 0 },
                ]}
              >
                <Text style={{ textAlign: "center" }}>초급</Text>
              </View>
              <TextInput
                style={[
                  styles.inputs,
                  {
                    flex: 1,
                    borderTopWidth: 0,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                ]}
                onChangeText={text => setBasicData(text)}
                value={basicData}
                placeholder="초급 자료"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.flexRowNoMargin}>
              <View
                style={[
                  styles.baseLabelsView,
                  { flex: 1, borderTopWidth: 0, borderRightWidth: 0 },
                ]}
              >
                <Text style={{ textAlign: "center" }}>중급</Text>
              </View>
              <TextInput
                style={[
                  styles.inputs,
                  {
                    flex: 1,
                    borderTopWidth: 0,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                ]}
                onChangeText={text => setIntermediateData(text)}
                value={intermediateData}
                placeholder="중급 자료"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.flexRowNoMargin}>
              <View
                style={[
                  styles.baseLabelsView,
                  { flex: 1, borderTopWidth: 0, borderRightWidth: 0 },
                ]}
              >
                <Text style={{ textAlign: "center" }}>고급</Text>
              </View>
              <TextInput
                style={[
                  styles.inputs,
                  {
                    flex: 1,
                    borderTopWidth: 0,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                ]}
                onChangeText={text => setAdvancedData(text)}
                value={advancedData}
                placeholder="고급 자료"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.flexRow}>
              <View
                style={[
                  styles.baseLabelsView,
                  {
                    flex: 1,
                    borderTopWidth: 0,
                    borderRightWidth: 0,
                    borderBottomLeftRadius: 5,
                  },
                ]}
              >
                <Text style={{ textAlign: "center" }}>모의점수</Text>
              </View>
              <TextInput
                style={[
                  styles.inputs,
                  { flex: 1, borderTopWidth: 0, borderTopRightRadius: 0 },
                ]}
                onChangeText={text => setCurrentSimEnergy(text)}
                value={currentSimEnergy}
                placeholder="모의점수"
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.baseLabelsView, styles.radiusTitle]}>
              <Text style={styles.baseLabelsAlignCenter}>필요 사용량 입력</Text>
            </View>
            <View style={styles.flexRowNoMargin}>
              <View
                style={[
                  styles.baseLabelsView,
                  { flex: 1, borderTopWidth: 0, borderRightWidth: 0 },
                ]}
              >
                <Text style={{ textAlign: "center" }}>초급</Text>
              </View>
              <TextInput
                style={[
                  styles.inputs,
                  {
                    flex: 1,
                    borderTopWidth: 0,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                ]}
                onChangeText={text => setNeedBasicData(text)}
                value={needBasicData}
                placeholder="초급 자료"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.flexRowNoMargin}>
              <View
                style={[
                  styles.baseLabelsView,
                  { flex: 1, borderTopWidth: 0, borderRightWidth: 0 },
                ]}
              >
                <Text style={{ textAlign: "center" }}>중급</Text>
              </View>
              <TextInput
                style={[
                  styles.inputs,
                  {
                    flex: 1,
                    borderTopWidth: 0,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                ]}
                onChangeText={text => setNeedIntermediateData(text)}
                value={needIntermediateData}
                placeholder="중급 자료"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.flexRow}>
              <View
                style={[
                  styles.baseLabelsView,
                  {
                    flex: 1,
                    borderTopWidth: 0,
                    borderRightWidth: 0,
                    borderBottomLeftRadius: 5,
                  },
                ]}
              >
                <Text style={{ textAlign: "center" }}>고급</Text>
              </View>
              <TextInput
                style={[
                  styles.inputs,
                  { flex: 1, borderTopWidth: 0, borderTopRightRadius: 0 },
                ]}
                onChangeText={text => setNeedAdvancedData(text)}
                value={needAdvancedData}
                placeholder="고급 자료"
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.baseLabelsView, styles.radiusTitle]}>
              <Text style={styles.baseLabelsAlignCenter}>필요 모의점수</Text>
            </View>
            <View style={styles.flexRowNoMargin}>
              <View
                style={[
                  styles.baseLabelsView,
                  { flex: 1, borderTopWidth: 0, borderRightWidth: 0 },
                ]}
              >
                <Text style={{ textAlign: "center" }}>초급</Text>
              </View>
              <View
                style={[
                  styles.resultLabelsView,
                  {
                    flex: 1,
                    borderTopWidth: 0,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                ]}
              >
                <Text style={{ textAlign: "right" }}>
                  {needSimEnergy_basic}
                </Text>
              </View>
            </View>
            <View style={styles.flexRowNoMargin}>
              <View
                style={[
                  styles.baseLabelsView,
                  { flex: 1, borderTopWidth: 0, borderRightWidth: 0 },
                ]}
              >
                <Text style={{ textAlign: "center" }}>중급</Text>
              </View>
              <View
                style={[
                  styles.resultLabelsView,
                  {
                    flex: 1,
                    borderTopWidth: 0,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                ]}
              >
                <Text style={{ textAlign: "right" }}>
                  {needSimEnergy_intermediate}
                </Text>
              </View>
            </View>
            <View style={styles.flexRowNoMargin}>
              <View
                style={[
                  styles.baseLabelsView,
                  { flex: 1, borderTopWidth: 0, borderRightWidth: 0 },
                ]}
              >
                <Text style={{ textAlign: "center" }}>고급</Text>
              </View>
              <View
                style={[
                  styles.resultLabelsView,
                  {
                    flex: 1,
                    borderTopWidth: 0,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                ]}
              >
                <Text style={{ textAlign: "right" }}>
                  {needSimEnergy_advanced}
                </Text>
              </View>
            </View>
            <View style={styles.flexRowNoMargin}>
              <View
                style={[
                  styles.baseLabelsView,
                  { flex: 1, borderTopWidth: 0, borderRightWidth: 0 },
                ]}
              >
                <Text style={{ textAlign: "center" }}>합계</Text>
              </View>
              <View
                style={[
                  styles.resultLabelsView,
                  {
                    flex: 1,
                    borderTopWidth: 0,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                ]}
              >
                <Text style={{ textAlign: "right" }}>{needSimEnergy_sum}</Text>
              </View>
            </View>
            <View style={styles.flexRow}>
              <View
                style={[
                  styles.baseLabelsView,
                  {
                    flex: 1,
                    borderTopWidth: 0,
                    borderRightWidth: 0,
                    borderBottomLeftRadius: 5,
                  },
                ]}
              >
                <Text style={{ textAlign: "center" }}>필요구매횟수</Text>
              </View>
              <View
                style={[
                  styles.resultLabelsView,
                  { flex: 1, borderTopWidth: 0, borderBottomRightRadius: 5 },
                ]}
              >
                <Text style={{ textAlign: "right" }}>{needSimPurchase}</Text>
              </View>
            </View>
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

export default SimCalc;
