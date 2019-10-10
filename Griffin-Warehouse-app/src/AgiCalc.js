import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Slider } from 'react-native';
import Constants from 'expo-constants';

const AgiCalc = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20}}>
        최대사속계산기
      </Text>
      <Slider
        maximumValue={5}
        minimumValue={0}
        step={1}
        onSlidingComplete={(value) => console.log(value)}
      />
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

export default AgiCalc;