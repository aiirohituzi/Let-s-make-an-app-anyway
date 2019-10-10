import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Constants from 'expo-constants';

const DamageCalc = () => {
  return (
    <View style={styles.container}>
      <Text>데미지 계산기</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 50 - Constants.statusBarHeight,
    padding: 10,
    backgroundColor: '#eff',
  }
});

export default DamageCalc;