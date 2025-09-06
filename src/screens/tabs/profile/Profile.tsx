import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import useAuthStore from '../../../store/useAuthStore'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ProfileSection from '../../../components/ProfileSection';
import Shimmer from '../../../components/ShimmerPlaceholder';
import Pictures from '../../../components/Pictures';

const Profile = () => {
  const { user } = useAuthStore();
  console.log("user in profileeee",user);
  return (
    <View style={{ flex: 1 }}>

      <ScrollView>
        {/* profile picture  */}
        <ProfileSection user={user} />
        {/* description & talk section */}
        <Pictures/>
      </ScrollView>

    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})