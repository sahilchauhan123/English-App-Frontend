import React, { useState } from 'react';
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
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors, fonts, nativeLanguages } from '../../../../assets/constants';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';

const EnglishLevel = ({ onboardingData, setOnboardingData, jumpTo }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const EnglishLVL = [
    'Just starting out',
    'Basic understanding',
    'Can hold simple conversation',
  ];
  const [level, setLevel] = useState();


  const setEnglishLevel = lang => {
    if (lang != level) {
      setOnboardingData({ ...onboardingData, currentEnglishLevel: lang })
    }
    setLevel(prev => (prev === lang ? '' : lang));
  };



  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardAvoidView}>
        <View style={styles.header}>
          <Text style={styles.title}>What is your English level?</Text>
        </View>

        <View style={styles.listContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {EnglishLVL.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.listItem}
                onPress={() => setEnglishLevel(item)}>
                <Text style={styles.languageText}>{item}</Text>
                {item === level ? (
                  <Image
                    source={require('../../../../assets/images/tick-circle.png')}
                    style={styles.tickIcon}
                  />
                ) : (
                  <View style={styles.emptyCircle} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.buttonContainer}>
          {level && onboardingData.currentEnglishLevel ? (
            <TouchableOpacity
              onPress={() => jumpTo('fourth')}
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
                <Text style={styles.gradientButtonText}>Next</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => Toast.show("Please Select English Level", 1000)}
              style={styles.continueButton}>
              <Text style={styles.continueText}>Next</Text>
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
  },
  title: {
    fontFamily: fonts.semiBold,
    fontSize: hp(2.6),
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
    paddingTop: hp(5),
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

export default EnglishLevel;
