import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors, fonts } from '../../../assets/constants';
import { GoogleSignUp } from '../../utils/google';
import Toast from 'react-native-simple-toast';
import { baseURL } from '../../utils/constants';
import { storeUserSession } from '../../utils/tokens';
import useAuthStore from '../../store/useAuthStore';
import { navigateAndReset } from '../../navigation/navigationService';

const SignIn = () => {
  const navigation = useNavigation();
  const {setUser} = useAuthStore()

  const GoogleLogin = async () => {

    try {
      const token = await GoogleSignUp();
      // console.log("token : ",token)
      const response = await fetch(`${baseURL}/api/auth/google/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id_token: token,
        }),
      });

      const data = await response.json()
      console.log("data : ", data);

      if (data["error"]) {
        Toast.show(data["error"], 3000)
        return
      }

      if (!data.data.isRegistered) {
        //create account by going to this screen
        Toast.show("Lets Create Your Account", 1500)
        navigation.navigate("GetDetails", { token })
        return
      } 

      // If the user is registered, navigate to the home screen
      Toast.show("Login Successful", 2000);
      setUser(data.data);
      storeUserSession(data.data);
      navigateAndReset("Home");
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
      }}>
      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          flex: 1,
          paddingBottom: hp(5),
        }}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={{ height: wp(28), width: wp(28) }}
        />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'Poppins-Bold', fontSize: hp(4.4) }}>
            Strango
          </Text>
          <Text style={{ fontFamily: 'Poppins-Medium', fontSize: hp(2.1), marginTop: wp(-1.8) }}>
            Speak English With Real People
          </Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: 'flex-end',
          //   alignItems: 'center',
          flex: 1,
          paddingBottom: hp(1),
        }}>
        <TouchableOpacity style={styles.signinButton} onPress={GoogleLogin}>
          <Image
            source={require('../../../assets/images/google.png')}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("LoginOrSignup")} style={[styles.signinButton, { marginBottom: hp(5) }]}>
          <Image
            source={require('../../../assets/images/email.png')}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Continue with Email</Text>
        </TouchableOpacity>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.terms}>By logging in, you agree to our</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.terms, { textDecorationLine: 'underline', fontFamily: fonts.meduim }]}>Privacy policy</Text>
            <Text style={styles.terms}> and </Text>
            <Text style={[styles.terms, { textDecorationLine: 'underline', fontFamily: fonts.meduim }]}>Terms of Use.</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  signinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center content horizontally
    width: wp(90),
    paddingVertical: hp(1.3),
    paddingHorizontal: wp(5),
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: hp(2.8),
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    left: wp(5),
    height: wp(6.5),
    width: wp(6.5),
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: hp(2),
    fontFamily: fonts.semiBold,
  },
  terms: {
    fontFamily: fonts.light,
    fontSize: hp(1.6),
    color: colors.grey
  }
});
