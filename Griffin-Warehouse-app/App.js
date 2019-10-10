import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Modal,
  Text,
  Dimensions,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import Constants from 'expo-constants';
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import MenuScreen from './src/MenuScreen'
import CustomButton from './src/CustomButton';
import DamageCalc from './src/DamageCalc';
import AgiCalc from './src/AgiCalc'

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [screen, setScreen] = useState(DamageCalc);
  const [screenName, setScreenName] = useState('데미지 계산기');
  
  const modalOpen = (screenNum) => {
    switch(screenNum) {
      case 1:
        setScreen(DamageCalc);
        setScreenName('데미지 계산기');
        break;
      case 2:
        setScreen(AgiCalc);
        setScreenName('최대사속 계산기');
        break;
      default:
    }
    setModalVisible(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" hidden="false" />

      <View style={styles.navbar}>
        <View style={styles.status}>
          <Text style={{fontSize: 20, fontWeight: "600"}}>메인 화면</Text>
        </View>
      </View>

      <View style={styles.row}>
        <CustomButton
          buttonColor={'#023e71'}
          title={'데미지\n계산기'}
          onPress={() => modalOpen(1)}/>
        <CustomButton
          buttonColor={'#023e71'}
          title={'최대사속\n계산기'}
          onPress={() => modalOpen(2)}/>
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

      <Modal
        animationType="none"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <SafeAreaView style={{paddingTop: Constants.statusBarHeight}}>
          <View style={styles.navbar}>
            <TouchableOpacity style={styles.btnBack} onPress={() => setModalVisible(false)}>
              <Text style={{fontSize: 18, fontWeight: "600"}}>뒤로</Text>
            </TouchableOpacity>
            <View style={styles.status}>
              <Text style={{fontSize: 20, fontWeight: "600"}}>{ screenName }</Text>
            </View>
            <View style={{width: 50}} />
          </View>
          { screen }
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    // padding: 8,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  navbar: {
    width: Dimensions.get('window').width,
    height: 50,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d6d7da',
  },
  status: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnBack: {
    width: 50,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

// const AppNavigator = createStackNavigator(
//   {
//     Menu: MenuScreen,
//     Main: Main,
//   },
//   {
//     initialRouteName: 'Menu',
//   }
// );
// const AppContainer = createAppContainer(AppNavigator);


// const App = () => {
//   return (
//     <AppContainer />
//   );
// };

export default App;