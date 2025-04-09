import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PendingAllocation from '../screens/Allocation/PendingAllocation';
import TodayAllocation from '../screens/Allocation/TodayAllocation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const TopTab = createBottomTabNavigator();

const QuickActionTabs = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="PendingAllocation" component={PendingAllocation} />
      <TopTab.Screen name="TodayAllocation" component={TodayAllocation} />
    </TopTab.Navigator>
  );
};

export default QuickActionTabs;
