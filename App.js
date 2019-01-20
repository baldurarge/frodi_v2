/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, NavigatorIOS} from 'react-native';
import Calculator from './app/views/Calculator';
import { createStackNavigator} from 'react-navigation';


const NavigationApp = createStackNavigator({
  Home: {screen: Calculator}
})
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component{
  render() {
    return (
      <NavigationApp/>
    );
  }
}
