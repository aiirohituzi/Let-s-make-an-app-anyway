import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
} from 'react-native';

export default TabBarExample = () => {
  const [selectedTab, setSelectedTab] = useState('tab1');

  return (
    <View style={styles.container}>
    <TabBarIOS>
      <TabBarIOS.Item
        selected = {selectedTab === 'tab1'}
        systemIcon = 'bookmarks'
        onPress = {() => setSelectedTab('tab1')}
      >
        <Text>Tab 1</Text>
      </TabBarIOS.Item>

      <TabBarIOS.Item
        selected = {selectedTab === 'tab2'}
        systemIcon = 'bookmarks'
        onPress = {() => setSelectedTab('tab2')}
      >
        <Text>Tab 2</Text>
      </TabBarIOS.Item>

      <TabBarIOS.Item
        selected = {selectedTab === 'tab3'}
        systemIcon = 'bookmarks'
        onPress = {() => setSelectedTab('tab3')}
      >
        <Text>Tab 3</Text>
      </TabBarIOS.Item>
    </TabBarIOS>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
});