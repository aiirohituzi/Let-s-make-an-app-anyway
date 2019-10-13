import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Constants from 'expo-constants';

const DamageCalc = (props) => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [tdoll1, setTdoll1] = useState('P22');
  const [selectedItem, setSelectedItem] = useState();
  // console.log(props)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.btnMenu} onPress={() => props.navigation.openDrawer()}>
          <Text style={{fontSize: 18, fontWeight: "600"}}>메뉴</Text>
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
            onChangeText={text => setValue1(text)}
            value={value1}
            placeholder="입력창 1"
          />
        </View>
        {/* <Text style={{textAlign: 'right', marginTop: 5, marginBottom: 5}}>입력값 state 변화 확인용 : {value1}</Text> */}
        
        <View style={styles.flexRow}>
          <View style={[styles.inputLabelsView, {flex: 3}]}>
            <Text style={styles.inputLabels}>인형 스킬 화력 배율(%) 입력</Text>
          </View>
          <TextInput
            style={[styles.inputs, {flex: 2}]}
            onChangeText={text => setValue2(text)}
            value={value2}
            placeholder="입력창 2"
          />
        </View>
        
        <View style={styles.flexRow}>
          <View style={[styles.inputLabelsView, {flex: 3}]}>
            <Text style={styles.inputLabels}>장비 치명상 입력</Text>
          </View>
          <TextInput
            style={[styles.inputs, {flex: 2}]}
            onChangeText={text => setValue3(text)}
            value={value3}
            placeholder="입력창 3"
          />
        </View>
        

        <View style={[styles.baseLabelsView, styles.radiusTitle]}>
          <Text style={styles.baseLabelsAlignCenter}>화력 버퍼 정보 입력</Text>
        </View>
        <View style={styles.flexRowNoMargin}>
          <View style={[styles.baseLabelsView, {flex: 1}]}>
          </View>
          <View style={[styles.baseLabelsView, {flex: 1}]}>
            <Text style={styles.baseLabelsAlignCenter}>화력 진형 버프</Text>
          </View>
          <View style={[styles.baseLabelsView, {flex: 1}]}>
            <Text style={styles.baseLabelsAlignCenter}>버프 스킬 배율</Text>
          </View>
        </View>
        <View style={styles.flexRowNoMargin}>
          <View style={[styles.baseLabelsView, {flex: 1}]}>
            <Text style={styles.baseLabelsAlignRight}>인형1</Text>
          </View>
          <TextInput
            style={[styles.inputsMiddle, {flex: 1, borderTopWidth: 0}]}
            onChangeText={text => setValue3(text)}
            value={value3}
            placeholder="입력창 3"
          />
          <TextInput
            style={[styles.inputs, {flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderTopWidth: 0}]}
            onChangeText={text => setValue3(text)}
            value={value3}
            placeholder="입력창 3"
          />
        </View>
        <View style={styles.flexRowNoMargin}>
          <View style={[styles.baseLabelsView, {flex: 1}]}>
            <Text style={styles.baseLabelsAlignRight}>인형2</Text>
          </View>
          <TextInput
            style={[styles.inputsMiddle, {flex: 1, borderTopWidth: 0}]}
            onChangeText={text => setValue3(text)}
            value={value3}
            placeholder="입력창 3"
          />
          <TextInput
            style={[styles.inputs, {flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderTopWidth: 0}]}
            onChangeText={text => setValue3(text)}
            value={value3}
            placeholder="입력창 3"
          />
        </View>
        <View style={styles.flexRowNoMargin}>
          <View style={[styles.baseLabelsView, {flex: 1}]}>
            <Text style={styles.baseLabelsAlignRight}>인형3</Text>
          </View>
          <TextInput
            style={[styles.inputsMiddle, {flex: 1, borderTopWidth: 0}]}
            onChangeText={text => setValue3(text)}
            value={value3}
            placeholder="입력창 3"
          />
          <TextInput
            style={[styles.inputs, {flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderTopWidth: 0}]}
            onChangeText={text => setValue3(text)}
            value={value3}
            placeholder="입력창 3"
          />
        </View>
        <View style={styles.flexRow}>
          <View style={[styles.baseLabelsView, {flex: 1, borderBottomLeftRadius: 5}]}>
            <Text style={styles.baseLabelsAlignRight}>인형4</Text>
          </View>
          <TextInput
            style={[styles.inputsMiddle, {flex: 1, borderTopWidth: 0}]}
            onChangeText={text => setValue3(text)}
            value={value3}
            placeholder="입력창 3"
          />
          <TextInput
            style={[styles.inputs, {flex: 1, borderTopRightRadius: 0, borderTopWidth: 0}]}
            onChangeText={text => setValue3(text)}
            value={value3}
            placeholder="입력창 3"
          />
        </View>
        
        
        <View style={styles.flexRow}>
          <View style={[styles.inputLabelsView, {flex: 3}]}>
            <Text style={styles.inputLabels}>장갑 적용</Text>
          </View>
          <TextInput
            style={[styles.inputs, {flex: 2}]}
            onChangeText={text => setValue3(text)}
            value={value3}
            placeholder="입력창 3"
          />
        </View>
        
        <View style={styles.flexRow}>
          <View style={[styles.inputLabelsView, {flex: 3}]}>
            <Text style={styles.inputLabels}>치명타 적용 (치명상 배율(%) 입력)</Text>
          </View>
          <TextInput
            style={[styles.inputs, {flex: 2}]}
            onChangeText={text => setValue3(text)}
            value={value3}
            placeholder="입력창 3"
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
            <Text style={styles.baseLabelsAlignCenter}></Text>
          </View>
          <View style={[styles.resultLabelsView, {flex: 1, borderTopWidth: 0}]}>
            <Text style={styles.baseLabelsAlignCenter}></Text>
          </View>
        </View>
        
        <View style={styles.flexRowNoMargin}>
          <View style={[styles.baseLabelsView, {flex: 1, borderBottomLeftRadius: 5}]}>
            <Text style={styles.baseLabelsAlignCenter}>최대데미지</Text>
          </View>
          <View style={[styles.resultLabelsView, {flex: 1, borderTopWidth: 0, borderRightWidth: 0}]}>
            <Text style={styles.baseLabelsAlignCenter}></Text>
          </View>
          <View style={[styles.resultLabelsView, {flex: 1, borderBottomRightRadius: 5, borderTopWidth: 0}]}>
            <Text style={styles.baseLabelsAlignCenter}></Text>
          </View>
        </View>
      </View>
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
    paddingRight: 5,
    paddingLeft: 5,
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

    borderColor: '#bbb',
    borderWidth: 1,
    backgroundColor: '#bbb',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  resultLabelsView: {
    // flex: 3,
    height: 40,

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
    paddingRight: 5,
    paddingLeft: 5,
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
  }
});

export default DamageCalc;