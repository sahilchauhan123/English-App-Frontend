import { Image, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useAuthStore from '../../../store/useAuthStore'
import ProfileSection from '../../../components/ProfileSection';
import Pictures from '../../../components/Pictures';

const Profile = ({ route }) => {

  const { user } = useAuthStore();
  return (
    <View style={{ flex: 1 }}>

      <ScrollView>
        {/* profile picture  */}
        <ProfileSection user={user} />
        {/* description & talk section */}
        <Pictures otherUser={null}/>
      </ScrollView>

    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})