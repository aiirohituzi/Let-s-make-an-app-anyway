import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Constants from 'expo-constants';

const DamageCalc = (props) => {
  const [value1, setValue1] = useState('');
  console.log(props)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.btnMenu} onPress={() => props.navigation.openDrawer()}>
          <Text style={{fontSize: 18, fontWeight: "600"}}>메뉴</Text>
        </TouchableOpacity>
        <View style={styles.status}>
          <Text style={{fontSize: 20, fontWeight: "600"}}>화면3</Text>
        </View>
        <View style={{width: 50}} />
      </View>

      <View style={{padding: '5%'}}>
        <View style={styles.flexRow}>
          <View style={styles.inputLabelsView}>
            <Text style={styles.inputLabels}>입력항목 1</Text>
          </View>
          <TextInput
            style={styles.inputs}
            onChangeText={text => setValue1(text)}
            value={value1}
            placeholder="입력창 1"
          />
        </View>
        <Text style={{textAlign: 'right', marginTop: 5, marginBottom: 5}}>입력값 state 변화 확인용 : {value1}</Text>
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
    flex: 3,
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
    flex: 2,
    textAlign: 'right',
    height: 40,
    paddingRight: 5,
    paddingLeft: 5,
    borderColor: '#bbb',
    borderWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  }
});

export default DamageCalc;