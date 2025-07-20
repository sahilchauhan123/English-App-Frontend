import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, fonts} from '../../../assets/constants';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import { GoogleSignUp } from '../../utils/google';

const LoginOrSignup = () => {
  const [emailPressed, setEmailPressed] = useState(false);
  const [passwordPressed, setPasswordPressed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (emailPressed) {
      setTimeout(() => {
        emailRef.current?.focus();
      }, 100);
    }
    if (passwordPressed) {
      setTimeout(() => {
        passwordRef.current?.focus();
      }, 100);
    }
  }, [emailPressed, passwordPressed]);

  const GoogleLogin = async ()=>{
    const token = await GoogleSignUp();
    console.log(token)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.heading}>Login or Signup</Text>

          <View style={styles.formWrapper}>
            <View style={{width: '100%', marginTop: hp(2)}}>
              {/* Email Input */}
              {!emailPressed ? (
                <TouchableOpacity
                  style={{width: '100%'}}
                  onPress={() => setEmailPressed(true)}>
                  <View style={styles.inactiveInputWrapper}>
                    <Text style={[styles.label, {paddingTop: hp(0)}]}>
                      Email
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <LinearGradient
                  colors={[
                    colors.gradient.first,
                    colors.gradient.second,
                    colors.gradient.last,
                  ]}
                  start={{x: 0, y: 0}}
                  end={{x: 0.7, y: 0}}
                  style={styles.gradientBorder}>
                  <View style={styles.activeInputInner}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                      onChangeText={setEmail}
                      ref={emailRef}
                      style={styles.textInput}
                      cursorColor={colors.black}
                      autoComplete="email"
                      keyboardType="email-address"
                      placeholder=""
                      placeholderTextColor={'black'}
                    />
                  </View>
                </LinearGradient>
              )}

              {/* Password Input */}
              {!passwordPressed ? (
                <TouchableOpacity
                  style={{width: '100%'}}
                  onPress={() => setPasswordPressed(true)}>
                  <View style={styles.inactiveInputWrapper}>
                    <Text style={[styles.label, {paddingTop: hp(0)}]}>
                      Password
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <LinearGradient
                  colors={[
                    colors.gradient.first,
                    colors.gradient.second,
                    colors.gradient.last,
                  ]}
                  start={{x: 0, y: 0}}
                  end={{x: 0.7, y: 0}}
                  style={styles.gradientBorder}>
                  <View style={styles.activeInputInner}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                      onChangeText={setPassword}
                      ref={passwordRef}
                      style={styles.textInput}
                      cursorColor={colors.black}
                      secureTextEntry
                      placeholder=""
                      placeholderTextColor={'black'}
                    />
                  </View>
                </LinearGradient>
              )}
            </View>

            {/* Continue Button */}
            {email.length > 0 && password.length > 0 ? (
              <TouchableOpacity
                style={{width: '100%'}}
                onPress={() => navigation.navigate('Otp')}>
                <LinearGradient
                  colors={[
                    colors.gradient.first,
                    colors.gradient.second,
                    colors.gradient.last,
                  ]}
                  start={{x: 0, y: 0}}
                  end={{x: 0.9, y: 0}}
                  style={styles.gradientButton}>
                  <Text style={styles.gradientButtonText}>CONTINUE</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.continueButton}
                onPress={() => navigation.navigate('Otp')}>
                <Text style={styles.continueText}>CONTINUE</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginOrSignup;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.white,
    flex: 1,
    paddingVertical: hp(1),
    paddingHorizontal: wp(5),
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  heading: {
    fontFamily: fonts.semiBold,
    fontSize: hp(2.6),
  },
  formWrapper: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inactiveInputWrapper: {
    borderColor: colors.bordercolor,
    borderWidth: 1,
    width: '100%',
    height: hp(9),
    marginTop: hp(2),
    justifyContent: 'center',
    borderRadius: hp(1.9),
    alignItems: 'flex-start',
    paddingLeft: wp(4),
  },
  gradientBorder: {
    width: '100%',
    height: hp(9),
    marginTop: hp(2),
    borderRadius: hp(2.05),
  },
  activeInputInner: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: hp(1.9),
    paddingHorizontal: wp(4),
    justifyContent: 'center',
    margin: 1,
  },
  label: {
    fontFamily: fonts.meduim,
    color: colors.bordercolor,
    paddingTop: hp(1.5),
    marginBottom: hp(-0.8),
    fontSize: hp(1.9),
  },
  textInput: {
    fontFamily: fonts.semiBold,
    fontSize: hp(2),
    color: 'black',
    paddingTop: hp(0.5),
    paddingLeft: wp(-1),
  },
  gradientButton: {
    width: '100%',
    paddingVertical: hp(1.6),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(1.2),
    marginTop: hp(2),
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
    fontSize: hp(1.9),
  },
});
