// CustomButton function
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const CustomButton = ({ title = 'untitled', buttonColor = '#000', titleColor = '#ddd', onPress = () => null }) => {

  return (
    <TouchableOpacity style={[
      styles.button,
      {backgroundColor: buttonColor}
    ]}
    onPress={onPress}>
      <Text style={[
        styles.title,
        {color: titleColor}
      ]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 5,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
});

export default CustomButton;