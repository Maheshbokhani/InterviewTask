import React from 'react';
import {Platform, StyleSheet, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

// Screens
import Home from 'screens/Home';
import Dashboard from 'screens/Dashboard';
import Profile from 'screens/Profile';
import ContactForm from 'screens/ContactForm';
import UserList from 'screens/UserList';

// Utils
import {colors} from 'utils/colors';

const Tab = createBottomTabNavigator();

const CustomTab = ({color, size, route}) => {
  const commonProps = {
    size: size * 0.8,
    color,
    style: {
      marginTop: Platform.OS === 'ios' ? 3 : 0,
    },
  };
  if (route.name === 'Home') {
    return <AntDesign name={'home'} {...commonProps} />;
  } else if (route.name === 'Dashboard') {
    return <AntDesign name={'dashboard'} {...commonProps} />;
  } else if (route.name === 'Contact Form') {
    return <AntDesign name={'form'} {...commonProps} />;
  } else if (route.name === 'Profile') {
    return <AntDesign name={'user'} {...commonProps} />;
  }
  return <Entypo name={'list'} {...commonProps} />;
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon(props) {
          return <CustomTab {...props} route={route} />;
        },
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarLabel(props) {
          return (
            <Text style={[styles.label, props.focused && styles.focusedLabel]}>
              {route.name}
            </Text>
          );
        },
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.forground,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Contact Form" component={ContactForm} />
      <Tab.Screen name="User List" component={UserList} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  label: {fontSize: 11, lineHeight: 13},
  focusedLabel: {fontWeight: 'bold', color: colors.blue},
});

export default TabNavigator;
