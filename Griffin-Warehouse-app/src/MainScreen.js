import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import CustomButton from './CustomButton';

const Menu = () => {

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="blue" barStyle="dark-content" hidden="false" />
      <View style={styles.row}>
        <CustomButton
            buttonColor={'#023e71'}
            title={'데미지\n계산기'}
            onPress={() => alert('데미지 계산기 버튼')}/>
        <CustomButton
            buttonColor={'#023e71'}
            title={'최대사속\n계산기'}
            onPress={() => alert('최대사속 계산기 버튼')}/>
      </View>
      <View style={styles.row}>
        <CustomButton
            buttonColor={'#023e71'}
            title={`필요 보석량\n계산기`}
            onPress={() => alert('필요 보석량 계산기 버튼')}/>
        <CustomButton
            buttonColor={'#023e71'}
            title={'필요 모의작전점수\n계산기'}
            onPress={() => alert('필요 모의작전점수 계산기 버튼')}/>
      </View>
      <View style={styles.row}>
        <CustomButton
            buttonColor={'#023e71'}
            title={'경험치\n계산기'}
            onPress={() => alert('경험치 계산기 버튼')}/>
        <CustomButton
            buttonColor={'#023e71'}
            title={'작전능력\n계산기'}
            onPress={() => alert('작전능력 계산기 버튼')}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    marginTop: 22,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default Menu;