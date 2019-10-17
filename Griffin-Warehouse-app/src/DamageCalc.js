import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Switch,
  ScrollView,
  Modal,
  TouchableHighlight,
  Slider,
} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { tdollAtkBuffer } from './data';

const DamageCalc = (props) => {
  const [tdollAtk, setTdollAtk] = useState('');
  const [tdollSkill, setTdollSkill] = useState('');
  const [equipCritical, setEquipCritical] = useState('');
  
  const [buffer1Buff, setBuffer1Buff] = useState('');
  const [buffer2Buff, setBuffer2Buff] = useState('');
  const [buffer3Buff, setBuffer3Buff] = useState('');
  const [buffer4Buff, setBuffer4Buff] = useState('');
  const [buffer1Skill, setBuffer1Skill] = useState('');
  const [buffer2Skill, setBuffer2Skill] = useState('');
  const [buffer3Skill, setBuffer3Skill] = useState('');
  const [buffer4Skill, setBuffer4Skill] = useState('');

  const [modalBufferVisible, setModalBufferVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('default');
  const [itemList, setItemList] = useState();
  const [selected, setSelected] = useState([0, 0, 0, 0]);
  const [currentSelect, setCurrentSelect] = useState(1);


  const [modalFairyVisible, setModalFairyVisible] = useState(false);
  const [fairyStrBuff, setFairyStrBuff] = useState('');
  const [fairyCriticalBuff, setFairyCriticalBuff] = useState('');
  const [fairySelected, setFairySelected] = useState(0);
  const [fairySkill, setFairySkill] = useState('');
  const fairyPassive = [
    {id: 0, name: '선택 안함', buff: 0},
    {id: 1, name: '살상계1', buff: 12},
    {id: 2, name: '살상계2', buff: 15},
    {id: 3, name: '격양계', buff: 10},
    {id: 4, name: '돌격계', buff: 0},
  ];
  const [fairyPassiveRageStack, setFairyPassiveRageStack] = useState(0);
  
  const [armorOn, setArmorOn] = useState(false);
  const [armor, setArmor] = useState('0');
  const [criticalOn, setCriticalOn] = useState(false);
  const [critical, setCritical] = useState('150');

  const [finalStatMin, setFinalStatMin] = useState(0);
  const [finalStatMax, setFinalStatMax] = useState(0);

  
  const modalSelectOpen = (title, list, current) => {
    setModalTitle(title);
    setItemList(list);
    setCurrentSelect(current - 1);
    setModalBufferVisible(true);
  };
  
  const modalSelected = id => {
    let temp = selected;
    temp[currentSelect] = id;
    setSelected(temp);

    if (id === 0) {
      temp = selected;
      for (let i = currentSelect + 1; i < temp.length; i++) {
        temp[i] = 0;
      }
      setSelected(temp);
    }
  };

  useEffect(() => {
    let calc_buff = parseInt(buffer1Buff ? buffer1Buff : 0) + parseInt(buffer2Buff ? buffer2Buff : 0) + parseInt(buffer3Buff ? buffer3Buff : 0) + parseInt(buffer4Buff ? buffer4Buff : 0) + parseInt(fairyStrBuff ? fairyStrBuff : 0);
    let calc_skill = (((1 + (parseInt(buffer1Skill ? buffer1Skill : 0) / 100)) * (1 + (parseInt(buffer2Skill ? buffer2Skill : 0) / 100)) * (1 + (parseInt(buffer3Skill ? buffer3Skill : 0) / 100)) * (1 + (parseInt(buffer4Skill ? buffer4Skill : 0) / 100)) - 1) * 100).toFixed(4);
    
    let calc_fairyPassive = fairyPassive[fairySelected].buff;

    let calc_armor = armorOn ? parseInt(armor ? armor : 0) : 0
    let calc_critical = criticalOn ?
                        ((parseInt(critical ? critical : 0) / 100) * (1 + (parseInt(fairyCriticalBuff ? fairyCriticalBuff : 0) / 100))) + (parseInt(equipCritical ? equipCritical : 0) / 100)
                        : 1;

    let calc_fairySkill = fairySkill ? parseInt(fairySkill) : 0

    let finalStat = Math.ceil(parseInt(tdollAtk ? tdollAtk : 0) * (1 + (calc_buff / 100)) * (1 + (calc_fairyPassive / 100))) * (1 + (calc_skill / 100)) * (1 + (parseInt(tdollSkill ? tdollSkill : 0) / 100)) * (1 + (calc_fairySkill / 100))

    setFinalStatMin(((finalStat * 0.85) - calc_armor) * calc_critical);
    setFinalStatMax(((finalStat * 1.15) - calc_armor) * calc_critical);
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.btnMenu} onPress={() => props.navigation.openDrawer()}>
            <Text style={{fontSize: 18, fontWeight: "600"}}><Icon name="ios-menu" size={30} color="#555" /></Text>
          </TouchableOpacity>
          <View style={styles.status}>
            <Text style={{fontSize: 20, fontWeight: "600"}}>데미지 계산기</Text>
          </View>
          <View style={{width: 50}} />
        </View>

        <View style={{padding: '5%'}}>
          <View style={styles.flexRow}>
            <View style={[styles.inputLabelsView, {flex: 3}]}>
              <Text style={styles.inputLabels}>인형 순수 화력 스탯 입력</Text>
            </View>
            <TextInput
              style={[styles.inputs, {flex: 2}]}
              onChangeText={text => setTdollAtk(text)}
              value={tdollAtk}
              placeholder="화력(호감도포함)"
              keyboardType="numeric"
            />
          </View>
          {/* <Text style={{textAlign: 'right', marginTop: 5, marginBottom: 5}}>입력값 state 변화 확인용 : {value1}</Text> */}
          
          <View style={styles.flexRow}>
            <View style={[styles.inputLabelsView, {flex: 3}]}>
              <Text style={styles.inputLabels}>인형 스킬 화력 배율(%) 입력</Text>
            </View>
            <TextInput
              style={[styles.inputs, {flex: 2}]}
              onChangeText={text => setTdollSkill(text)}
              value={tdollSkill}
              placeholder="스킬 배율"
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.flexRow}>
            <View style={[styles.inputLabelsView, {flex: 3}]}>
              <Text style={styles.inputLabels}>장비 치명상 입력</Text>
            </View>
            <TextInput
              style={[styles.inputs, {flex: 2}]}
              onChangeText={text => setEquipCritical(text)}
              value={equipCritical}
              placeholder="장비 치명상"
              keyboardType="numeric"
            />
          </View>
          

          <Modal
            animationType="slide"
            transparent={false}
            visible={modalBufferVisible}>
            <View
              style={{
                flex: 1,
                padding: 10,
                paddingTop: Constants.statusBarHeight,
              }}>
              <View
                style={{
                  height: 60,
                  flexDirection: 'row',
                  borderBottomWidth: 2,
                }}>
                <View style={{ width: 50 }} />
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: '600',
                      fontSize: 20,
                    }}>
                    {modalTitle}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: 50,
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => setModalBufferVisible(false)}>
                  <Icon name="ios-close" size={30} color="#555" />
                </TouchableOpacity>
              </View>
              <ScrollView>
                {!itemList
                  ? ''
                  : itemList.map(data => {
                      return (
                        <TouchableHighlight
                          key={data.id}
                          underlayColor="#ddd"
                          style={styles.selectItem}
                          onPress={() => {
                            modalSelected(data.id);
                            setModalBufferVisible(false);
                          }}>
                          <Text style={styles.selectItemText} key={data.id}>
                            {data.name}
                          </Text>
                        </TouchableHighlight>
                      );
                    })}
              </ScrollView>
            </View>
          </Modal>

          <View style={[styles.baseLabelsView, styles.radiusTitle]}>
            <Text style={styles.baseLabelsAlignCenter}>화력 버퍼 정보 입력</Text>
          </View>
          <View style={styles.flexRowNoMargin}>
            <View style={[styles.baseLabelsView, {flex: 1}]}>
              <Text style={styles.baseLabelsAlignCenter}>버퍼 인형 선택</Text>
            </View>
            <View style={[styles.baseLabelsView, {flex: 1}]}>
              <Text style={styles.baseLabelsAlignCenter}>화력 진형버프</Text>
            </View>
            <View style={[styles.baseLabelsView, {flex: 1}]}>
              <Text style={styles.baseLabelsAlignCenter}>버프 스킬 배율</Text>
            </View>
          </View>
          <View style={styles.flexRowNoMargin}>
            <TouchableHighlight
              underlayColor="#ddd"
              style={[styles.selectsView, {borderTopWidth: 0, borderRightWidth: 0}]}
              onPress={() => modalSelectOpen('인형1', tdollAtkBuffer, 1)}>
              <Text style={{ textAlign: 'right' }}>
                {tdollAtkBuffer[selected[0]].name} ▼
              </Text>
            </TouchableHighlight>
            <TextInput
              style={[styles.inputsMiddle, {flex: 1, borderTopWidth: 0}]}
              onChangeText={text => setBuffer1Buff(text)}
              value={buffer1Buff}
              placeholder="인형1 진형버프"
              keyboardType="numeric"
              editable={selected[0] === 1}
            />
            <TextInput
              style={[styles.inputs, {flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderTopWidth: 0}]}
              onChangeText={text => setBuffer1Skill(text)}
              value={buffer1Skill}
              placeholder="인형1 스킬배율"
              keyboardType="numeric"
              editable={selected[0] === 1}
            />
          </View>
          <View style={styles.flexRowNoMargin}>
            <TouchableHighlight
              underlayColor="#ddd"
              style={[styles.selectsView, {borderTopWidth: 0, borderRightWidth: 0}]}
              onPress={() => modalSelectOpen('인형2', tdollAtkBuffer, 2)}>
              <Text style={{ textAlign: 'right' }}>
                {tdollAtkBuffer[selected[1]].name} ▼
              </Text>
            </TouchableHighlight>
            <TextInput
              style={[styles.inputsMiddle, {flex: 1, borderTopWidth: 0}]}
              onChangeText={text => setBuffer2Buff(text)}
              value={buffer2Buff}
              placeholder="인형2 진형버프"
              keyboardType="numeric"
              editable={selected[1] === 1}
            />
            <TextInput
              style={[styles.inputs, {flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderTopWidth: 0}]}
              onChangeText={text => setBuffer2Skill(text)}
              value={buffer2Skill}
              placeholder="인형2 스킬배율"
              keyboardType="numeric"
              editable={selected[1] === 1}
            />
          </View>
          <View style={styles.flexRowNoMargin}>
            <TouchableHighlight
              underlayColor="#ddd"
              style={[styles.selectsView, {borderTopWidth: 0, borderRightWidth: 0}]}
              onPress={() => modalSelectOpen('인형3', tdollAtkBuffer, 3)}>
              <Text style={{ textAlign: 'right' }}>
                {tdollAtkBuffer[selected[2]].name} ▼
              </Text>
            </TouchableHighlight>
            <TextInput
              style={[styles.inputsMiddle, {flex: 1, borderTopWidth: 0}]}
              onChangeText={text => setBuffer3Buff(text)}
              value={buffer3Buff}
              placeholder="인형3 진형버프"
              keyboardType="numeric"
              editable={selected[2] === 1}
            />
            <TextInput
              style={[styles.inputs, {flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderTopWidth: 0}]}
              onChangeText={text => setBuffer3Skill(text)}
              value={buffer3Skill}
              placeholder="인형3 스킬배율"
              keyboardType="numeric"
              editable={selected[2] === 1}
            />
          </View>
          <View style={styles.flexRow}>
            <TouchableHighlight
              underlayColor="#ddd"
              style={[styles.selectsView, {borderTopWidth: 0, borderRightWidth: 0, borderBottomLeftRadius: 5}]}
              onPress={() => modalSelectOpen('인형4', tdollAtkBuffer, 4)}>
              <Text style={{ textAlign: 'right' }}>
                {tdollAtkBuffer[selected[3]].name} ▼
              </Text>
            </TouchableHighlight>
            <TextInput
              style={[styles.inputsMiddle, {flex: 1, borderTopWidth: 0}]}
              onChangeText={text => setBuffer4Buff(text)}
              value={buffer4Buff}
              placeholder="인형4 진형버프"
              keyboardType="numeric"
              editable={selected[3] === 1}
            />
            <TextInput
              style={[styles.inputs, {flex: 1, borderTopRightRadius: 0, borderTopWidth: 0}]}
              onChangeText={text => setBuffer4Skill(text)}
              value={buffer4Skill}
              placeholder="인형4 스킬배율"
              keyboardType="numeric"
              editable={selected[3] === 1}
            />
          </View>
          

          <Modal
            animationType="slide"
            transparent={false}
            visible={modalFairyVisible}>
            <View
              style={{
                flex: 1,
                padding: 10,
                paddingTop: Constants.statusBarHeight,
              }}>
              <View
                style={{
                  height: 60,
                  alignItems: 'stretch',
                  justifyContent: 'center',
                  borderBottomWidth: 2,
                }}>
                <Text
                  style={{ textAlign: 'center', fontWeight: '600', fontSize: 20 }}>
                  요정 특성 선택
                </Text>
              </View>
              <ScrollView>
                {fairyPassive.map(data => {
                  return (
                    <TouchableHighlight
                      key={data.id}
                      underlayColor="#ddd"
                      style={styles.selectItem}
                      onPress={() => {
                        setFairySelected(data.id);
                        setModalFairyVisible(false);
                      }}>
                      <Text style={styles.selectItemText}>
                        {data.name}
                      </Text>
                    </TouchableHighlight>
                  );
                })}
              </ScrollView>
            </View>
          </Modal>

          <View style={[styles.baseLabelsView, styles.radiusTitle]}>
            <Text style={styles.baseLabelsAlignCenter}>요정 정보 입력</Text>
          </View>
          <View style={styles.flexRowNoMargin}>
            <View style={[styles.baseLabelsView, {flex: 1}]}>
              <Text style={[styles.baseLabelsAlignCenter, {fontSize: 10}]}>화력 진형버프</Text>
            </View>
            <View style={[styles.baseLabelsView, {flex: 1, borderRightWidth: 0}]}>
              <Text style={[styles.baseLabelsAlignCenter, {fontSize: 10}]}>치명상 진형버프</Text>
            </View>
            <View style={[styles.baseLabelsView, {flex: 1, borderRightWidth: 0}]}>
              <Text style={[styles.baseLabelsAlignCenter, {fontSize: 10}]}>특성 선택</Text>
            </View>
            <View style={[styles.baseLabelsView, {flex: 1}]}>
              <Text style={[styles.baseLabelsAlignCenter, {fontSize: 10}]}>스킬 화력 배율</Text>
            </View>
          </View>
          <View style={styles.flexRow}>
            <TextInput
              style={[styles.inputsMiddle, {flex: 1, borderTopWidth: 0, borderBottomLeftRadius: 5}]}
              onChangeText={text => setFairyStrBuff(text)}
              value={fairyStrBuff}
              placeholder="요정 진형버프"
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.inputsMiddle, {flex: 1, borderTopWidth: 0}]}
              onChangeText={text => setFairyCriticalBuff(text)}
              value={fairyCriticalBuff}
              placeholder="요정 치명상"
              keyboardType="numeric"
            />
            <TouchableHighlight
              underlayColor="#ddd"
              style={[styles.selectsView, {flex: 1, borderTopWidth: 0, borderRightWidth: 0}]}
              onPress={() => setModalFairyVisible(true)}>
              <Text style={{ textAlign: 'right' }}>
                {fairyPassive[fairySelected].name} ▼
              </Text>
            </TouchableHighlight>
            <TextInput
              style={[styles.inputs, {flex: 1, borderTopRightRadius: 0, borderTopWidth: 0}]}
              onChangeText={text => setFairySkill(text)}
              value={fairySkill}
              placeholder="요정 스킬배율"
              keyboardType="numeric"
            />
          </View>

          {fairySelected === 3 ?
            <View style={styles.flexRow}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{textAlign: 'center'}}>
                  격양계
                </Text>
              </View>
              <Slider
                style={{flex: 3}}
                minimumValue={0}
                maximumValue={3}
                step={1}
                value={fairyPassiveRageStack}
                onSlidingComplete={(value) => setFairyPassiveRageStack(value)}
              />
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{textAlign: 'center'}}>
                  {fairyPassiveRageStack} 스택
                </Text>
              </View>
            </View>
          : null}
          
          <View style={styles.flexRow}>
            <View style={{justifyContent: 'center', marginRight: 5}}>
              <Switch
                onChange={() => setArmorOn(!armorOn)}
                value={armorOn}
              />
            </View>
            <View style={[styles.inputLabelsView, {flex: 3}]}>
              <Text style={styles.inputLabels}>장갑 적용</Text>
            </View>
            <TextInput
              style={[styles.inputs, {flex: 1}]}
              onChangeText={text => setArmor(text)}
              value={armor}
              placeholder="적 장갑"
              keyboardType="numeric"
              editable={armorOn}
              backgroundColor={armorOn ? '#eee' : '#ddd'}
            />
          </View>
          
          <View style={styles.flexRow}>
            <View style={{justifyContent: 'center', marginRight: 5}}>
              <Switch
                onChange={() => setCriticalOn(!criticalOn)}
                value={criticalOn}
              />
            </View>
            <View style={[styles.inputLabelsView, {flex: 3}]}>
              <Text style={styles.inputLabels}>치명타 적용 (치명상 배율(%) 입력)</Text>
            </View>
            <TextInput
              style={[styles.inputs, {flex: 1}]}
              onChangeText={text => setCritical(text)}
              value={critical}
              placeholder="인형 치명상"
              keyboardType="numeric"
              editable={criticalOn}
              backgroundColor={criticalOn ? '#eee' : '#ddd'}
            />
          </View>


          <View style={styles.flexRowNoMargin}>
            <View style={[styles.baseLabelsView, {flex: 1, borderTopLeftRadius: 5}]}>
            </View>
            <View style={[styles.baseLabelsView, {flex: 1}]}>
              <Text style={styles.baseLabelsAlignCenter}>1링크</Text>
            </View>
            <View style={[styles.baseLabelsView, {flex: 1, borderTopRightRadius: 5}]}>
              <Text style={styles.baseLabelsAlignCenter}>5링크</Text>
            </View>
          </View>
          
          <View style={styles.flexRowNoMargin}>
            <View style={[styles.baseLabelsView, {flex: 1}]}>
              <Text style={styles.baseLabelsAlignCenter}>최소데미지</Text>
            </View>
            <View style={[styles.resultLabelsView, {flex: 1, borderTopWidth: 0, borderRightWidth: 0}]}>
              <Text style={styles.baseLabelsAlignRight}>{Math.ceil(finalStatMin)}</Text>
            </View>
            <View style={[styles.resultLabelsView, {flex: 1, borderTopWidth: 0}]}>
              <Text style={styles.baseLabelsAlignRight}>{Math.ceil(finalStatMin * 5)}</Text>
            </View>
          </View>
          
          <View style={styles.flexRowNoMargin}>
            <View style={[styles.baseLabelsView, {flex: 1, borderBottomLeftRadius: 5}]}>
              <Text style={styles.baseLabelsAlignCenter}>최대데미지</Text>
            </View>
            <View style={[styles.resultLabelsView, {flex: 1, borderTopWidth: 0, borderRightWidth: 0}]}>
              <Text style={styles.baseLabelsAlignRight}>{Math.ceil(finalStatMax)}</Text>
            </View>
            <View style={[styles.resultLabelsView, {flex: 1, borderBottomRightRadius: 5, borderTopWidth: 0}]}>
              <Text style={styles.baseLabelsAlignRight}>{Math.ceil(finalStatMax * 5)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    padding: 10,
    flex: 1,
    // justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  flexRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  flexRowNoMargin: {
    flexDirection: 'row',
  },
  navbar: {
    width: Dimensions.get('window').width,
    height: 50,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d6d7da',
  },
  btnMenu: {
    width: 50,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputLabelsView: {
    // flex: 3,
    height: 40,
    paddingRight: 5,
    paddingLeft: 5,

    borderColor: '#bbb',
    borderWidth: 1,
    borderRightWidth: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: '#bbb',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  inputLabels: {
    // flex: 3,
    // height: 40,
    // lineHeight: 40,
    textAlign: 'right',

    // borderColor: 'gray',
    // borderWidth: 1,
    // borderTopLeftRadius: 5,
    // borderBottomLeftRadius: 5,
  },
  inputs: {
    // flex: 2,
    textAlign: 'right',
    height: 40,
    paddingRight: 5,
    paddingLeft: 5,
    borderColor: '#bbb',
    borderWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },

  baseLabelsView: {
    // flex: 3,
    height: 40,
    paddingRight: 5,
    paddingLeft: 5,

    borderColor: '#bbb',
    borderWidth: 1,
    backgroundColor: '#bbb',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  resultLabelsView: {
    // flex: 3,
    height: 40,
    paddingRight: 5,
    paddingLeft: 5,

    borderColor: '#bbb',
    borderWidth: 1,
    backgroundColor: '#ddd',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  baseLabelsAlignCenter: {
    // flex: 3,
    // height: 40,
    // lineHeight: 40,
    textAlign: 'center',

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
    textAlign: 'right',

    // borderColor: 'gray',
    // borderWidth: 1,
    // borderTopLeftRadius: 5,
    // borderBottomLeftRadius: 5,
  },
  inputsMiddle: {
    flex: 2,
    textAlign: 'right',
    height: 40,
    paddingRight: 5,
    paddingLeft: 5,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRightWidth: 0,
  },
  radiusTitle: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  selectsView: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    height: 40,
    paddingRight: 5,
    paddingLeft: 5,
    borderColor: '#bbb',
    borderWidth: 1,
  },

  selectItem: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    height: 60,
    borderColor: '#bbb',
    borderTopWidth: 1,
    marginRight: 20,
    marginLeft: 20,
  },
  selectItemText: {
    textAlign: 'center',
    fontSize: 18,
  },
});

export default DamageCalc;