import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Button,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import TabBarExample from './TabBarExample';
// import createAppContainer from './createAppContainer';
import Menu from './Menu';


class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);




export default function App() {
  const [count, setCount] = useState(0);
  // const AppContainer = createAppContainer(AppContainer);

  onPress = (count) => {
    setCount(count + 1);
    // console.log(count);
  }

  return (
    // <View style={styles.container}>
    //   <StatusBar backgroundColor="blue" barStyle="dark-content" hidden="false" />
    //   <TouchableOpacity style={styles.button} onPress={() => onPress(count)}>
    //     <Text> Touch Here </Text>
    //   </TouchableOpacity>
    //   <View style={[styles.countContainer]}>
    //     <Text style={[styles.countText]}>
    //       { count !== 0 ? count : null}
    //     </Text>
    //   </View>
    // </View>
    // <AppContainer />
    <Menu />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  }
});
