import React, {useState} from 'react';
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
import {colors, fonts} from '../../../../assets/constants';
import LinearGradient from 'react-native-linear-gradient';

const MainChallange = ({jumpTo}) => {
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
    setChallenge(prev => (prev === lang ? '' : lang));
  };

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
                onPress={() => setEnglishChallenge(item.task)}
                style={{width: '100%'}}>
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
                  start={{x: 0, y: 0}}
                  end={{x: 0.9, y: 0}}
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
                        style={{height: wp(7), width: wp(7)}}
                        source={item.emoji}
                      />
                      <Text
                        style={{paddingLeft: wp(5), fontFamily: fonts.regular}}>
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

export default MainChallange;
