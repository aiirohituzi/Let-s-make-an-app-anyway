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

      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" enabled>
        <ScrollView>
          <View style={{ padding: "5%" }}>
            <Modal visible={modalVisible} animationType="slide">
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
                  // onChangeText={text => setNeedBasicData(text)}
                  // value={needBasicData}
                  placeholder="편제 수"
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
                  // onChangeText={text => setNeedIntermediateData(text)}
                  // value={needIntermediateData}
                  placeholder="장탄 수"
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
                  // onChangeText={text => setNeedAdvancedData(text)}
                  // value={needAdvancedData}
                  placeholder="화력"
                  keyboardType="numeric"
                />
              </View>
            </Modal>
          </View>
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
