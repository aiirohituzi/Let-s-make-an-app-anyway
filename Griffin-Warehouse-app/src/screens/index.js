import { Navigation } from 'react-native-navigation';

import StartScreen from './Menu';

export function registerScreens() {
  Navigation.registerComponent('yuddomack.StartScreen', () => StartScreen);
}