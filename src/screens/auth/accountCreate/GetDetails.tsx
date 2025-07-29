import React, { useRef, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors, fonts } from '../../../../assets/constants';
import { TabView } from 'react-native-tab-view';
import LanguageSelector from './LanguageSelector';
import GenderScreen from './GenderScreen';
import LinearGradient from 'react-native-linear-gradient';
import EnglishLevel from './EnglishLevel';
import MainChallenge from './MainChallange';

const Line = () => <View style={styles.line} />;

const GradientLine = () => {
  return (
    <LinearGradient
      colors={[colors.gradient.first, colors.gradient.last]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 0 }}
      style={styles.gradientLine}
    />
  );
};

const GetDetails = ({ route }) => {
  const { token, type ,email } = route.params;
  console.log("email: ",email)
  const initialState = type === "email"
    ? {
      gender: '',
      nativeLanguage: '',
      currentEnglishLevel: '',
      age: '',
      mainChallenge: '',
      username: '',
      full_name: '',
      profile_pic: '',
      email: email,
      auth_type: 'email',
    }
    : {
      gender: '',
      nativeLanguage: '',
      currentEnglishLevel: '',
      age: '',
      mainChallenge: '',
      username: '',
      id_token: token,
    };

  const [onboardingData, setOnboardingData] = useState(initialState);


  // FullName string `json:"full_name" binding:"required"`
  // Username string `json:"username" binding:"required"`
  // Email    string `json:"email" binding:"required,email"`
  // Age      int    `json:"age" binding:"required"`
  // Gender   string `json:"gender" binding:"required"`
  // ProfilePic          string `json:"profile_pic" binding:"required,url"`
  // AuthType            string `json:"auth_type" binding:"required"` // "google" or "email"
  // MainChallenge       string `json:"mainChallenge" binding:"required"`
  // NativeLanguage      string `json:"nativeLanguage" binding:"required"`
  // CurrentEnglishLevel string `json:"currentEnglishLevel" binding:"required"`



  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Language' },
    { key: 'second', title: 'GenderScreen' },
    { key: 'third', title: 'OTP' },
    { key: 'fourth', title: 'Challenge' },
  ]);

  const renderScene = ({ route, jumpTo }) => {

    const props = { jumpTo, onboardingData, setOnboardingData };
    switch (route.key) {
      case 'first':
        return <LanguageSelector {...props} />;
      case 'second':
        return <GenderScreen {...props} type={type} />;
      case 'third':
        return <EnglishLevel {...props} />;
      case 'fourth':
        return <MainChallenge {...props} type={type}/>;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressContainer}>
        {routes.map((step, i) => (
          <View key={i}>{index >= i ? <Line /> : <GradientLine />}</View>
        ))}
      </View>
      <View style={{ flex: 1, marginTop: hp(2) }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          swipeEnabled={true}
          renderTabBar={() => null}
          lazy
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  progressContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(8),
  },
  line: {
    height: hp(0.7),
    width: wp(12),
    backgroundColor: colors.gradient.first,
    borderRadius: wp(1),
    marginHorizontal: wp(0.6),
  },
  gradientLine: {
    height: hp(0.7),
    width: wp(12),
    borderRadius: wp(1),
    marginHorizontal: wp(0.6),
    opacity: 0.13,
  },
});

export default GetDetails;
