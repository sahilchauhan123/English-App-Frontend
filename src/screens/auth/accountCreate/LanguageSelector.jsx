import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors, fonts, nativeLanguages} from '../../../../assets/constants';
import LinearGradient from 'react-native-linear-gradient';

export const Line = () => {
  return (
    <View
      style={{
        height: hp(0.7),
        width: wp(12),
        backgroundColor: colors.gradient.first,
        borderRadius: wp(1),
        marginHorizontal: wp(0.6),
      }}></View>
  );
};

export const GradientLine = () => {
  return (
    <LinearGradient
      colors={[colors.gradient.first, colors.gradient.last]}
      start={{x: 0, y: 0}}
      end={{x: 0.1, y: 0}}
      style={{
        height: hp(0.7),
        width: wp(12),
        backgroundColor: colors.gradient.first,
        borderRadius: wp(1),
        marginHorizontal: wp(0.6),
        opacity: 0.13,
      }}></LinearGradient>
  );
};

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [languages, setLanguages] = useState(nativeLanguages);

  const SearchByName = searchQuery => {
    const res = nativeLanguages.filter(lang =>
      lang.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setLanguages(res);
  };

  const setLang = lang => {
    if (selectedLanguage == lang) {
      setSelectedLanguage('');
    } else {
      setSelectedLanguage(lang);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: wp(7),
      }}>
      <KeyboardAvoidingView style={{justifyContent: 'space-around'}}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: hp(2),
          }}>
          <Line />
          <GradientLine />
          <GradientLine />
          <GradientLine />
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: wp(5),
            width: '100%',
          }}>
          <Text style={{fontFamily: fonts.semiBold, fontSize: hp(2.6)}}>
            What is your native language?
          </Text>
          <View
            style={{
              borderColor: colors.bordercolor,
              borderWidth: wp(0.3),
              width: '100%',
              marginTop: hp(4),
              borderRadius: wp(3),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingHorizontal: wp(3.8),
            }}>
            <Image
              style={{height: wp(6), width: wp(6)}}
              source={require('../../../../assets/images/search.png')}
            />

            <TextInput
              style={{
                width: wp(70),
                fontFamily: fonts.regular,
                fontSize: hp(1.7),
                marginTop: hp(0.3),
                paddingLeft: wp(2),
              }}
              placeholder="Search..."
              onChangeText={SearchByName}
            />
          </View>
        </View>

        <View style={{paddingTop: hp(2), height: hp(68)}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginBottom: wp(0)}}>
            {languages.map((language, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: hp(2),
                  paddingHorizontal: wp(2),
                }}
                onPress={() => setLang(language)}>
                <Text style={{fontFamily: fonts.meduim, fontSize: hp(1.8)}}>
                  {language}
                </Text>
                {language == selectedLanguage ? (
                  <Image
                    source={require('../../../../assets/images/tick-circle.png')}
                    style={{height: wp(6), width: wp(6)}}
                    resizeMode="cover"
                  />
                ) : (
                  <View
                    style={{
                      height: wp(5),
                      width: wp(5),
                      borderRadius: wp(100),
                      borderWidth: wp(0.5),
                      borderColor: colors.bordercolor,
                    }}
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View>
          {selectedLanguage != null > 0 ? (
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LanguageSelector;

const styles = StyleSheet.create({
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
