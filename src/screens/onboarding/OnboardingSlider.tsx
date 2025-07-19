import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors, fonts} from '../../../assets/constants';
import GradientText from '../../components/GradientText';
import {
  CommonActions,
  StackActions,
  useNavigation,
} from '@react-navigation/native';

const CustomDot = ({selected}) => {
  const widthAnim = useRef(new Animated.Value(wp(2))).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: selected ? wp(8) : wp(2.5),
      duration: 200,
      useNativeDriver: false, // can't animate width with native driver
    }).start();
  }, [selected]);

  return (
    <Animated.View
      style={{
        width: widthAnim,
        height: hp(1.2),
        borderRadius: wp(100),
        marginHorizontal: wp(1),
        backgroundColor: selected ? colors.orange : colors.grey,
      }}
    />
  );
};

const Skip = ({isLight, skipLabel, ...props}) => <></>;

const OnboardingSlider = () => {
  const navigation = useNavigation();
  const onboardingRef = useRef(null);
  const [pageIndex, setPageIndex] = useState(0);

  const ResetAndNavigate = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'SignIn'}],
      }),
    );
  };

  return (
   
    <SafeAreaView
      style={{flex: 1, paddingVertical: hp(5), backgroundColor: colors.white}}>
      <View style={{alignItems: 'flex-end', marginHorizontal: wp(5)}}>
        <TouchableOpacity onPress={ResetAndNavigate}>
          <Text
            style={{
              color: colors.grey,
              fontFamily: fonts.meduim,
              fontSize: hp(2),
            }}>
            {pageIndex == 0 ? 'Skip>>' : '..'}
            {/* Skip{'>>'} */}
          </Text>
        </TouchableOpacity>
      </View>
      <Onboarding
        bottomBarHighlight={false}
        DotComponent={CustomDot}
        SkipButtonComponent={Skip}
        NextButtonComponent={Skip}
        pageIndexCallback={index => {
          console.log('Current onboarding page index:', index);
          setPageIndex(index);
        }}
        DoneButtonComponent={() => (
          <View style={{marginHorizontal: wp(3)}}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.orange,
                borderRadius: wp(100),
                paddingVertical: hp(0.5),
                paddingHorizontal: wp(4),
              }}
              onPress={ResetAndNavigate}>
              <Text
                style={{
                  fontFamily: fonts.regular,
                  fontSize: hp(1.8),
                  color: colors.white,
                }}>
                Continue →
              </Text>
            </TouchableOpacity>
          </View>
        )}
        pages={[
          {
            backgroundColor: colors.white,
            image: (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: hp(6),
                  //   marginTop: hp(10),
                }}>
                <Image
                  style={{height: wp(60), width: wp(60)}}
                  source={require('../../../assets/images/slider1.png')}
                />
                <Text
                  style={{
                    fontFamily: fonts.semiBold,
                    fontSize: hp(3.5),
                    textAlign: 'center',
                    marginTop: hp(4),
                  }}>
                  Smart Matching for
                </Text>
                <View style={{flexDirection: 'row', marginTop: hp(-1)}}>
                  <Text
                    style={{
                      fontFamily: fonts.semiBold,
                      fontSize: hp(3.5),
                      textAlign: 'center',
                    }}>
                    Better{' '}
                  </Text>
                  <GradientText text="Conversations" size={hp(3.5)} />
                </View>

                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: fonts.light,
                    color: colors.black,
                    fontSize: hp(1.8),
                  }}>
                  Get paired with conversation partners based on your English
                  level and interests.
                </Text>
              </View>
            ),
          },
          {
            backgroundColor: colors.white,
            image: (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: wp(5),
                  //   marginTop: hp(10),
                }}>
                <View
                  style={{
                    height: wp(60),
                    width: wp(100),
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{height: wp(50), width: wp(80)}}
                    source={require('../../../assets/images/slider2.png')}
                  />
                </View>

                <Text
                  style={{
                    fontFamily: fonts.semiBold,
                    fontSize: hp(3.5),
                    textAlign: 'center',
                    marginTop: hp(4),
                  }}>
                  Learn English,
                </Text>
                <View style={{flexDirection: 'row', marginTop: hp(-1)}}>
                  <Text
                    style={{
                      fontFamily: fonts.semiBold,
                      fontSize: hp(3.5),
                      textAlign: 'center',
                    }}>
                    by{' '}
                  </Text>
                  <GradientText text="Speaking it" size={hp(3.5)} />
                </View>

                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: fonts.light,
                    color: colors.black,
                    fontSize: hp(1.8),
                  }}>
                  Learn English naturally through real conversations — no boring
                  grammar drills, just real progress.
                </Text>
              </View>
            ),
          },
          {
            backgroundColor: colors.white,
            image: (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: hp(6),
                  //   marginTop: hp(10),
                }}>
                <Image
                  style={{height: wp(60), width: wp(60)}}
                  source={require('../../../assets/images/slider3.png')}
                />
                <View style={{flexDirection: 'row', marginTop: hp(8)}}>
                  <Text
                    style={{
                      fontFamily: fonts.semiBold,
                      fontSize: hp(3.5),
                      textAlign: 'center',
                    }}>
                    See Your{' '}
                  </Text>
                  <GradientText text="Progress" size={hp(3.5)}/>
                </View>

                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: fonts.light,
                    color: colors.black,
                    fontSize: hp(1.8),
                  }}>
                  Build fluency step by step with personal insights and feedback
                </Text>
              </View>
            ),
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default OnboardingSlider;

const styles = StyleSheet.create({});
