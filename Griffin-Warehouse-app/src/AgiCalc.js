import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";

const AgiCalc = props => {
  const [buffer1Buff, setBuffer1Buff] = useState("");
  const [buffer2Buff, setBuffer2Buff] = useState("");
  const [buffer3Buff, setBuffer3Buff] = useState("");
  const [buffer4Buff, setBuffer4Buff] = useState("");
  const [buffer1Skill, setBuffer1Skill] = useState("");
  const [buffer2Skill, setBuffer2Skill] = useState("");
  const [buffer3Skill, setBuffer3Skill] = useState("");
  const [buffer4Skill, setBuffer4Skill] = useState("");

  const [inputFlag, setInputFlag] = useState(false);

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

        <View style={{ padding: "5%" }}>
          <View style={styles.flexRow}>
            <View style={[styles.inputLabelsView, { flex: 3 }]}>
              <Text style={styles.inputLabels}>인형 사속 입력</Text>
            </View>
            <TextInput
              style={[styles.inputs, { flex: 2 }]}
              placeholder="사속"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.flexRow}>
            <TouchableOpacity
              style={[
                {
                  flex: 1,
                  justifyContent: "center",
                  height: 40,
                  borderWidth: 1,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                },
                inputFlag ? {} : { backgroundColor: "#ddd" },
              ]}
              onPress={() => setInputFlag(false)}
            >
              <Text style={{ textAlign: "center" }}>스킬 사속 직접 입력</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                {
                  flex: 1,
                  justifyContent: "center",
                  height: 40,
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                },
                inputFlag ? { backgroundColor: "#ddd" } : {},
              ]}
              onPress={() => setInputFlag(true)}
            >
              <Text style={{ textAlign: "center" }}>목록에서 선택</Text>
            </TouchableOpacity>
          </View>
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
            />
          </View>
          <View style={[styles.baseLabelsView, styles.radiusTitle]}>
            <Text style={styles.baseLabelsAlignCenter}>
              사속 버퍼 정보 입력
            </Text>
          </View>
          <View style={styles.flexRowNoMargin}>
            <View style={[styles.baseLabelsView, { flex: 1 }]}>
              <Text style={styles.baseLabelsAlignCenter}>버퍼 인형 선택</Text>
            </View>
            <View style={[styles.baseLabelsView, { flex: 1 }]}>
              <Text style={styles.baseLabelsAlignCenter}>사속 진형버프</Text>
            </View>
            <View style={[styles.baseLabelsView, { flex: 1 }]}>
              <Text style={styles.baseLabelsAlignCenter}>버프 스킬 배율</Text>
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

          <View style={styles.flexRow}>
            <View style={[styles.inputLabelsView, { flex: 3 }]}>
              <Text style={styles.inputLabels}>필요 버프량</Text>
            </View>
            <View style={[styles.valueLables, { flex: 2 }]}>
              <Text style={{ textAlign: "right" }}>0</Text>
            </View>
          </View>
          <View style={styles.flexRow}>
            <View style={[styles.inputLabelsView, { flex: 3 }]}>
              <Text style={styles.inputLabels}>자버프 사용 후 필요 버프량</Text>
            </View>
            <View style={[styles.valueLables, { flex: 2 }]}>
              <Text style={{ textAlign: "right" }}>0</Text>
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

    borderColor: "#bbb",
    borderWidth: 1,
    borderRightWidth: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: "#bbb",
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
    borderColor: "#bbb",
    borderWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },

  baseLabelsView: {
    // flex: 3,
    height: 40,
    paddingRight: 5,
    paddingLeft: 5,

    borderColor: "#bbb",
    borderWidth: 1,
    backgroundColor: "#bbb",
    alignItems: "stretch",
    justifyContent: "center",
  },
  resultLabelsView: {
    // flex: 3,
    height: 40,
    paddingRight: 5,
    paddingLeft: 5,

    borderColor: "#bbb",
    borderWidth: 1,
    backgroundColor: "#ddd",
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
    borderColor: "#bbb",
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
    borderColor: "#bbb",
    backgroundColor: "#ddd",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: "center",
  },
});

export default AgiCalc;
