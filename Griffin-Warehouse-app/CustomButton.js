// CustomButton function
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const CustomButton = ({ title, buttonColor, titleColor, onPress }) => {
  let ltitle = title ? title : 'untitled';
  let lbuttonColor = buttonColor ? buttonColor : '#000';
  let ltitleColor = titleColor ? titleColor : '#ddd';
  let lonPress = onPress ? onPress : () => null;

  return (
    <TouchableOpacity style={[
      styles.button,
      {backgroundColor: lbuttonColor}
    ]}
    onPress={lonPress}>
      <Text style={[
        styles.title,
        {color: ltitleColor}
      ]}>{ltitle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 5,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
});

export default CustomButton;