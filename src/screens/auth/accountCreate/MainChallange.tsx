import React, { use, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Pressable,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors, fonts } from '../../../../assets/constants';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
import { baseURL } from '../../../utils/constants';
import { storeUserSession } from '../../../utils/tokens';
import useAuthStore from '../../../store/useAuthStore';

const MainChallenge = ({ onboardingData, setOnboardingData, jumpTo, type }) => {
  const navigation = useNavigation();
  const {setUser} = useAuthStore();
  const [challenge, setChallenge] = useState('');
  const challenges = [
    {
      task: "It's Hard to find time",
      emoji: require('../../../../assets/images/clock.png'),
    },
    {
      task: 'Grammar mistakes',
      emoji: require('../../../../assets/images/cross.png'),
    },
    {
      task: 'I am too nervous to speak',
      emoji: require('../../../../assets/images/teeth.png'),
    },
    {
      task: 'Scared of people making fun',
      emoji: require('../../../../assets/images/blank.png'),
    },
    {
      task: 'No environment to speak English',
      emoji: require('../../../../assets/images/book.png'),
    },
  ];

  const setEnglishChallenge = lang => {
    if (lang != challenge) {
      setOnboardingData({ ...onboardingData, mainChallenge: lang })
    }
    setChallenge(prev => (prev === lang ? '' : lang));
  };

  const createAccount = async () => {

    if (!onboardingData.gender) {
      console.log('Please select your gender')
      return 'Please select your gender';
    }

    if (!onboardingData.nativeLanguage) {
      console.log('Please select your language')

      return 'Please select your native language';
    }

    if (!onboardingData.currentEnglishLevel) {
      console.log('Please select your English level')

      return 'Please select your English level';
    }

    if (!onboardingData.age) {
      console.log('Please select your age')

      return 'Please enter your age';
    }

    if (!onboardingData.mainChallenge) {
      console.log('Please select your main challenge')

      return 'Please select your main challenge';
    }

    // console.log("local data going to server : ", onboardingData)

    if (type === "email") {
      // FOR EMAIL SIGNUP
      const response = await fetch(`${baseURL}/api/auth/email/generatesignupotp`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: onboardingData.email }),
      })
      const data = await response.json()
      console.log(data)
      navigation.navigate("Otp", {
        onboardingData
      })

    } else {
      // FOR GOOGLE SIGNUP
      const response = await fetch(`${baseURL}/api/auth/google/signup`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(onboardingData),
      });
      const data = await response.json()
      console.log(data)
      if (data["error"]) {
        Toast.show(data["error"], 3000)
        return
      }
      if (data.data.isRegistered) {
        Toast.show("Account Created", 2000)
        setUser(data.data)
        storeUserSession(data.data);
        navigation.navigate("Home")
        return
      }
    }


  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardAvoidView}>
        <View style={styles.header}>
          <Text style={styles.title}>
            What is main challenge for you in speaking English?
          </Text>
        </View>

        <View style={styles.listContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {challenges.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => setEnglishChallenge(item.task)}
                style={{ width: '100%' }}>
                <LinearGradient
                  colors={
                    item.task == challenge
                      ? [
                        colors.gradient.first,
                        colors.gradient.second,
                        colors.gradient.last,
                      ]
                      : [colors.bordercolor, colors.bordercolor]
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0.9, y: 0 }}
                  style={styles.gradientButton1}>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: colors.white,
                      padding: 6,
                      width: '100%',
                      borderRadius: wp(2),
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        padding: wp(1),
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{ height: wp(7), width: wp(7) }}
                        source={item.emoji}
                      />
                      <Text
                        style={{ paddingLeft: wp(5), fontFamily: fonts.meduim }}>
                        {item.task}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.buttonContainer}>
          {challenge ? (
            <TouchableOpacity
              onPress={createAccount}
              style={{ width: '100%' }}>
              <LinearGradient
                colors={[
                  colors.gradient.first,
                  colors.gradient.second,
                  colors.gradient.last,
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.9, y: 0 }}
                style={styles.gradientButton}>
                <Text style={styles.gradientButtonText}>CONTINUE</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => Toast.show("Please fill all details", 1000)}
              style={styles.continueButton}>
              <Text style={styles.continueText}>CONTINUE</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  keyboardAvoidView: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: hp(1),
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // backgroundColor:'lightblue'
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: hp(2.6),
    textAlign: 'center',
  },
  searchContainer: {
    borderColor: colors.bordercolor,
    borderWidth: wp(0.3),
    width: '100%',
    marginTop: hp(4),
    borderRadius: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3.8),
  },
  searchIcon: {
    height: wp(6),
    width: wp(6),
  },
  searchInput: {
    width: wp(70),
    fontFamily: fonts.regular,
    fontSize: hp(1.7),
    paddingLeft: wp(2),
    color: colors.grey,
  },
  listContainer: {
    paddingTop: hp(1),
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(2),
    paddingHorizontal: wp(2),
  },
  languageText: {
    fontFamily: fonts.meduim,
    fontSize: hp(2),
  },
  tickIcon: {
    height: wp(6),
    width: wp(6),
  },
  emptyCircle: {
    height: wp(5),
    width: wp(5),
    borderRadius: wp(100),
    borderWidth: wp(0.5),
    borderColor: colors.bordercolor,
  },
  buttonContainer: {
    paddingBottom: hp(0),
  },
  gradientButton: {
    width: '100%',
    paddingVertical: hp(1.6),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(1.2),
    marginTop: hp(2),
  },
  gradientButton1: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(2.3),
    marginTop: hp(2),
    padding: hp(0.16),
  },
  gradientButtonText: {
    fontFamily: fonts.bold,
    color: colors.white,
  },
  continueButton: {
    borderColor: colors.bordercolor,
    borderWidth: 1,
    width: '100%',
    paddingVertical: hp(1.6),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(1.2),
    marginTop: hp(2),
  },
  continueText: {
    fontFamily: fonts.bold,
  },
});

export default MainChallenge;
