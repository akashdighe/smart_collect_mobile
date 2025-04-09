import {
  View,
  Image,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Text,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/Home/HomeScreen';
import ReadyToPayScreen from '../../screens/ReadyToPay/ReadyToPayScreen';
import EmiScreen from '../../screens/EmiCollection/EmiScreen';
import ProfileScreen from '../../screens/Profile/ProfileScreen';
import InsetShadow from 'react-native-inset-shadow';
import FeedBackScreen from '../../screens/ReadyToPay/FeedBackScreen';
import {useNavigation} from '@react-navigation/native';
import PendingAllocation from '../../screens/Allocation/PendingAllocation';
import TodayAllocation from '../../screens/Allocation/TodayAllocation';
import TopNav from '../TopNav/TopNav';

// Create Stack Navigators for proper back navigation
const HomeStack = createNativeStackNavigator();
const ReadyToPayStack = createNativeStackNavigator();
const EmiStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

// Stack Navigator for Home
const HomeNavigator = () => (
  <HomeStack.Navigator
    screenOptions={{
      // headerShown: false,
      headerStyle: {backgroundColor: '#0F2050'},
      headerTintColor: '#fff',
    }}>
    <HomeStack.Screen
      name="HomeStack"
      component={HomeScreen}
      options={{header: () => <TopNav />}}
    />
  </HomeStack.Navigator>
);
// Stack Navigator for ReadyToPay
const ReadyToPayNavigator = () => (
  <ReadyToPayStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: '#0F2050'},
      headerTintColor: '#fff',
    }}>
    <ReadyToPayStack.Screen
      name="ReadyToPayMain"
      component={ReadyToPayScreen}
      options={{header: () => <TopNav />}}
    />
    <ReadyToPayStack.Screen
      name="ReadyToPayFeedBack"
      component={FeedBackScreen}
      options={{header: () => <TopNav />}}
    />
  </ReadyToPayStack.Navigator>
);

// Stack Navigator for EMI Collection
const EmiNavigator = () => (
  <EmiStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: '#0F2050'},
      headerTintColor: '#fff',
    }}>
    <EmiStack.Screen
      name="EmiMain"
      component={EmiScreen}
      options={{header: () => <TopNav />}}
    />
    <ReadyToPayStack.Screen
      name="FeedBack"
      component={FeedBackScreen}
      options={{header: () => <TopNav />}}
    />
  </EmiStack.Navigator>
);

// Stack Navigator for Profile
const ProfileNavigator = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: '#0F2050'},
      headerTintColor: '#fff',
      headerShown: false,
    }}>
    <ProfileStack.Screen
      name="ProfileMain"
      component={ProfileScreen}
      options={{title: 'Profile'}}
    />
  </ProfileStack.Navigator>
);
const QuickAction = () => null;

const QuickStack = createNativeStackNavigator();

// **NEW: Stack for Quick Action Screens**
const QuickActionNavigator = () => (
  <QuickStack.Navigator
    screenOptions={{
      headerShown: true,
      header: () => <TopNav />,
    }}>
    <QuickStack.Screen name="QuickMain" component={QuickAction} />
    <QuickStack.Screen name="PendingAllocation" component={PendingAllocation} />
    <QuickStack.Screen name="TodayAllocation" component={TodayAllocation} />
  </QuickStack.Navigator>
);

const Tab = createBottomTabNavigator();

// tab Componet
const BottomNavBar = () => {
  const [isQuickActionOpen, setQuickActionOpen] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const buttonRotation = useRef(new Animated.Value(0)).current; // Rotation for quick action buttons

  const navigation = useNavigation();

  const toggleQuickAction = () => {
    if (isQuickActionOpen) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(buttonRotation, {
          toValue: 0,
          duration: 450,
          useNativeDriver: true,
        }),
      ]).start(() => setQuickActionOpen(false));
    } else {
      setQuickActionOpen(true);
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(buttonRotation, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'], // Rotate FAB when clicked
  });

  const buttonRotateInterpolation = buttonRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Rotate quick action buttons in full circle
  });

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#0F2050',
            height: 55,
            padding: 5,
            borderRadius: 15,
            margin: 5,
          },
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#808080',
        }}>
        <Tab.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            title: 'Home',
            tabBarIcon: ({focused}) => (
              <Image
                source={require('../../assets/images/Home.png')}
                style={{tintColor: focused ? '#ffffff' : '#808080'}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Ready to Pay"
          component={ReadyToPayNavigator}
          options={{
            title: 'Ready to Pay',
            tabBarIcon: ({focused}) => (
              <Image
                source={require('../../assets/images/ReadyToPay.png')}
                style={{tintColor: focused ? '#ffffff' : '#808080'}}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Quick Action"
          component={QuickActionNavigator}
          options={{
            title: 'Quick Action',
            tabBarButton: ({focused}) => {
              <Image
                source={require('../../assets/images/ReadyToPay.png')}
                style={{tintColor: focused ? '#ffffff' : '#808080'}}
              />;
            },
            tabBarButton: () => (
              <View style={styles.quickActionContainer}>
                {isQuickActionOpen && (
                  <>
                    <Animated.View
                      style={[
                        styles.floatingButton,
                        {
                          transform: [
                            {scale: scaleAnim},
                            {rotate: buttonRotateInterpolation},
                            {
                              translateX: scaleAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 70 * Math.cos(Math.PI / 5)], // Move Right
                              }),
                            },
                            {
                              translateY: scaleAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, -110 * Math.sin(Math.PI / 5)], // Move Up
                              }),
                            },
                          ],
                        },
                      ]}>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => {
                          navigation.navigate('Quick Action', {
                            screen: 'PendingAllocation',
                          });
                        }}>
                        <Image
                          source={require('../../assets/images/PendingAllocation.png')}
                          style={styles.actionIcon}
                        />
                      </TouchableOpacity>
                    </Animated.View>

                    <Animated.View
                      style={[
                        styles.floatingButton,
                        {
                          transform: [
                            {scale: scaleAnim},
                            {rotate: buttonRotateInterpolation},
                            {
                              translateX: scaleAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, -70 * Math.cos(Math.PI / 5)], // Move Left
                              }),
                            },
                            {
                              translateY: scaleAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, -110 * Math.sin(Math.PI / 5)], // Move Up
                              }),
                            },
                          ],
                        },
                      ]}>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => {
                          navigation.navigate('Quick Action', {
                            screen: 'TodayAllocation',
                          });
                        }}>
                        <Image
                          source={require('../../assets/images/TodayAllocation.png')}
                          style={styles.actionIcon}
                        />
                      </TouchableOpacity>
                    </Animated.View>
                  </>
                )}

                <TouchableOpacity
                  style={styles.fabContainer}
                  onPress={toggleQuickAction}>
                  <InsetShadow
                    containerStyle={styles.fab}
                    shadowRadius={15} // Increase for a deeper shadow
                    shadowOpacity={0.8} // Increase opacity for a darker effect
                    elevation={10} // Helps on Android
                    shadowOffset={5} // Adjust the offset for better depth
                  >
                    <Animated.Image
                      source={require('../../assets/images/plusIcon.png')}
                      style={[
                        styles.fabIcon,
                        {transform: [{rotate: rotateInterpolation}]},
                      ]}
                    />
                  </InsetShadow>
                </TouchableOpacity>

                <Text style={styles.quickActionText}>Quick Action</Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="EMI Collection"
          component={EmiNavigator}
          options={{
            title: 'EMI Collection',
            tabBarIcon: ({focused}) => (
              <Image
                source={require('../../assets/images/EmiCollection.png')}
                style={{tintColor: focused ? '#ffffff' : '#808080'}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileNavigator}
          options={{
            title: 'Profile',
            tabBarIcon: ({focused}) => (
              <Image
                source={require('../../assets/images/Profile.png')}
                style={{tintColor: focused ? '#ffffff' : '#808080'}}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  quickActionContainer: {
    alignItems: 'center',
    marginTop: -30,
  },
  fabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    width: 62,
    height: 62,
    borderRadius: 31, // Half of width/height for a perfect circle
    backgroundColor: '#E3F5F6',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // Ensures shadow fits properly
  },
  fabIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },

  floatingButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0F2050',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    width: 24,
    height: 24,
    tintColor: '#ffffff',
    resizeMode: 'contain',
  },
  quickActionText: {
    color: '#808080',
    fontSize: 10,
    marginTop: 2,
  },
});

export default BottomNavBar;
