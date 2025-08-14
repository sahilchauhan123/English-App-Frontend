import {Platform, StatusBar, StyleSheet, View } from 'react-native'
import React from 'react'
import Navigation from './src/navigation/Navigation'
import NetworkListener from './src/components/NetworkListener';
import IncomingCallModal from './src/components/IncomingCallModal';

StatusBar.setBarStyle("light-content");
if (Platform.OS === "android") {
  StatusBar.setBackgroundColor("rgba(0,0,0,0)");
  StatusBar.setTranslucent(true);
}

const App = () => {
  return (
    <View style={{ flex: 1 }} >
      <Navigation />
      <NetworkListener/>
      <IncomingCallModal/>
    </View>
  )
}


export default App

const styles = StyleSheet.create({})
