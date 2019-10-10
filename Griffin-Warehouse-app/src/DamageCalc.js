import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Button,
} from 'react-native';
import Constants from 'expo-constants';

const DamageCalc = () => {
  let tdollAtk, tdollSkill, equipCritical;
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <Text style={styles.label}>인형 순수 화력 스탯 입력</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => tdollAtk = text}
          value={tdollAtk}
        />
      </View>
      
      <View style={styles.flexRow}>
        <Text style={styles.label}>인형 스킬 화력 배율(%) 입력</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => tdollSkill = text}
          value={tdollSkill}
        />
      </View>
      
      <View style={styles.flexRow}>
        <Text style={styles.label}>장비 치명상 입력</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => equipCritical = text}
          value={equipCritical}
        />
      </View>

      <Button
        title="check"
        onPress={() => alert(tdollAtk +'/'+ tdollSkill +'/'+ equipCritical)}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 50 - Constants.statusBarHeight,
    padding: 10,
  },
  flexRow: {
    flexDirection: 'row',
    height: 30,
    width: '100%',
  },
  label: {
    flex: 3,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 1,
  },
  input: {
    flex: 2,
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
  }
});

export default DamageCalc;