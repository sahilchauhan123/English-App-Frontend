import { Image, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import useAuthStore from '../../../store/useAuthStore'
import ProfileSection from '../../../components/ProfileSection';
import Pictures from '../../../components/Pictures';

const Profile = () => {
  const { user } = useAuthStore();
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