import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, fonts} from '../../../assets/constants';

const Otp = () => {
  const [otp, setOtp] = useState(['', '', '', '']);

  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (text) {
      const updatedOTP = [...otp];
      updatedOTP[index] = text;
      setOtp(updatedOTP);

      if (index < otp.length - 1) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={{ alignItems: 'center', flex: 1.4}}>
          <Text style={styles.title}>Login</Text>

          <Text style={styles.confirmText}>
            <Text style={{fontFamily: fonts.regular, fontSize: wp(4.6)}}>
              Confirmation code was sent to the email{' '}
            </Text>
            <Text
              style={{
                fontFamily: fonts.semiBold,
                color: colors.black,
                fontSize: wp(4.6),
              }}>
              akshitagulerialdh@gmail.com
            </Text>
          </Text>

          <TouchableOpacity>
            <Text style={styles.changeEmail}>Change email</Text>
          </TouchableOpacity>

          <View style={styles.otpContainer}>
            {otp.map((value, index) => (
              <LinearGradient
                key={index}
                colors={[
                  colors.gradient.first,
                  colors.gradient.second,
                  colors.gradient.last,
                ]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.gradientBox}>
                <TextInput
                  textAlign="center"
                  caretHidden={true}
                  ref={ref => (inputs.current[index] = ref)}
                  style={styles.otpInput}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={otp[index]}
                  onChangeText={text => handleChange(text, index)}
                  onKeyPress={({nativeEvent}) => {
                    if (nativeEvent.key === 'Backspace') {
                      if (otp[index] === '') {
                        if (index > 0) {
                          inputs.current[index - 1]?.focus();

                          const updatedOTP = [...otp];
                          updatedOTP[index - 1] = '';
                          setOtp(updatedOTP);
                        }
                      } else {
                        const updatedOTP = [...otp];
                        updatedOTP[index] = '';
                        setOtp(updatedOTP);
                      }
                    }
                  }}
                />
              </LinearGradient>
            ))}
          </View>

          <Text style={styles.enterCodeText}>Enter the code</Text>
        </View>
        <View style={{justifyContent: 'flex-end', alignItems: 'center', flex: 1,width:'100%'}}>
          <TouchableOpacity style={{width: '100%'}}>
            <LinearGradient
              colors={[
                colors.gradient.first,
                colors.gradient.second,
                colors.gradient.last,
              ]}
              start={{x: 0, y: 0}}
              end={{x: 0.8, y: 0}}
              style={styles.continueBtn}>
              <Text style={styles.continueText}>CONTINUE</Text>
            </LinearGradient>
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
    fontSize: wp(5.5),
    marginBottom: hp(2),
  },
  confirmText: {
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: wp(3.6),
    marginBottom: hp(1),
    marginTop: hp(12),
    flexWrap: 'wrap',
  },
  changeEmail: {
    color: colors.orange,
    fontFamily: fonts.semiBold,
    marginBottom: hp(4),
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
  otpInput: {
    height: '96%',
    width: '96%',
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: wp(3),
    fontSize: wp(6),
    fontFamily: fonts.semiBold,
    color: 'black',
  },
  enterCodeText: {
    fontFamily: fonts.regular,
    fontSize: wp(3.5),
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
    color: colors.white,
  },
});
