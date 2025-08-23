import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TabView } from 'react-native-tab-view'
import Home from './home/Home';
import LeaderBoard from './leaderboard/LeaderBoard';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { colors, fonts } from '../../../assets/constants';
import { GradientLine, Line } from '../auth/accountCreate/GetDetails';
import useAuthStore from '../../store/useAuthStore';
import { useCallStore } from '../../store/useCallStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomBar from '../../components/BottomBar';
import Chats from './chats/Chats';
import Profile from './profile/Profile';

const Tabs = () => {
  const { usersList, setInRandomMatch, inRandomMatch } = useCallStore();
  const { user } = useAuthStore();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Home' },
    { key: 'second', title: 'Leaderboard' },
    { key: 'third', title: 'Chats' },
    { key: 'fourth', title: 'Profile' },
  ]);


  // useEffect(()=>{
  //   console.log("Tab index: ",index);
  // },[index])

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
  const handleRandomMatch = () => {
    console.log('Starting random match call');
    const data = {
      type: "randomCall",
      from: user.user.id
    }
    sendMessage(data);
    setInRandomMatch(true);
    ToastAndroid.show("Random Call Waiting", 2000)
  }
  return (
    <SafeAreaView style={{ flex: 1 ,backgroundColor:colors.white}}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image
            style={{ height: wp(10), width: wp(10) }}
            source={require("../../../assets/images/logo.png")}
          />
          <Text style={styles.headerTitle}>Strango</Text>
        </View>
        <View>
          <TouchableOpacity onPress={handleRandomMatch}>
          <Image
            style={{ height: wp(10), width: wp(10) }}
            source={require("../../../assets/images/filter.png")}
          />
          </TouchableOpacity>
        </View>


      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        swipeEnabled={true}
        renderTabBar={() => null}
        lazy
      />
      
      {/* Bottombar */}
      <BottomBar index={index} setIndex={setIndex}/>
    </SafeAreaView>
  )
}

export default Tabs

const styles = StyleSheet.create({
  progressContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(8),
  },
  line: {
    height: hp(0.7),
    width: wp(12),
    backgroundColor: colors.gradient.first,
    borderRadius: wp(1),
    marginHorizontal: wp(0.6),
  },
  header: {
    backgroundColor: colors.white,
    padding: 15,
    // paddingTop: hp(3),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: hp(3),
    fontWeight: 'bold',
    color: colors.black,
    paddingLeft:wp(2),
    fontFamily:fonts.bold
  },
  randomMatchButton: {
    backgroundColor: colors.lightGrey,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  randomMatchText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '600',
  },
})