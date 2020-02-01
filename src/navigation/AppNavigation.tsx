import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { THEME } from '../theme';
import { CalendarScreen } from '../screens/CalendarScreen';
import { DayScreen } from '../screens/DayScreen';
import { ListScreen } from '../screens/ListScreen';

const CalendarNavigator = createStackNavigator(
  {
    Main: {
      screen: CalendarScreen,
    },
    Day: {
      screen: DayScreen,
    },
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: THEME.mainColor,
      },
      headerTintColor: '#fff',
    },
  }
);

const ListNavigator = createStackNavigator(
  {
    List: {
      screen: ListScreen,
    },
    Calendar: {
      screen: CalendarScreen,
    },
  },
  {
    initialRouteName: 'List',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: THEME.mainColor,
      },
      headerTintColor: '#fff',
    },
  }
);

const BottomNavigator = createMaterialBottomTabNavigator(
  {
    Calendar: {
      screen: CalendarNavigator,
      navigationOptions: {
        tabBarLabel: 'Календарь',
        tabBarIcon: info => (
          <Ionicons name="ios-calendar" size={26} color={info.tintColor} />
        ),
      },
    },
    List: {
      screen: ListNavigator,
      navigationOptions: {
        tabBarLabel: 'Список',
        tabBarIcon: info => (
          <Ionicons name="ios-list-box" size={26} color={info.tintColor} />
        ),
      },
    },
  },
  {
    activeColor: '#fff',
    barStyle: {
      backgroundColor: THEME.mainColor,
    },
  }
);

export const AppNavigation = createAppContainer(BottomNavigator);
