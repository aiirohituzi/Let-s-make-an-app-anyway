import React, { Component } from 'react';
import {Text,View,Button} from 'react-native';
 
export default class MainScreen extends Component {
  render() {
    return (
      <View>
        <Text>Main</Text>
        <Button onPress={() => this.goSub1Screen()} title='Go Sub1 Screen'/>
        <Button onPress={() => this.goSub2Screen()} title='Go Sub2 Screen'/>
      </View>
    );
  }
 
  goSub1Screen(){
    this.props.navigation.navigate('Sub1');
  }
 
  goSub2Screen(){
    this.props.navigation.navigate('Sub2');
  }
}