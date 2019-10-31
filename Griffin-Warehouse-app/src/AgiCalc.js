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
  Modal,
} from "react-native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import "./style/color";
import {
  BORDER_COLOR,
  BORDER_SHADOW,
  OUTPUT_LABEL,
  ADDON_LABEL,
  TAB_ACTIVE,
  TAB_INACTIVE,
  TAB_UNDERLAY,
  SWITCH_ACTIVE,
  SWITCH_UNDERLAY,
} from "./style/color";
import { skillListAR, skillListRF, skillListSG } from "./data";

const typeList = [
  { id: 0, type: "AR" },
  { id: 1, type: "RF" },
  { id: 2, type: "SG" },
];

const AgiCalc = props => {
  const [tdollAgi, setTdollAgi] = useState();
  const [tdollAgiSkill, setTdollAgiSkill] = useState();

  const [buffer1Buff, setBuffer1Buff] = useState("");
  const [buffer2Buff, setBuffer2Buff] = useState("");
  const [buffer3Buff, setBuffer3Buff] = useState("");
  const [buffer4Buff, setBuffer4Buff] = useState("");
  const [buffer1Skill, setBuffer1Skill] = useState("");
  const [buffer2Skill, setBuffer2Skill] = useState("");
  const [buffer3Skill, setBuffer3Skill] = useState("");
  const [buffer4Skill, setBuffer4Skill] = useState("");

  const [calcMode, setCalcMode] = useState(false);
  const [inputFlag, setInputFlag] = useState(false);

  const [needAgiBuff, setNeedAgiBuff] = useState(0);
  const [needAgiBuffAfterSkill, setNeedAgiBuffAfterSkill] = useState(0);

  const [modalTypeVisible, setModalTypeVisible] = useState(false);
  const [modalSkillVisible, setModalSkillVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(0);

  useEffect(() => {
    let sumAgiBuff =
      parseInt(buffer1Buff ? buffer1Buff : 0) +
      parseInt(buffer2Buff ? buffer2Buff : 0) +
      parseInt(buffer3Buff ? buffer3Buff : 0) +
      parseInt(buffer4Buff ? buffer4Buff : 0);
    let mulAgiSkill =
      (1 + parseInt(buffer1Skill ? buffer1Skill : 0) / 100) *
      (1 + parseInt(buffer2Skill ? buffer2Skill : 0) / 100) *
      (1 + parseInt(buffer3Skill ? buffer3Skill : 0) / 100) *
      (1 + parseInt(buffer4Skill ? buffer4Skill : 0) / 100);

    let calc_needAgiBuff =
      116 /
      (parseInt(tdollAgi ? tdollAgi : 0) *
        (1 + sumAgiBuff / 100) *
        mulAgiSkill);
    let calc_needAgiBuffAfterSkill =
      116 /
      (parseInt(tdollAgi ? tdollAgi : 0) *
        (1 + sumAgiBuff / 100) *
        (1 + parseInt(tdollAgiSkill ? tdollAgiSkill : 0) / 100) *
        mulAgiSkill);

    setNeedAgiBuff(Math.ceil((calc_needAgiBuff - 1) * 100));
    setNeedAgiBuffAfterSkill(Math.ceil((calc_needAgiBuffAfterSkill - 1) * 100));
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
              최대사속 계산기
            </Text>
          </View>
          <View style={{ width: 50 }} />
        </View>

        <View style={styles.flexRow}>
          <TouchableHighlight
            style={[
              styles.tab,
              calcMode
                ? {}
                : {
                    backgroundColor: TAB_ACTIVE,
                    borderBottomWidth: 1.5,
                    borderRightWidth: 1,
                    borderBottomColor: BORDER_SHADOW,
                    borderRightColor: BORDER_SHADOW,
                  },
            ]}
            underlayColor={TAB_UNDERLAY}
            onPress={() => setCalcMode(false)}
          >
            <Text style={{ textAlign: "center" }}>단순계산</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[
              styles.tab,
              {
                borderLeftWidth: 0,
              },
              calcMode
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
            onPress={() => setCalcMode(true)}
          >
            <Text style={{ textAlign: "center" }}>상세계산</Text>
          </TouchableHighlight>
        </View>

        <View style={{ padding: "5%" }}>
          <View style={styles.flexRow}>
            <View style={[styles.inputLabelsView, { flex: 3 }]}>
              <Text style={styles.inputLabels}>인형 사속 입력</Text>
            </View>
            <TextInput
              style={[styles.inputs, { flex: 2 }]}
              placeholder="사속"
              keyboardType="numeric"
              onChangeText={text => setTdollAgi(text)}
              value={tdollAgi}
            />
          </View>

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
              <Text style={{ textAlign: "center" }}>스킬 사속 직접 입력</Text>
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
              <Text style={{ textAlign: "center" }}>목록에서 선택</Text>
            </TouchableHighlight>
          </View>

          <Modal
            animationType="slide"
            transparent={false}
            visible={modalTypeVisible}
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
                  인형 병종 선택
                </Text>
              </View>
              <ScrollView>
                {typeList.map(data => {
                  return (
                    <TouchableHighlight
                      key={data.id}
                      underlayColor={OUTPUT_LABEL}
                      style={styles.selectItem}
                      onPress={() => {
                        setSelectedType(data.id);
                        setModalTypeVisible(false);
                      }}
                    >
                      <Text style={styles.selectItemText}>{data.type}</Text>
                    </TouchableHighlight>
                  );
                })}
              </ScrollView>
            </View>
          </Modal>

          {!inputFlag ? (
            <View style={styles.flexRow}>
              <View style={[styles.inputLabelsView, { flex: 3 }]}>
                <Text style={styles.inputLabels}>
                  인형 사속 스킬 배율 입력(%)
                </Text>
              </View>
              <TextInput
                style={[styles.inputs, { flex: 2 }]}
                placeholder="스킬 배율(%)"
                keyboardType="numeric"
                onChangeText={text => setTdollAgiSkill(text)}
                value={tdollAgiSkill}
              />
            </View>
          ) : (
            <View style={styles.flexRow}>
              <View style={[styles.inputLabelsView, { flex: 2 }]}>
                <Text style={styles.inputLabels}>스킬 선택</Text>
              </View>
              <TouchableHighlight
                underlayColor={OUTPUT_LABEL}
                style={[styles.selectsView, { flex: 2, borderRightWidth: 0 }]}
                onPress={() => setModalTypeVisible(true)}
              >
                <Text style={{ textAlign: "right" }}>
                  {typeList[selectedType].type} ▼
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={OUTPUT_LABEL}
                style={[
                  styles.selectsView,
                  {
                    flex: 8,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                  },
                ]}
              >
                <Text style={{ textAlign: "right" }}>
                  {typeList[selectedType].type === "AR"
                    ? skillListAR[selectedSkill].name
                    : typeList[selectedType].type === "RF"
                    ? skillListRF[selectedSkill].name
                    : typeList[selectedType].type === "SG"
                    ? skillListSG[selectedSkill].name
                    : null}{" "}
                  ▼
                </Text>
              </TouchableHighlight>
            </View>
          )}

          {calcMode ? (
            <View>
              <View style={[styles.baseLabelsView, styles.radiusTitle]}>
                <Text style={styles.baseLabelsAlignCenter}>
                  사속 버퍼 정보 입력
                </Text>
              </View>
              <View style={styles.flexRowNoMargin}>
                <View style={[styles.baseLabelsView, { flex: 1 }]}>
                  <Text style={styles.baseLabelsAlignCenter}>
                    버퍼 인형 선택
                  </Text>
                </View>
                <View style={[styles.baseLabelsView, { flex: 1 }]}>
                  <Text style={styles.baseLabelsAlignCenter}>
                    사속 진형버프
                  </Text>
                </View>
                <View style={[styles.baseLabelsView, { flex: 1 }]}>
                  <Text style={styles.baseLabelsAlignCenter}>
                    버프 스킬 배율
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
                  <Text style={{ textAlign: "center" }}>버퍼 인형 1</Text>
                </View>
                <TextInput
                  style={[styles.inputsMiddle, { flex: 1, borderTopWidth: 0 }]}
                  onChangeText={text => setBuffer1Buff(text)}
                  value={buffer1Buff}
                  placeholder="인형1 진형버프"
                  keyboardType="numeric"
                />
                <TextInput
                  style={[
                    styles.inputs,
                    {
                      flex: 1,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      borderTopWidth: 0,
                    },
                  ]}
                  onChangeText={text => setBuffer1Skill(text)}
                  value={buffer1Skill}
                  placeholder="인형1 스킬배율"
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
                  <Text style={{ textAlign: "center" }}>버퍼 인형 2</Text>
                </View>
                <TextInput
                  style={[styles.inputsMiddle, { flex: 1, borderTopWidth: 0 }]}
                  onChangeText={text => setBuffer2Buff(text)}
                  value={buffer2Buff}
                  placeholder="인형2 진형버프"
                  keyboardType="numeric"
                />
                <TextInput
                  style={[
                    styles.inputs,
                    {
                      flex: 1,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      borderTopWidth: 0,
                    },
                  ]}
                  onChangeText={text => setBuffer2Skill(text)}
                  value={buffer2Skill}
                  placeholder="인형2 스킬배율"
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
                  <Text style={{ textAlign: "center" }}>버퍼 인형 3</Text>
                </View>
                <TextInput
                  style={[styles.inputsMiddle, { flex: 1, borderTopWidth: 0 }]}
                  onChangeText={text => setBuffer3Buff(text)}
                  value={buffer3Buff}
                  placeholder="인형3 진형버프"
                  keyboardType="numeric"
                />
                <TextInput
                  style={[
                    styles.inputs,
                    {
                      flex: 1,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      borderTopWidth: 0,
                    },
                  ]}
                  onChangeText={text => setBuffer3Skill(text)}
                  value={buffer3Skill}
                  placeholder="인형3 스킬배율"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.flexRow}>
                <View
                  style={[
                    styles.baseLabelsView,
                    { flex: 1, borderTopWidth: 0, borderRightWidth: 0 },
                  ]}
                >
                  <Text style={{ textAlign: "center" }}>버퍼 인형 4</Text>
                </View>
                <TextInput
                  style={[styles.inputsMiddle, { flex: 1, borderTopWidth: 0 }]}
                  onChangeText={text => setBuffer4Buff(text)}
                  value={buffer4Buff}
                  placeholder="인형4 진형버프"
                  keyboardType="numeric"
                />
                <TextInput
                  style={[
                    styles.inputs,
                    { flex: 1, borderTopWidth: 0, borderTopRightRadius: 0 },
                  ]}
                  onChangeText={text => setBuffer4Skill(text)}
                  value={buffer4Skill}
                  placeholder="인형4 스킬배율"
                  keyboardType="numeric"
                />
              </View>
            </View>
          ) : null}

          <View style={styles.flexRow}>
            <View style={[styles.inputLabelsView, { flex: 3 }]}>
              <Text style={styles.inputLabels}>필요 버프량</Text>
            </View>
            <View style={[styles.valueLables, { flex: 2 }]}>
              <Text style={{ textAlign: "right" }}>
                {!isFinite(needAgiBuff) || needAgiBuff < 0 ? 0 : needAgiBuff}%
              </Text>
            </View>
          </View>
          <View style={styles.flexRow}>
            <View style={[styles.inputLabelsView, { flex: 3 }]}>
              <Text style={styles.inputLabels}>자버프 사용 후 필요 버프량</Text>
            </View>
            <View style={[styles.valueLables, { flex: 2 }]}>
              <Text style={{ textAlign: "right" }}>
                {!isFinite(needAgiBuffAfterSkill) || needAgiBuffAfterSkill < 0
                  ? 0
                  : needAgiBuffAfterSkill}
                %
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

  baseLabelsView: {
    // flex: 3,
    height: 40,
    paddingRight: 5,
    paddingLeft: 5,

    borderColor: BORDER_COLOR,
    borderWidth: 1,
    backgroundColor: ADDON_LABEL,
    alignItems: "stretch",
    justifyContent: "center",
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
  baseLabelsAlignCenter: {
    // flex: 3,
    // height: 40,
    // lineHeight: 40,
    textAlign: "center",

    // borderColor: 'gray',
    // borderWidth: 1,
    // borderTopLeftRadius: 5,
    // borderBottomLeftRadius: 5,
  },
  baseLabelsAlignRight: {
    // flex: 3,
    // height: 40,
    // lineHeight: 40,
    paddingRight: 5,
    paddingLeft: 5,
    textAlign: "right",

    // borderColor: 'gray',
    // borderWidth: 1,
    // borderTopLeftRadius: 5,
    // borderBottomLeftRadius: 5,
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
  tab: {
    flex: 1,
    justifyContent: "center",
    height: 40,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: BORDER_COLOR,
    backgroundColor: TAB_INACTIVE,
  },
  switch: {
    flex: 1,
    justifyContent: "center",
    height: 40,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  selectsView: {
    alignItems: "stretch",
    justifyContent: "center",
    height: 40,
    paddingRight: 5,
    paddingLeft: 5,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
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
});

export default AgiCalc;
