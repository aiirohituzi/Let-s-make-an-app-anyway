import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Ionicons';

const AgiCalc = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.btnMenu} onPress={() => props.navigation.openDrawer()}>
            <Text style={{fontSize: 18, fontWeight: "600"}}><Icon name="ios-menu" size={30} color="#555" /></Text>
          </TouchableOpacity>
          <View style={styles.status}>
            <Text style={{fontSize: 20, fontWeight: "600"}}>최대사속 계산기</Text>
          </View>
          <View style={{width: 50}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


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
});

export default AgiCalc;