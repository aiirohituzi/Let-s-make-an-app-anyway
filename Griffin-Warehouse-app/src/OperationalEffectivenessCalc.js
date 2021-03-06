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
  TouchableHighlight,
  Picker,
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
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [selected, setSelected] = useState(0);
  const [tdollStat1, setTdollStat1] = useState({
    type: "MG",
    operationalEffectiveness: 0,
  });
  const [tdollStat2, setTdollStat2] = useState({
    type: "MG",
    operationalEffectiveness: 0,
  });
  const [tdollStat3, setTdollStat3] = useState({
    type: "MG",
    operationalEffectiveness: 0,
  });
  const [tdollStat4, setTdollStat4] = useState({
    type: "MG",
    operationalEffectiveness: 0,
  });
  const [tdollStat5, setTdollStat5] = useState({
    type: "MG",
    operationalEffectiveness: 0,
  });
  const tdollType = ["MG", "SG", "SMG, AR, RF, HG"];

  const tdollStats = [
    tdollStat1,
    tdollStat2,
    tdollStat3,
    tdollStat4,
    tdollStat5,
  ];
  const setTdollStats = [
    setTdollStat1,
    setTdollStat2,
    setTdollStat3,
    setTdollStat4,
    setTdollStat5,
  ];

  const calcOE = () => {
    // console.log(tdollStats);

    let attack = 0;
    let defense = 0;
    let skill = 0;

    for (let i = 0; i < 5; i++) {
      let armor = Math.ceil(
        parseInt(tdollStats[i].armor ? tdollStats[i].armor : 0) *
          (1 +
            parseInt(tdollStats[i].armorBuff ? tdollStats[i].armorBuff : 0) /
              100),
      );
      let armorCoefficient = 1;
      if (armor < 75) {
        armorCoefficient = 75 - armor;
      }

      let str = Math.ceil(
        parseInt(tdollStats[i].str ? tdollStats[i].str : 0) *
          (1 +
            parseInt(tdollStats[i].strBuff ? tdollStats[i].strBuff : 0) / 100),
      );
      let criticalRate = Math.ceil(
        parseInt(tdollStats[i].criticalRate ? tdollStats[i].criticalRate : 0) *
          (1 +
            parseInt(
              tdollStats[i].criticalRateBuff
                ? tdollStats[i].criticalRateBuff
                : 0,
            ) /
              100),
      );
      let agi = Math.ceil(
        parseInt(tdollStats[i].agi ? tdollStats[i].agi : 0) *
          (1 +
            parseInt(tdollStats[i].agiBuff ? tdollStats[i].agiBuff : 0) / 100),
      );
      let dex = Math.ceil(
        parseInt(tdollStats[i].dex ? tdollStats[i].dex : 0) *
          (1 +
            parseInt(tdollStats[i].dexBuff ? tdollStats[i].dexBuff : 0) / 100),
      );
      let agl = Math.ceil(
        parseInt(tdollStats[i].agl ? tdollStats[i].agl : 0) *
          (1 +
            parseInt(tdollStats[i].aglBuff ? tdollStats[i].aglBuff : 0) / 100),
      );
      // console.log(i, armor, str, criticalRate, agi, dex, agl);

      let link = tdollStats[i].link ? parseInt(tdollStats[i].link) : 0;
      let bullet = tdollStats[i].bullet ? parseInt(tdollStats[i].bullet) : 0;
      let armorPenetration = tdollStats[i].armorPenetration
        ? parseInt(tdollStats[i].armorPenetration)
        : 0;
      let criticalDamageRate = tdollStats[i].criticalDamageRate
        ? parseInt(tdollStats[i].criticalDamageRate)
        : 0;
      let hp = tdollStats[i].hp ? parseInt(tdollStats[i].hp) : 0;
      let skill2Lv = tdollStats[i].skill2Lv
        ? parseInt(tdollStats[i].skill2Lv)
        : 0;
      let rating = tdollStats[i].rating ? parseInt(tdollStats[i].rating) : 0;
      let skill1Lv = tdollStats[i].skill1Lv
        ? parseInt(tdollStats[i].skill1Lv)
        : 0;

      if (tdollStats[i].type === tdollType[0]) {
        //MG
        attack =
          7 *
          link *
          ((((bullet *
            (str + armorPenetration / 3) *
            ((criticalRate / 100) * ((criticalDamageRate - 100) / 100) + 1)) /
            (bullet / 3 + 4 + 200 / agi)) *
            dex) /
            (dex + 23) +
            8);
      } else if (tdollStats[i].type === tdollType[1]) {
        //SG
        attack =
          6 *
          link *
          ((((3 *
            bullet *
            (str + armorPenetration / 3) *
            ((criticalRate / 100) * ((criticalDamageRate - 100) / 100) + 1)) /
            (1.5 + (bullet * 50) / agi + 0.5 * bullet)) *
            dex) /
            (dex + 23) +
            8);
      } else if (tdollStats[i].type === tdollType[2]) {
        //AR, SMG, RF, HG
        attack =
          5 *
          link *
          (((((str + armorPenetration / 3) *
            ((criticalRate / 100) * ((criticalDamageRate - 100) / 100) + 1) *
            agi) /
            50) *
            dex) /
            (dex + 23) +
            8);
      }

      defense =
        (((hp / link) * link * (35 + agl)) / 35) *
        ((2.6 * 75) / armorCoefficient - 1.6);

      if (skill2Lv > 0) {
        skill =
          link *
          (0.8 + rating / 10) *
          (35 + 5 * (skill1Lv - 1) + (3 + 2 / 3) * (skill2Lv - 1));
      } else {
        skill = link * (0.8 + rating / 10) * (35 + 5 * (skill1Lv - 1));
      }

      var operationalEffectiveness =
        Math.ceil(attack) + Math.ceil(defense) + Math.ceil(skill);

      if (isNaN(operationalEffectiveness)) {
        operationalEffectiveness = 0;
      }

      setTdollStats[i]({
        ...tdollStats[i],
        operationalEffectiveness: operationalEffectiveness,
      });
    }
  };

  const modalOpen = select => {
    setSelected(select);
    setModalVisible(true);
  };

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

      <ScrollView>
        <View style={{ padding: "5%" }}>
          <TouchableHighlight
            style={styles.btn}
            underlayColor={SWITCH_UNDERLAY}
            onPress={() => modalOpen(0)}
          >
            <Text style={{ textAlign: "center" }}>인형1 정보입력</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.btn}
            underlayColor={SWITCH_UNDERLAY}
            onPress={() => modalOpen(1)}
          >
            <Text style={{ textAlign: "center" }}>인형2 정보입력</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.btn}
            underlayColor={SWITCH_UNDERLAY}
            onPress={() => modalOpen(2)}
          >
            <Text style={{ textAlign: "center" }}>인형3 정보입력</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.btn}
            underlayColor={SWITCH_UNDERLAY}
            onPress={() => modalOpen(3)}
          >
            <Text style={{ textAlign: "center" }}>인형4 정보입력</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.btn}
            underlayColor={SWITCH_UNDERLAY}
            onPress={() => modalOpen(4)}
          >
            <Text style={{ textAlign: "center" }}>인형5 정보입력</Text>
          </TouchableHighlight>
          <View style={[styles.baseLabelsView, styles.radiusTitle]}>
            <Text style={styles.baseLabelsAlignCenter}>작전능력 계산결과</Text>
          </View>
          <View style={styles.flexRowNoMargin}>
            <View
              style={[
                styles.baseLabelsView,
                { flex: 1, borderTopWidth: 0, borderRightWidth: 0 },
              ]}
            >
              <Text style={{ textAlign: "center" }}>인형1 작전능력</Text>
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
              <Text style={{ textAlign: "center" }}>
                {tdollStats[0].operationalEffectiveness}
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
              <Text style={{ textAlign: "center" }}>인형2 작전능력</Text>
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
              <Text style={{ textAlign: "center" }}>
                {tdollStats[1].operationalEffectiveness}
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
              <Text style={{ textAlign: "center" }}>인형3 작전능력</Text>
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
              <Text style={{ textAlign: "center" }}>
                {tdollStats[2].operationalEffectiveness}
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
              <Text style={{ textAlign: "center" }}>인형4 작전능력</Text>
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
              <Text style={{ textAlign: "center" }}>
                {tdollStats[3].operationalEffectiveness}
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
              <Text style={{ textAlign: "center" }}>인형5 작전능력</Text>
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
              <Text style={{ textAlign: "center" }}>
                {tdollStats[4].operationalEffectiveness}
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
              <Text style={{ textAlign: "center" }}>제대 작전능력</Text>
            </View>
            <View
              style={[
                styles.resultLabelsView,
                {
                  flex: 1,
                  borderTopWidth: 0,
                  borderBottomRightRadius: 5,
                },
              ]}
            >
              <Text style={{ textAlign: "center" }}>
                {tdollStats[0].operationalEffectiveness +
                  tdollStats[1].operationalEffectiveness +
                  tdollStats[2].operationalEffectiveness +
                  tdollStats[3].operationalEffectiveness +
                  tdollStats[4].operationalEffectiveness}
              </Text>
            </View>
          </View>

          <TouchableHighlight
            style={[styles.btn, { marginTop: 20 }]}
            underlayColor={SWITCH_UNDERLAY}
            onPress={() => calcOE()}
          >
            <Text style={{ textAlign: "center" }}>계산</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide">
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" enabled>
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
                인형 {selected + 1} 정보 입력
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
            {pickerVisible ? (
              <View
                style={{
                  position: "absolute",
                  zIndex: 1,
                  height: Dimensions.get("window").height,
                  width: Dimensions.get("window").width,
                  backgroundColor: "#00000080",
                  flexDirection: "column-reverse",
                }}
              >
                <View
                  style={{
                    height: 200,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      // height: 50,
                      backgroundColor: "#ddd",
                      borderBottomWidth: 0.2,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        justifyContent: "center",
                        padding: 10,
                      }}
                      onPress={() => setPickerVisible(false)}
                    >
                      <Text style={{ fontSize: 20, color: "#409BFD" }}>
                        닫기
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "#ddd",
                      overflow: "hidden",
                    }}
                  >
                    <Picker
                      selectedValue={tdollStats[selected].type}
                      style={{
                        flex: 1,
                        backgroundColor: "#ddd",
                        marginTop: -30,
                      }}
                      onValueChange={(itemValue, itemIndex) => {
                        setTdollStats[selected]({
                          ...tdollStats[selected],
                          type: itemValue,
                        });
                      }}
                    >
                      <Picker.Item label="MG" value="MG" />
                      <Picker.Item label="SG" value="SG" />
                      <Picker.Item
                        label="SMG, AR, RF, HG"
                        value="SMG, AR, RF, HG"
                      />
                    </Picker>
                  </View>
                </View>
              </View>
            ) : null}
            <ScrollView indicatorStyle="black">
              <View style={{ padding: 10 }}>
                <View style={styles.flexRow}>
                  <View style={[styles.inputLabelsView, { flex: 1 }]}>
                    <Text style={{ textAlign: "center" }}>병종 선택</Text>
                  </View>
                  <TouchableHighlight
                    underlayColor={OUTPUT_LABEL}
                    style={[styles.selectsView, { flex: 1 }]}
                    onPress={() => setPickerVisible(true)}
                  >
                    <Text style={{ textAlign: "right" }}>
                      {tdollStats[selected].type} ▼
                    </Text>
                  </TouchableHighlight>
                </View>

                <View style={[styles.baseLabelsView, styles.radiusTitle]}>
                  <Text style={styles.baseLabelsAlignCenter}>
                    편성창에서 장비표시를 눌렀을 때 보이는 스탯 입력
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
                    onChangeText={text =>
                      setTdollStats[selected]({
                        ...tdollStats[selected],
                        link: text,
                      })
                    }
                    value={tdollStats[selected].link}
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
                    onChangeText={text =>
                      setTdollStats[selected]({
                        ...tdollStats[selected],
                        bullet: text,
                      })
                    }
                    value={tdollStats[selected].bullet}
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
                    onChangeText={text =>
                      setTdollStats[selected]({
                        ...tdollStats[selected],
                        str: text,
                      })
                    }
                    value={tdollStats[selected].str}
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
                    onChangeText={text =>
                      setTdollStats[selected]({
                        ...tdollStats[selected],
                        armorPenetration: text,
                      })
                    }
                    value={tdollStats[selected].armorPenetration}
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
                    onChangeText={text =>
                      setTdollStats[selected]({
                        ...tdollStats[selected],
                        armor: text,
                      })
                    }
                    value={tdollStats[selected].armor}
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
                    onChangeText={text =>
                      setTdollStats[selected]({
                        ...tdollStats[selected],
                        criticalRate: text,
                      })
                    }
                    value={tdollStats[selected].criticalRate}
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
                    onChangeText={text =>
                      setTdollStats[selected]({
                        ...tdollStats[selected],
                        criticalDamageRate: text,
                      })
                    }
                    value={tdollStats[selected].criticalDamageRate}
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
                    onChangeText={text =>
                      setTdollStats[selected]({
                        ...tdollStats[selected],
                        agi: text,
                      })
                    }
                    value={tdollStats[selected].agi}
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
                    onChangeText={text =>
                      setTdollStats[selected]({
                        ...tdollStats[selected],
                        dex: text,
                      })
                    }
                    value={tdollStats[selected].dex}
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
                    onChangeText={text =>
                      setTdollStats[selected]({
                        ...tdollStats[selected],
                        hp: text,
                      })
                    }
                    value={tdollStats[selected].hp}
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
                    onChangeText={text =>
                      setTdollStats[selected]({
                        ...tdollStats[selected],
                        agl: text,
                      })
                    }
                    value={tdollStats[selected].agl}
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
                    onChangeText={text =>
                      setTdollStats[selected]({
                        ...tdollStats[selected],
                        rating: text,
                      })
                    }
                    value={tdollStats[selected].rating}
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
                    onChangeText={text =>
                      setTdollStats[selected]({
                        ...tdollStats[selected],
                        skill1Lv: text,
                      })
                    }
                    value={tdollStats[selected].skill1Lv}
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
                    onChangeText={text =>
                      setTdollStats[selected]({
                        ...tdollStats[selected],
                        skill2Lv: text,
                      })
                    }
                    value={tdollStats[selected].skill2Lv}
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
                    onChangeText={text =>
                      setTdollStats[selected]({
                        ...tdollStats[selected],
                        strBuff: text,
                      })
                    }
                    value={tdollStats[selected].strBuff}
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
                    onChangeText={text =>
                      setTdollStats[selected]({
                        ...tdollStats[selected],
                        armorBuff: text,
                      })
                    }
                    value={tdollStats[selected].armorBuff}
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
                    onChangeText={text =>
                      setTdollStats[selected]({
                        ...tdollStats[selected],
                        criticalRateBuff: text,
                      })
                    }
                    value={tdollStats[selected].criticalRateBuff}
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
                    onChangeText={text =>
                      setTdollStats[selected]({
                        ...tdollStats[selected],
                        agiBuff: text,
                      })
                    }
                    value={tdollStats[selected].agiBuff}
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
                    onChangeText={text =>
                      setTdollStats[selected]({
                        ...tdollStats[selected],
                        dexBuff: text,
                      })
                    }
                    value={tdollStats[selected].dexBuff}
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
                    onChangeText={text =>
                      setTdollStats[selected]({
                        ...tdollStats[selected],
                        aglBuff: text,
                      })
                    }
                    value={tdollStats[selected].aglBuff}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
  resultLabelsView: {
    height: 40,
    paddingRight: 5,
    paddingLeft: 5,

    borderColor: BORDER_COLOR,
    borderWidth: 1,
    backgroundColor: OUTPUT_LABEL,
    alignItems: "stretch",
    justifyContent: "center",
  },

  btn: {
    flex: 1,
    justifyContent: "center",
    height: 40,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 5,
    backgroundColor: SWITCH_ACTIVE,
    borderBottomWidth: 1.5,
    borderRightWidth: 1,
    borderBottomColor: BORDER_SHADOW,
    borderRightColor: BORDER_SHADOW,
    marginBottom: 5,
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
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
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
});

export default OperationalEffectivenessCalc;
