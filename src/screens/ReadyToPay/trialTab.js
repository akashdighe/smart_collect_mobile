import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

const {width} = Dimensions.get('window');

const DayView = () => (
  <View style={styles.scene}>
    <Text>Day View Content</Text>
  </View>
);

const WeekView = () => (
  <View style={styles.scene}>
    <Text>Week View Content</Text>
  </View>
);

const MonthView = () => (
  <View style={styles.scene}>
    <Text>Month View Content</Text>
  </View>
);

const ReadyToPayScreenTab = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'day', title: 'For Day'},
    {key: 'week', title: 'For Week'},
    {key: 'month', title: 'For Month'},
  ]);

  const renderScene = SceneMap({
    day: DayView,
    week: WeekView,
    month: MonthView,
  });

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width}}
      renderTabBar={props => (
        <TabBar
          {...props}
          style={styles.tabBar}
          indicatorStyle={styles.indicator}
          labelStyle={styles.label}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  scene: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  tabBar: {backgroundColor: '#001F4D'},
  indicator: {backgroundColor: 'white'},
  label: {color: 'white', fontSize: 14},
});

export default ReadyToPayScreenTab;
