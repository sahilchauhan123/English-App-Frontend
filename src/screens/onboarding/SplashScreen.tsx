import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { retrieveUserSession } from '../../utils/tokens';
import useAuthStore from '../../store/useAuthStore';
import useBasicStore from '../../store/userBasicStore';
import { initSocket } from '../../services/socket';

const SplashScreen = () => {

  const navigation = useNavigation();
  const { setUser } = useAuthStore();
  const { userOnboarded } = useBasicStore();


  useEffect(() => {
    handleNavigation();
  }, []);

  async function handleNavigation() {
    // Logic to determine the initial route based on user authentication status
    const data = await retrieveUserSession();

    try {
      if (data) {
        setUser(data);
        console.log('data', data);
        console.log('User is authenticated');
        initSocket();
        navigation.navigate('Tabs');  
      } else {
        if (userOnboarded) {
          console.log('User is not authenticated but completed onboarding');
          navigation.navigate('SignIn');
        } else {
          console.log('User has not completed onboarding');
          navigation.navigate('OnboardingSlider');
        }
      }
    } catch (error) {
      console.error('Error retrieving user session:', error);
      navigation.navigate('OnboardingSlider');
    }
  }



  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Image
        source={require('../../../assets/images/logo.png')}
        style={{ height: hp(20 / 1.2), width: wp(40 / 1.2) }}
      />
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: hp(4.4) }}>
          Strango
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: hp(2.1),
            marginTop: wp(-1.8),
          }}>
          Speak English With Real People
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
