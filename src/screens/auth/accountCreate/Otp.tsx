import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts } from '../../../../assets/constants';
import { useNavigation } from '@react-navigation/native';
import { create } from 'zustand';
import { baseURL } from '../../../utils/constants';
import { storeUserSession } from '../../../utils/tokens';
import useAuthStore from '../../../store/useAuthStore';

const Otp = ({ route }) => {
  const { onboardingData, type, email } = route.params;
  console.log('Onboarding Data:', onboardingData);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();
  const inputs = useRef([]);
  const { setUser } = useAuthStore();

  const handleChange = (text, index) => {
    const updatedOTP = [...otp];
    updatedOTP[index] = text;
    setOtp(updatedOTP);

    if (text && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        const updatedOTP = [...otp];
        updatedOTP[index - 1] = '';
        setOtp(updatedOTP);
        inputs.current[index - 1]?.focus();
      } else {
        const updatedOTP = [...otp];
        updatedOTP[index] = '';
        setOtp(updatedOTP);
      }
    }
  };

  const isFilled = otp.every(val => val !== '');

  const createAccount = async () => {
    const otpString = otp.join('').trim();

    if (type === 'login') {
      const response = await fetch(
        `${baseURL}/api/auth/email/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, otp: otpString }),
      })
      const data = await response.json();
      console.log(data);
      if (data.error) {
        console.log(data.error);
        return;
      }
      if (data.data.isRegistered) {
        ToastAndroid.show("Account Created", 2000);
        storeUserSession(data.data);
        setUser(data.data);
        navigation.navigate("Home");
      }
      return;
    } else {
      if (!onboardingData) {
        console.log('Please fill all the fields');
        return;
      }
      const response = await fetch(
        `${baseURL}/api/auth/email/signup`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...onboardingData, otp: otpString }),
      })
      const data = await response.json();
      console.log(data);
      if (data.error) {
        console.log(data.error);
        return;
      }
      if (data.data.isRegistered) {
        ToastAndroid.show("Account Created", 2000);
        setUser(data.data.user);
        const cred = {
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        }
        storeUserSession(cred);
        navigation.navigate("Home");
      }
    }
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={{ alignItems: 'center', flex: 1.4 }}>
          <Text style={styles.title}>Login</Text>

          <Text style={styles.confirmText}>
            <Text style={{ fontFamily: fonts.regular, fontSize: hp(2.3) }}>
              Confirmation code was sent to the email{' '}
            </Text>
            <Text
              style={{
                fontFamily: fonts.semiBold,
                color: colors.black,
                fontSize: hp(2.4),
              }}>
              {email}
            </Text>
          </Text>

          <TouchableOpacity>
            <Text style={styles.changeEmail}>Change email</Text>
          </TouchableOpacity>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => {
              const isActive = activeIndex === index;
              const isFilled = digit !== '';

              const showGradient = isFilled;

              return (
                <View key={index} style={styles.inputWrapper}>
                  <LinearGradient
                    colors={
                      showGradient
                        ? [
                          colors.gradient.first,
                          colors.gradient.second,
                          colors.gradient.last,
                        ]
                        : ['#d3d3d3', '#d3d3d3'] // grey for inactive
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientBox}>
                    <View style={styles.inputInner}>
                      <TextInput
                        ref={ref => (inputs.current[index] = ref)}
                        style={styles.otpInput}
                        textAlign="center"
                        keyboardType="number-pad"
                        maxLength={1}
                        value={digit}
                        caretHidden={true}
                        onFocus={() => setActiveIndex(index)}
                        onChangeText={text => {
                          const updatedOTP = [...otp];
                          updatedOTP[index] = text;
                          setOtp(updatedOTP);
                          if (text && index < otp.length - 1) {
                            setTimeout(() => {
                              inputs.current[index + 1]?.focus();
                            }, 50); // ⏳ Delay helps avoid premature blur
                            setActiveIndex(index + 1);
                          }
                        }}
                        onKeyPress={({ nativeEvent }) => {
                          if (nativeEvent.key === 'Backspace') {
                            if (digit === '' && index > 0) {
                              const updatedOTP = [...otp];
                              updatedOTP[index - 1] = '';
                              setOtp(updatedOTP);
                              inputs.current[index - 1]?.focus();
                              setActiveIndex(index - 1);
                            } else {
                              const updatedOTP = [...otp];
                              updatedOTP[index] = '';
                              setOtp(updatedOTP);
                            }
                          }
                        }}
                        blurOnSubmit={false}
                      />
                    </View>
                  </LinearGradient>
                </View>
              );
            })}
          </View>

          <Text style={styles.enterCodeText}>Get a new code</Text>
        </View>

        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            flex: 1,
            width: '100%',
          }}>
          <TouchableOpacity
            style={{ width: '100%' }}
            onPress={createAccount} >
            {isFilled ? (
              <LinearGradient
                colors={[
                  colors.gradient.first,
                  colors.gradient.second,
                  colors.gradient.last,
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.8, y: 0 }}
                style={styles.continueBtn}>
                <Text style={[styles.continueText, { color: colors.white }]}>
                  CONTINUE
                </Text>
              </LinearGradient>
            ) : (
              <TouchableOpacity
                onPress={createAccount}
                style={styles.continueButton}>
                <Text style={styles.continueText}>CONTINUE</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Otp;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.white,
    flex: 1,
    paddingVertical: hp(1),
    paddingHorizontal: wp(5),
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.semiBold,
    marginBottom: hp(2),
  },
  confirmText: {
    textAlign: 'center',
    fontFamily: fonts.regular,
    marginBottom: hp(1),
    marginTop: hp(12),
    flexWrap: 'wrap',
  },
  changeEmail: {
    color: colors.orange,
    fontFamily: fonts.semiBold,
    marginBottom: hp(4),
    fontSize: hp(1.9),
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(2),
    marginTop: hp(5),
  },
  gradientBox: {
    height: hp(9),
    width: hp(9),
    borderRadius: wp(3.3),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(2),
  },
  greyBox: {
    height: hp(9),
    width: hp(9),
    borderRadius: wp(3.3),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(2),
    borderWidth: 1,
    borderColor: '#ccc',
  },
  otpInput: {
    height: '96%',
    width: '96%',
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: wp(3),
    fontSize: hp(3.2),
    fontFamily: fonts.semiBold,
    color: 'black',
  },
  enterCodeText: {
    fontFamily: fonts.regular,
    fontSize: hp(1.8),
    marginTop: hp(1),
    marginBottom: hp(5),
  },
  continueBtn: {
    width: '100%',
    paddingVertical: hp(1.6),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(1.2),
  },
  continueText: {
    fontFamily: fonts.bold,
    color: colors.black,
  },
  inputWrapper: {
    marginHorizontal: wp(0),
  },

  inputInner: {
    height: '96%',
    width: '96%',
    backgroundColor: 'white',
    borderRadius: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
