import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/onboarding/SplashScreen';
import OnboardingSlider from '../screens/onboarding/OnboardingSlider';
import SignIn from '../screens/auth/SignIn';
import LoginOrSignup from '../screens/auth/LoginOrSignup';
import Otp from '../screens/auth/accountCreate/Otp';
import GetDetails from '../screens/auth/accountCreate/GetDetails';
import CallScreen from '../screens/callScreen/CallScreen';
import { navigationRef } from './navigationService';
import Home from '../screens/tabs/home/Home';
import Tabs from '../screens/tabs/Tabs';
import Setting from '../screens/settings/Setting';
import AiCall from '../screens/callScreen/AiCall';
import OtherUserProfile from '../screens/tabs/profile/OtherUserProfile';



const Navigation = () => {
  const [initialRoute, setInitialRoute] = useState("SplashScreen"); // default SplashScreen
  const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false, statusBarStyle: 'dark' }}>

        {/* for Auth screens */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="OnboardingSlider" component={OnboardingSlider} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="LoginOrSignup" component={LoginOrSignup} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="GetDetails" component={GetDetails} />

        {/* for Tabs screens */}
        <Stack.Screen name="Tabs" component={Tabs} />

        {/* for Extra screen */}
        <Stack.Screen name="CallScreen" component={CallScreen} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="AiCall" component={AiCall} />
        <Stack.Screen name="OtherUserProfile" component={OtherUserProfile} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
