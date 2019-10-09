import { createStackNavigator } from 'react-navigation'
import MainScreen from './src/Main'

const App = createStackNavigator({
  Main : {
    screen : MainScreen,
    navigationOptions: {
      title: 'Main',
    }
  },
});

export default App;