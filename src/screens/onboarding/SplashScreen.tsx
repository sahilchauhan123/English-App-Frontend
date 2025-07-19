import {Image, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';


const SplashScreen = () => {
  const navigation = useNavigation()

  useEffect(()=>{
    setTimeout(() => {
      navigation.navigate("OnboardingSlider")
    }, 2000);
  },[])

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Image
        source={require('../../../assets/images/logo.png')}
        style={{height: hp(20 / 1.2), width: wp(40 / 1.2)}}
      />
      <View style={{justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontFamily: 'Poppins-Bold', fontSize: hp(4.4)}}>
          Strango
        </Text>
        <Text style={{fontFamily: 'Poppins-Medium', fontSize: hp(2.1),marginTop:wp(-1.8)}}>
          Speak English With Real People
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
