import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../screens/onboarding/SplashScreen';
import OnboardingSlider from '../screens/onboarding/OnboardingSlider';
import SignIn from '../screens/auth/SignIn';
import LoginOrSignup from '../screens/auth/LoginOrSignup';
import Otp from '../screens/auth/accountCreate/Otp';
import LanguageSelector from '../screens/auth/accountCreate/LanguageSelector';

const Navigation = () => {
  const [initialRoute, setInitialRoute] = useState('LanguageSelector'); // default SplashScreen
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{headerShown: false, statusBarStyle: 'dark'}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="OnboardingSlider" component={OnboardingSlider} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="LoginOrSignup" component={LoginOrSignup} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="LanguageSelector" component={LanguageSelector} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
