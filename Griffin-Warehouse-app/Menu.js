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
        {/* <TouchableOpacity style={styles.button}>
          <Text sytle={styles.buttonValue}>{`버튼\n이름1`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text sytle={styles.buttonValue}>{`버튼\n이름2`}</Text>
        </TouchableOpacity> */}
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
        <TouchableOpacity style={styles.button}>
          <Text sytle={styles.title}>{`필요 보석량\n계산기`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text sytle={[styles.title]}>{`필요 모의작전점수\n계산기`}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <Text sytle={styles.title}>{`경험치\n계산기`}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text sytle={styles.title}>{`작전능력\n계산기`}</Text>
        </TouchableOpacity>
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#dddddd',
    borderRadius: 5,
    margin: 5,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    color: '#ff0000',
  }
});

export default Menu;