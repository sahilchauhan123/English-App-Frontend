import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileSection from '../../../components/ProfileSection'
import useAuthStore from '../../../store/useAuthStore'

const Chats = () => {
  const { user } = useAuthStore();
  return (
    <View>
      <ScrollView>

        <Text>Chats</Text>

      </ScrollView>

    </View>
  )
}

export default Chats

const styles = StyleSheet.create({})