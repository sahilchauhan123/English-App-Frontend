import {Platform, StatusBar, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import Navigation from './src/navigation/Navigation'
import NetworkListener from './src/components/NetworkListener';
import IncomingCallModal from './src/components/IncomingCallModal';
import CallHeader from './src/components/CallHeader';


StatusBar.setBarStyle("light-content");
if (Platform.OS === "android") {
  StatusBar.setBackgroundColor("rgba(0,0,0,0)");
  StatusBar.setTranslucent(true);
}

const App = () => {
  //  useEffect(() => {
  //   lor(); // start listening for orientation change
  //   return () => rol(); // cleanup on unmount
  // }, []);

  return (
    <View style={{ flex: 1 }} >
      <CallHeader/>
      <Navigation />
      <NetworkListener/>
      <IncomingCallModal/>
    </View>
  )
}


export default App

const styles = StyleSheet.create({})
