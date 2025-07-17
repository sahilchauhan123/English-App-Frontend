import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  StyleSheet,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors, fonts} from '../../../../assets/constants';
import LinearGradient from 'react-native-linear-gradient';

const GenderScreen = ({jumpTo}) => {
  const [selectedGender, setSelectedGender] = useState('');
  const [age, setAge] = useState('');
  const [agePressed, setAgePressed] = useState(false);
  const ageInputRef = useRef(null);

  useEffect(() => {
    if (agePressed && ageInputRef.current) {
      setTimeout(() => ageInputRef.current?.focus(), 100);
    }
  }, [agePressed]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardView}>
        <View style={styles.content}>
          <Text style={styles.title}>Select your gender</Text>

          <View style={styles.genderContainer}>
            <LinearGradient
              colors={
                selectedGender == 'male'
                  ? [
                      colors.gradient.first,
                      colors.gradient.second,
                      colors.gradient.last,
                    ]
                  : [colors.bordercolor, colors.bordercolor]
              }
              start={{x: 0, y: 0}}
              end={{x: 0.7, y: 0}}
              style={styles.gradientBorder}>
              <Pressable
                style={styles.genderButton}
                onPress={() => setSelectedGender('male')}>
                <Image
                  style={styles.genderIcon}
                  source={require('../../../../assets/images/male.png')}
                />
                <Text style={styles.genderText}>Male</Text>
              </Pressable>
            </LinearGradient>
            <LinearGradient
              colors={
                selectedGender == 'female'
                  ? [
                      colors.gradient.first,
                      colors.gradient.second,
                      colors.gradient.last,
                    ]
                  : [colors.bordercolor, colors.bordercolor]
              }
              style={styles.gradientBorder}
              start={{x: 0, y: 0}}
              end={{x: 0.7, y: 0}}>
              <Pressable
                style={styles.genderButton}
                onPress={() => setSelectedGender('female')}>
                <Image
                  style={styles.genderIcon}
                  source={require('../../../../assets/images/female.png')}
                />
                <Text style={styles.genderText}>Female</Text>
              </Pressable>
            </LinearGradient>
          </View>

          <View style={styles.ageContainer}>
            {!agePressed ? (
              <TouchableOpacity
                style={styles.ageButton}
                onPress={() => setAgePressed(true)}>
                <View style={styles.inactiveInput}>
                  <Text style={styles.label}>Enter your age</Text>
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
                style={styles.activeInputBorder}>
                <View style={styles.activeInput}>
                  <Text style={[styles.label, {paddingTop: hp(1.5)}]}>
                    Enter your age
                  </Text>
                  <TextInput
                    ref={ageInputRef}
                    onChangeText={setAge}
                    style={styles.input}
                    cursorColor={colors.black}
                    keyboardType="numeric"
                    placeholder=""
                    placeholderTextColor={'black'}
                  />
                </View>
              </LinearGradient>
            )}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {age > 0 && selectedGender ? (
            <TouchableOpacity
              style={{width: '100%'}}
              onPress={() => jumpTo('third')}>
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
              onPress={() => jumpTo('third')}>
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
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: wp(5),
  },
  keyboardView: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  content: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  ageButton: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: hp(3),
  },
  genderContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(4),
  },
  gradientBorder: {
    borderRadius: wp(4.3),
    padding: 1,
  },
  genderButton: {
    borderRadius: wp(4),
    padding: hp(2.2),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(6),
    backgroundColor: colors.white,
  },
  genderIcon: {
    height: wp(25),
    width: wp(25),
  },
  genderText: {
    fontFamily: fonts.semiBold,
  },
  ageContainer: {
    width: '90%',
    alignItems: 'center',
    marginTop: hp(1),
  },
  inactiveInput: {
    borderColor: colors.bordercolor,
    borderWidth: 1,
    width: '100%',
    height: hp(8),
    marginTop: hp(2),
    justifyContent: 'center',
    borderRadius: hp(1.9),
    alignItems: 'flex-start',
    paddingLeft: wp(4),
  },
  activeInputBorder: {
    width: '100%',
    height: hp(8),
    marginTop: hp(2),
    borderRadius: hp(2.05),
  },
  activeInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: hp(1.9),
    paddingHorizontal: wp(4),
    justifyContent: 'center',
    margin: 1,
    height: hp(5),
  },
  label: {
    fontFamily: fonts.meduim,
    color: colors.bordercolor,
    // paddingTop: hp(1.5),
    marginBottom: hp(-0.8),
    fontSize: hp(1.8),
  },
  input: {
    fontFamily: fonts.semiBold,
    fontSize: wp(4.5),
    color: 'black',
    paddingTop: hp(0.5),
    paddingLeft: wp(-1),
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: wp(2),
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
  },
});

export default GenderScreen;
