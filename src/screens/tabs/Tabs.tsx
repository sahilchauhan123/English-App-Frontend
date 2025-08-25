import { StyleSheet, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import { TabView } from 'react-native-tab-view'
import Home from './home/Home';
import LeaderBoard from './leaderboard/LeaderBoard';

import { colors } from '../../../assets/constants';
import useAuthStore from '../../store/useAuthStore';
import { useCallStore } from '../../store/useCallStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomBar from '../../components/BottomBar';
import Chats from './chats/Chats';
import Profile from './profile/Profile';
import Header from '../../components/Header';

const Tabs = () => {
  const { user } = useAuthStore();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Home' },
    { key: 'second', title: 'Leaderboard' },
    { key: 'third', title: 'Chats' },
    { key: 'fourth', title: 'Profile' },
  ]);

  const renderScene = ({ route }) => {

    switch (route.key) {
      case 'first':
        return <Home />;
      case 'second':
        return <LeaderBoard />;
      case 'third':
        return <Chats />;
      case 'fourth':
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      {/* Header */}
      <Header index={index} />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        swipeEnabled={true}
        renderTabBar={() => null}
        lazy
      />

      {/* Bottombar */}
      <BottomBar index={index} setIndex={setIndex} />
    </SafeAreaView>
  )
}

export default Tabs

const styles = StyleSheet.create({
})