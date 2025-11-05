import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { sendOffer } from '../../../services/webrtc';
import { colors, fonts } from '../../../../assets/constants';
import useAuthStore from '../../../store/useAuthStore';
import { hpPortrait as hp, wpPortrait as wp } from '../../../utils/responsive';
import { sendMessage } from '../../../services/socket';
import { navigateWithParams } from '../../../navigation/navigationService';
import { useCallStore } from '../../../store/useCallStore';


const Home = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { usersList, setInRandomMatch, inRandomMatch } = useCallStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (usersList) {
      console.log("user list refreshed")
      setOnlineUsers(usersList);
    }
  }, [usersList]);
  
  const handleCallUser = (userId) => {
    console.log(`Initiating call to user ID: ${userId}`);
    sendOffer(userId, false)
    console.log("reaching there")

  };


  const refreshUserList = () => {
    setLoading(true);
    sendMessage({
      type: "refreshList",
      from: user.id
    })
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }



  const renderUserItem = ({ item }) => (
    <View style={{
      backgroundColor: "#D8DBDD", borderRadius: 15, paddingBottom: hp(0.2), marginHorizontal: wp(4),
    }}>
      <View style={styles.userCard}>

        <TouchableOpacity
          onPress={() => navigateWithParams("OtherUserProfile", item)}
          style={{ flexDirection: 'row', alignItems: 'center', flex: 2 }}>
          <Image
            source={{ uri: item.profile_pic || 'https://via.placeholder.com/50' }}
            style={styles.profilePic}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.full_name || item.username || 'Unknown User'}</Text>
            <Text style={styles.userDetails}>{item.nativeLanguage}
              {/* | {item.currentEnglishLevel} */}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={{ flex: 2, height: '100%', justifyContent: 'space-between', alignItems: "flex-end" }}>
          <TouchableOpacity onPress={() => handleCallUser(item.id)} style={{width:wp(20),alignItems:"flex-end"}}>

            <Image
              style={{ height: hp(3), width: hp(3), marginTop: hp(1), marginRight: wp(2) }}
              source={require("../../../../assets/images/call.png")}
            />
          <Text style={styles.talk}>42 Talks</Text>

          </TouchableOpacity>
        </View>

      </View>
      {/* <Button title='go to callscren' onPress={() => navigate("CallScreen")} /> */}

    </View>
  );

  return (
    <View style={styles.container}>

      {inRandomMatch &&
        <View>
          <Text>
            Finding a Random User
          </Text>
        </View>
      }

      {/* <ImageBackground
        source={require("../../../../assets/images/gradient.png")}
        resizeMode="contain"
        style={{ marginVertical: hp(1.8) ,flex:1,padding:hp(1)}}>
        <Text style={styles.headerTitle}> Talk Instantly</Text>
        <FlatList
          data={onlineUsers}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No online users available</Text>
          }
        />
      </ImageBackground> */}


      {/* <Image
        source={require("../../../../assets/images/gradient.png")}
        resizeMode="stretch"
        style={{
          flex: 1,
          width: "100%",
          position: "absolute",
          opacity: 0.7
        }}
      /> */}

      {/* Overlay Content */}
      {/* <Button title='refresh list' onPress={() => sendMessage({
        type: "refreshList",
        from: user.id,  

      })} /> */}
      <View style={{ padding: hp(0) }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
          <Text style={styles.headerTitle}>Talk Instantly</Text>
          <TouchableOpacity onPress={refreshUserList} style={{ marginBottom: hp(0.3) }}>
            {loading ?
              <ActivityIndicator style={{ paddingRight: wp(5.5) }} color={colors.gradient.first} /> :
              <Text style={{ paddingRight: wp(4.5), fontFamily: fonts.regular, fontSize: hp(1.8), color: colors.black }}>Refresh</Text>
            }
          </TouchableOpacity>
        </View>

        <FlatList

          data={onlineUsers}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No online users available</Text>
          }
        />
        <View style={{ height: hp(1) }} />
      </View>

    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // marginHorizontal: wp(2.5)
  },
  header: {
    backgroundColor: colors.orange,
    padding: 15,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerTitle: {
    fontFamily: fonts.semiBold,
    fontSize: hp(2.3),
    marginVertical: hp(1),
    paddingHorizontal: wp(4),

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
  userList: {
    marginHorizontal: wp(2.5)
  },
  userCard: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: "space-between",
    borderRadius: 13,
    padding: hp(1.4),
  },
  profilePic: {
    width: hp(10 / 1.4),
    height: hp(10 / 1.4),
    borderRadius: 13,
  },
  userInfo: {
    marginLeft: wp(3),
    justifyContent: "center",
  },
  userName: {
    fontFamily: fonts.semiBold,
    marginBottom: hp(-0.3),
    fontSize: hp(1.8),
    color: colors.black,
  },
  userDetails: {
    marginTop: hp(-0.3),
    fontFamily: fonts.regular,
    fontSize: hp(1.8),
    color: colors.black,
  },
  callButton: {
    marginRight: wp(0),
    alignItems: "flex-end",
    justifyContent: "center"
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  gradient: {
    padding: 16,
    borderRadius: 8,
  },
  talk: {
    fontFamily: fonts.regular,
    fontSize: hp(1.5),
    marginTop:hp(0.3)
  }
});