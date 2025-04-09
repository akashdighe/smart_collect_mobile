import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavBar from '../components/BottomNav/BottomNav';
import PendingAllocation from '../screens/Allocation/PendingAllocation';
import TodayAllocation from '../screens/Allocation/TodayAllocation';
import TopNav from '../components/TopNav/TopNav';

const AppStack = () => {
  const AppStack = createNativeStackNavigator();

  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="DashBoard"
        options={{headerShown: false}}
        component={BottomNavBar}
      />
      <AppStack.Screen
        name="PendingAllocation"
        component={PendingAllocation}
        options={{header: () => <TopNav title="Pending Allocation" />}}
      />
      <AppStack.Screen
        name="TodayAllocation"
        component={TodayAllocation}
        options={{header: () => <TopNav title="Today Allocation" />}}
      />
    </AppStack.Navigator>
  );
};

export default AppStack;
