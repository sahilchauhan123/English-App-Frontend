import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navigation from './src/navigation/Navigation'

StatusBar.setBarStyle("light-content");
if (Platform.OS === "android") {
  StatusBar.setBackgroundColor("rgba(0,0,0,0)");
  StatusBar.setTranslucent(true);
}

const App = () => {
  return (
    <Navigation/>
  )
}

export default App

const styles = StyleSheet.create({})