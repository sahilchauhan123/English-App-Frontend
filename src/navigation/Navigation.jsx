import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
        {/* <Stack.Screen /> */}
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
