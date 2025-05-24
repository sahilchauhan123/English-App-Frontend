import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { FactorId } from 'firebase/auth/web-extension'

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '654497521442-4kdbkr8v9gker2ndkbadseu8ufmp33j2.apps.googleusercontent.com',
      offlineAccess: false,
    })
  }, [])

  const GoogleSignUp = async () => {
    try {   
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo.data);
    } catch (error) {
      console.error('Sign-in Error:', error);
    }
  };
  return (
    <View>
      <Text>App</Text>
      <TouchableOpacity onPress={GoogleSignUp} style={{padding:10,backgroundColor:'green'}}>
        <Text>login with google</Text>
      </TouchableOpacity>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})