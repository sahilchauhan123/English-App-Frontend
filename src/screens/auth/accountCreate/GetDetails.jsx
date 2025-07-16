// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TextInput,
//   KeyboardAvoidingView,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
// } from 'react-native';
// import React, {useState} from 'react';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';
// import {colors, fonts, nativeLanguages} from '../../../../assets/constants';
// import LinearGradient from 'react-native-linear-gradient';
// import {TabView, SceneMap} from 'react-native-tab-view';

// export const Line = () => {
//   return (
//     <View
//       style={{
//         height: hp(0.7),
//         width: wp(12),
//         backgroundColor: colors.gradient.first,
//         borderRadius: wp(1),
//         marginHorizontal: wp(0.6),
//       }}></View>
//   );
// };

// export const GradientLine = () => {
//   return (
//     <LinearGradient
//       colors={[colors.gradient.first, colors.gradient.last]}
//       start={{x: 0, y: 0}}
//       end={{x: 0.1, y: 0}}
//       style={{
//         height: hp(0.7),
//         width: wp(12),
//         backgroundColor: colors.gradient.first,
//         borderRadius: wp(1),
//         marginHorizontal: wp(0.6),
//         opacity: 0.13,
//       }}></LinearGradient>
//   );
// };

// const GetDetails = () => {
//   const [selectedLanguage, setSelectedLanguage] = useState('');
//   const [languages, setLanguages] = useState(nativeLanguages);

//   const SearchByName = searchQuery => {
//     const res = nativeLanguages.filter(lang =>
//       lang.toLowerCase().includes(searchQuery.toLowerCase()),
//     );
//     setLanguages(res);
//   };

//   const setLang = lang => {
//     if (selectedLanguage == lang) {
//       setSelectedLanguage('');
//     } else {
//       setSelectedLanguage(lang);
//     }
//   };

//   const LanguageSelector = () => {
//     return (
//       <SafeAreaView
//         style={{
//           flex: 1,
//           backgroundColor: colors.white,
//           paddingHorizontal: wp(7),
//         }}>
//         <KeyboardAvoidingView style={{justifyContent: 'space-around'}}>
//           <View
//             style={{
//               alignItems: 'center',
//               flexDirection: 'row',
//               justifyContent: 'center',
//               marginVertical: hp(2),
//             }}>
//             <Line />
//             <GradientLine />
//             <GradientLine />
//             <GradientLine />
//           </View>

//           <View
//             style={{
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginTop: wp(5),
//               width: '100%',
//             }}>
//             <Text style={{fontFamily: fonts.semiBold, fontSize: hp(2.6)}}>
//               What is your native language?
//             </Text>
//             <View
//               style={{
//                 borderColor: colors.bordercolor,
//                 borderWidth: wp(0.3),
//                 width: '100%',
//                 marginTop: hp(4),
//                 borderRadius: wp(3),
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'flex-start',
//                 paddingHorizontal: wp(3.8),
//               }}>
//               <Image
//                 style={{height: wp(6), width: wp(6)}}
//                 source={require('../../../../assets/images/search.png')}
//               />

//               <TextInput
//                 style={{
//                   width: wp(70),
//                   fontFamily: fonts.regular,
//                   fontSize: hp(1.7),
//                   marginTop: hp(0.3),
//                   paddingLeft: wp(2),
//                 }}
//                 placeholder="Search..."
//                 onChangeText={SearchByName}
//               />
//             </View>
//           </View>

//           <View style={{paddingTop: hp(2), height: hp(68)}}>
//             <ScrollView
//               showsVerticalScrollIndicator={false}
//               style={{marginBottom: wp(0)}}>
//               {languages.map((language, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     paddingVertical: hp(2),
//                     paddingHorizontal: wp(2),
//                   }}
//                   onPress={() => setLang(language)}>
//                   <Text style={{fontFamily: fonts.meduim, fontSize: hp(1.8)}}>
//                     {language}
//                   </Text>
//                   {language == selectedLanguage ? (
//                     <Image
//                       source={require('../../../../assets/images/tick-circle.png')}
//                       style={{height: wp(6), width: wp(6)}}
//                       resizeMode="cover"
//                     />
//                   ) : (
//                     <View
//                       style={{
//                         height: wp(5),
//                         width: wp(5),
//                         borderRadius: wp(100),
//                         borderWidth: wp(0.5),
//                         borderColor: colors.bordercolor,
//                       }}
//                     />
//                   )}
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </View>

//           <View>
//             {selectedLanguage != null > 0 ? (
//               <TouchableOpacity
//                 style={{width: '100%'}}
//                 onPress={() => navigation.navigate('Otp')}>
//                 <LinearGradient
//                   colors={[
//                     colors.gradient.first,
//                     colors.gradient.second,
//                     colors.gradient.last,
//                   ]}
//                   start={{x: 0, y: 0}}
//                   end={{x: 0.9, y: 0}}
//                   style={styles.gradientButton}>
//                   <Text style={styles.gradientButtonText}>CONTINUE</Text>
//                 </LinearGradient>
//               </TouchableOpacity>
//             ) : (
//               <TouchableOpacity
//                 style={styles.continueButton}
//                 onPress={() => navigation.navigate('Otp')}>
//                 <Text style={styles.continueText}>CONTINUE</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     );
//   };
//   const SecondScreen = () => (
//     <View style={styles.screen}>
//       <Text style={styles.text}>Verify OTP</Text>
//     </View>
//   );

//   const renderScene = SceneMap({
//     first: LanguageSelector,
//     second: SecondScreen,
//     // third: ThirdScreen,
//   });

//   const [index, setIndex] = useState(0);
//   const [routes] = useState([
//     {key: 'first', title: 'Welcome'},
//     {key: 'second', title: 'OTP'},
//     // {key: 'third', title: 'Start'},
//   ]);

//   return (
//     <TabView
//       navigationState={{index, routes}}
//       renderScene={renderScene}
//       onIndexChange={setIndex}
//       initialLayout={{width: Dimensions.get('window').width}}
//       swipeEnabled={true}
//       renderTabBar={() => null} // Hides the top tab bar
//     />
//   );
// };

// export default GetDetails;

// const styles = StyleSheet.create({
//   gradientButton: {
//     width: '100%',
//     paddingVertical: hp(1.6),
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: hp(1.2),
//     marginTop: hp(2),
//   },
//   gradientButtonText: {
//     fontFamily: fonts.bold,
//     color: colors.white,
//   },
//   continueButton: {
//     borderColor: colors.bordercolor,
//     borderWidth: 1,
//     width: '100%',
//     paddingVertical: hp(1.6),
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: hp(1.2),
//     marginTop: hp(2),
//   },
//   continueText: {
//     fontFamily: fonts.bold,
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors, fonts, nativeLanguages} from '../../../../assets/constants';
import LinearGradient from 'react-native-linear-gradient';
import {TabView, SceneMap} from 'react-native-tab-view';

const Line = () => (
  <View
    style={{
      height: hp(0.7),
      width: wp(12),
      backgroundColor: colors.gradient.first,
      borderRadius: wp(1),
      marginHorizontal: wp(0.6),
    }}
  />
);

const GradientLine = () => (
  <LinearGradient
    colors={[colors.gradient.first, colors.gradient.last]}
    start={{x: 0, y: 0}}
    end={{x: 0.1, y: 0}}
    style={{
      height: hp(0.7),
      width: wp(12),
      borderRadius: wp(1),
      marginHorizontal: wp(0.6),
      opacity: 0.13,
    }}
  />
);

const LanguageSelector = ({jumpTo}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [languages, setLanguages] = useState(nativeLanguages);

  const SearchByName = searchQuery => {
    const res = nativeLanguages.filter(lang =>
      lang.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setLanguages(res);
  };

  const setLang = lang => {
    setSelectedLanguage(prev => (prev === lang ? '' : lang));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        // backgroundColor: colors.black,
        paddingHorizontal: wp(5),
      }}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // marginTop: wp(5),
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
                paddingLeft: wp(2),
              }}
              placeholder="Search..."
              onChangeText={SearchByName}
            />
          </View>
        </View>

        <View style={{paddingTop: hp(2), flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
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
                {language === selectedLanguage ? (
                  <Image
                    source={require('../../../../assets/images/tick-circle.png')}
                    style={{height: wp(6), width: wp(6)}}
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
          {selectedLanguage ? (
            <TouchableOpacity
              onPress={() => jumpTo('second')}
              style={{width: '100%'}}>
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
            <View style={styles.continueButton}>
              <Text style={styles.continueText}>CONTINUE</Text>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const SecondScreen = () => (
  <SafeAreaView
    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{fontFamily: fonts.semiBold, fontSize: hp(3)}}>
      This is the OTP screen
    </Text>
  </SafeAreaView>
);

const GenderScreen = () => {
  const [selectedGender, setSelectedGender] = useState('');
  const [age, setAge] = useState('');
  const [agePressed, setAgePressed] = useState(false);
  const isValid = selectedGender && age;
  const ageInputRef = useRef(null);

  useEffect(() => {
    if (agePressed && ageInputRef.current) {
      // Focus the TextInput after it's rendered
      setTimeout(() => ageInputRef.current?.focus(), 100);
    }
  }, [agePressed]);
  return (
    <SafeAreaView
      style={{alignItems: 'center', flex: 1, paddingHorizontal: wp(5)}}>
      <KeyboardAvoidingView
        style={{alignItems: 'center', flex: 1, width: '100%'}}>
        <View style={{width: '100%', flex: 1, alignItems: 'center'}}>
          <Text style={{fontFamily: fonts.semiBold, fontSize: hp(3)}}>
            Select your gender
          </Text>

          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: hp(4),
            }}>
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
              style={{
                borderRadius: wp(4.3),
                padding: 1,
              }}>
              <Pressable
                style={{
                  borderRadius: wp(4),
                  padding: hp(2.2),
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: wp(6),
                  backgroundColor: colors.white,
                }}
                onPress={() => setSelectedGender('male')}>
                <Image
                  style={{height: wp(25), width: wp(25)}}
                  source={require('../../../../assets/images/male.png')}
                />
                <Text style={{fontFamily: fonts.semiBold}}>Male</Text>
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
              style={{
                borderRadius: wp(4.2),
                padding: 1,
              }}
              start={{x: 0, y: 0}}
              end={{x: 0.7, y: 0}}>
              <Pressable
                style={{
                  borderRadius: wp(4),
                  padding: hp(2.2),
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: wp(6),
                  backgroundColor: colors.white,
                }}
                onPress={() => setSelectedGender('female')}>
                <Image
                  style={{height: wp(25), width: wp(25)}}
                  source={require('../../../../assets/images/female.png')}
                />
                <Text style={{fontFamily: fonts.semiBold}}>Female</Text>
              </Pressable>
            </LinearGradient>
          </View>

          <View style={{width: '90%', alignItems: 'center', marginTop: hp(1)}}>
            {!agePressed ? (
              <TouchableOpacity
                style={{width: '100%', alignItems: 'center'}}
                onPress={() => setAgePressed(true)}>
                <View style={styles.inactiveInputWrapper}>
                  <Text style={[styles.label, {paddingTop: hp(0)}]}>
                    Enter your age
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
                  <Text style={styles.label}>Enter your age</Text>
                  <TextInput
                    ref={ageInputRef}
                    onChangeText={setAge}
                    style={styles.textInput}
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

        {/* Continue Button */}
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'flex-end',
            paddingBottom: wp(2),
          }}>
          {age && selectedGender ? (
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

const GetDetails = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Language'},
    {key: 'second', title: 'OTP'},
    {key: 'third', title: 'GenderScreen'},
  ]);

  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'first':
        return <LanguageSelector jumpTo={jumpTo} />;
      case 'second':
        return <GenderScreen />;
      case 'third':
        return <SecondScreen />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: hp(2),
        }}>
        <Line />
        <GradientLine />
        <GradientLine />
        <GradientLine />
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        // initialLayout={{width: Dimensions.get('window').width}}
        swipeEnabled={true}
        renderTabBar={() => null}
      />
    </SafeAreaView>
  );
};

export default GetDetails;

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
  inactiveInputWrapper: {
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
  gradientBorder: {
    width: '100%',
    height: hp(8),
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
    height: hp(5),
  },
  label: {
    fontFamily: fonts.meduim,
    color: colors.bordercolor,
    paddingTop: hp(1.5),
    marginBottom: hp(-0.8),
    fontSize: hp(1.8),
  },
  textInput: {
    fontFamily: fonts.semiBold,
    fontSize: wp(4.5),
    color: 'black',
    paddingTop: hp(0.5),
    paddingLeft: wp(-1),
    width: '100%',
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
