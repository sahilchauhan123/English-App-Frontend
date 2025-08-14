// import { StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useCallStore } from '../../store/useCallStore';


// const Home = () => {
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const { usersList } = useCallStore();

//   useEffect(() => {
//     if (usersList) {
//       setOnlineUsers(usersList)
//     }
//   }, [usersList])

//   //  type User struct {
//   // 	Id       int64  `json:"id"` // Set by DB
//   // 	FullName string `json:"full_name" binding:"required"`
//   // 	Username string `json:"username" binding:"required"`
//   // 	Email    string `json:"email" binding:"required,email"`
//   // 	Password string `json:"password,omitempty"` // Only used in local auth
//   // 	Age      int    `json:"age" binding:"required"`
//   // 	Gender   string `json:"gender" binding:"required"`
//   // 	// Interests      []string `json:"interests" binding:"required"`
//   // 	ProfilePic          string `json:"profile_pic" binding:"required,url"`
//   // 	AuthType            string `json:"auth_type" binding:"required"` // "google" or "email"
//   // 	MainChallenge       string `json:"mainChallenge" binding:"required"`
//   // 	NativeLanguage      string `json:"nativeLanguage" binding:"required"`
//   // 	CurrentEnglishLevel string `json:"currentEnglishLevel" binding:"required"`
//   // 	// CreatedAt  string   `json:"created_at,omitempty"`         // Set on backend
//   // 	CreatedAt pgtype.Timestamptz `json:"created_at,omitempty"` // <-- CHANGE THIS LINE
//   // 	Otp       string             `json:"otp,omitempty"`
//   // }

//   return (
//     <View>
//       <Text>Home</Text>
//     </View>
//   )
// }

// export default Home

// const styles = StyleSheet.create({})







import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useCallStore } from '../../store/useCallStore';
import { sendOffer } from '../../services/webrtc';

const Home = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { usersList } = useCallStore();

  useEffect(() => {
    if (usersList) {
      setOnlineUsers(usersList);
    }
  }, [usersList]);


  const handleCallUser = (userId) => {
    console.log(`Initiating call to user ID: ${userId}`);
    sendOffer(userId)
    console.log("reaching there")

  };

  const handleRandomMatch = () => {
    console.log('Starting random match call');
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userCard}>
      <Image
        source={{ uri: item.profile_pic || 'https://via.placeholder.com/50' }}
        style={styles.profilePic}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.full_name || item.username || 'Unknown User'}</Text>
        <Text style={styles.userDetails}>{item.nativeLanguage} | {item.currentEnglishLevel}</Text>
      </View>
      <TouchableOpacity style={styles.callButton} onPress={() => handleCallUser(item.id)}>
        <Text style={{fontSize:50}}>☎️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ConnectSphere</Text>
        <TouchableOpacity style={styles.randomMatchButton} onPress={handleRandomMatch}>
          <Text style={styles.randomMatchText}>Random Match</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={onlineUsers}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.userList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No online users available</Text>
        }
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007bff',
    padding: 15,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  randomMatchButton: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  randomMatchText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  userList: {
    padding: 10,
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  userDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  callButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});