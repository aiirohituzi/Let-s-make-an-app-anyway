import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

const Menu = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="blue" barStyle="dark-content" hidden="true" />
      <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <Text>데미지 계산기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>최대사속 계산기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <Text>필요 보석량 계산기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>필요 모의작전점수 계산기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <Text>경험치 계산기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>작전능력 계산기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    margin: 5
  }
});

export default Menu;