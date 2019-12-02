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
  SWITCH_ACTIVE,
  SWITCH_UNDERLAY,
} from "./style/color";

const OperationalEffectivenessCalc = props => {
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {});

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
            작전능력 계산기
          </Text>
        </View>
        <View style={{ width: 50 }} />
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <View
          style={{
            flex: 1,
            // padding: 10,
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
            <View style={{ width: 50 }} />
            <Text
              style={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: 20,
              }}
            >
              사속 프레임 표
            </Text>
            <TouchableOpacity
              style={styles.btnMenu}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                <Icon name="md-close" size={30} color="#555" />
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView indicatorStyle="black">
            <View style={{ padding: 10 }}>
              <View style={[styles.baseLabelsView, styles.radiusTitle]}>
                <Text style={styles.baseLabelsAlignCenter}>
                  필요 사용량 입력
                </Text>
              </View>
              <View style={styles.flexRowNoMargin}>
                <View
                  style={[
                    styles.baseLabelsView,
                    { flex: 1, borderTopWidth: 0, borderRightWidth: 0 },
                  ]}
                >
                  <Text style={{ textAlign: "center" }}>편제 수</Text>
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
                  // onChangeText={text => setNeedBasicData(text)}
                  // value={needBasicData}
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
                  <Text style={{ textAlign: "center" }}>장탄 수</Text>
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
                  // onChangeText={text => set(text)}
                  // value={}
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
                  <Text style={{ textAlign: "center" }}>화력</Text>
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
                  // onChangeText={text => set(text)}
                  // value={}
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
                  <Text style={{ textAlign: "center" }}>관통</Text>
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
                  // onChangeText={text => set(text)}
                  // value={}
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
                  <Text style={{ textAlign: "center" }}>장갑</Text>
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
                  // onChangeText={text => set(text)}
                  // value={}
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
                  <Text style={{ textAlign: "center" }}>치명률</Text>
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
                  // onChangeText={text => set(text)}
                  // value={}
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
                  <Text style={{ textAlign: "center" }}>치명상</Text>
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
                  // onChangeText={text => set(text)}
                  // value={}
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
                  <Text style={{ textAlign: "center" }}>사속</Text>
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
                  // onChangeText={text => set(text)}
                  // value={}
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
                  <Text style={{ textAlign: "center" }}>명중</Text>
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
                  // onChangeText={text => set(text)}
                  // value={}
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
                  <Text style={{ textAlign: "center" }}>체력</Text>
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
                  // onChangeText={text => set(text)}
                  // value={}
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
                  <Text style={{ textAlign: "center" }}>회피</Text>
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
                  // onChangeText={text => set(text)}
                  // value={}
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
                  <Text style={{ textAlign: "center" }}>등급(별 수)</Text>
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
                  // onChangeText={text => set(text)}
                  // value={}
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
                  <Text style={{ textAlign: "center" }}>스킬 1레벨</Text>
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
                  // onChangeText={text => set(text)}
                  // value={}
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
                  <Text style={{ textAlign: "center" }}>스킬2 레벨</Text>
                </View>
                <TextInput
                  style={[
                    styles.inputs,
                    { flex: 1, borderTopWidth: 0, borderTopRightRadius: 0 },
                  ]}
                  // onChangeText={text => set(text)}
                  // value={}
                  keyboardType="numeric"
                />
              </View>

              <View style={[styles.baseLabelsView, styles.radiusTitle]}>
                <Text style={styles.baseLabelsAlignCenter}>
                  인형이 받는 진형버프
                </Text>
              </View>
              <View style={styles.flexRowNoMargin}>
                <View
                  style={[
                    styles.baseLabelsView,
                    { flex: 1, borderTopWidth: 0, borderRightWidth: 0 },
                  ]}
                >
                  <Text style={{ textAlign: "center" }}>화력</Text>
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
                  // onChangeText={text => set(text)}
                  // value={}
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
                  <Text style={{ textAlign: "center" }}>장갑</Text>
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
                  // onChangeText={text => set(text)}
                  // value={}
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
                  <Text style={{ textAlign: "center" }}>치명률</Text>
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
                  // onChangeText={text => set(text)}
                  // value={}
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
                  <Text style={{ textAlign: "center" }}>사속</Text>
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
                  // onChangeText={text => set(text)}
                  // value={}
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
                  <Text style={{ textAlign: "center" }}>명중</Text>
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
                  // onChangeText={text => set(text)}
                  // value={}
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
                  <Text style={{ textAlign: "center" }}>회피</Text>
                </View>
                <TextInput
                  style={[
                    styles.inputs,
                    { flex: 1, borderTopWidth: 0, borderTopRightRadius: 0 },
                  ]}
                  // onChangeText={text => set(text)}
                  // value={}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" enabled>
        <ScrollView>
          <View style={{ padding: "5%" }}></View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
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
  radiusTitle: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
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
});

export default OperationalEffectivenessCalc;
