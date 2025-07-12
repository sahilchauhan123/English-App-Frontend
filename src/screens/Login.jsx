import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { use, useEffect } from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

const Login = () => {
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
      // console.log('User Info:', userInfo.data?.idToken);
      const response = await postDataToBackend(userInfo.data?.idToken);
      console.log('Response from backend:', response);
    } catch (error) {
      console.error('Sign-in Error:', error);
    }
  };

  const postDataToBackend = async (googleToken: string) => {
    try {
      console.log('User Info1:', googleToken);
      const response = await fetch("http://192.168.193.24:8082/api/auth/creategoogleuser", {
        method: 'POST',
        body: JSON.stringify({
          id_token: googleToken,
          username: "sahilfaceyou",
          interests: ["Sports", "Coding", "Books"],
          gender : "M",
          age : "25",
          native_language: "Hindi",
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      return await response.json();
    } catch (error) {
      console.error('Error posting data to backend:', error);
    }
  }
  const fetchData = async () => {
    const res = await fetch("http://192.168.229.24:8082/ping/sahil")
    const data = await res.json()
    console.log(data)
  }
  return (
    <View>

      <Text>App</Text>
      <TouchableOpacity onPress={GoogleSignUp} style={{ padding: 10, backgroundColor: 'green' }}>
        <Text>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={fetchData} style={{ padding: 10, backgroundColor: 'green' }}>
        <Text>Get Data From Golang</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={fetchData} style={{ padding: 10, backgroundColor: 'green' }}>
        <Text>Create Account</Text>
      </TouchableOpacity> */}
      
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})
