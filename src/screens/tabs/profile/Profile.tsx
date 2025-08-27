import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useAuthStore from '../../../store/useAuthStore'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ProfileSection from '../../../components/ProfileSection';

const Profile = () => {
  const { user } = useAuthStore();
  return (
    <View style={{ flex: 1 }}>
      {/* profile picture  */}
      <ProfileSection user={user}/>

      {/* description & talk section */}
      <View>

      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})