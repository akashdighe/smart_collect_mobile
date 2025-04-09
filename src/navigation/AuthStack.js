import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import OtpVerification from '../screens/Auth/OtpVerification';

const AuthStack = () => {
  const AuthStack = createNativeStackNavigator();

  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen
        options={{headerShown: false}}
        name="Login"
        component={LoginScreen}
      />
      <AuthStack.Screen
        options={{headerShown: false}}
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <AuthStack.Screen
        options={{headerShown: false}}
        name="OtpVerification"
        component={OtpVerification}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStack;
