import React from 'react';

import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CardStyleInterpolators} from '@react-navigation/stack';

// Screens
import Splash from 'screens/SplashScreen';
import SignIn from 'screens/SignIn';
import SignUp from 'screens/SignUp';

// Local
import TabNavigator from './bottomTabNavigator';

export const navigationRef = createNavigationContainerRef();

const Stack = createNativeStackNavigator();

const StackNavigatorConfig = {
  headerShown: false,
  gestureEnabled: false,
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
};

const RootNavigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={StackNavigatorConfig}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="MainTab" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
