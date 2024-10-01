import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import { BellIcon, Cog6ToothIcon } from 'react-native-heroicons/outline';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { donationFiles, db } from '../Firebase';
import { ref, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp, doc, query, where, getDocs, refEqual, getDoc  } from 'firebase/firestore';

const Profile = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [id, setId] = useState('')

  const users = [
    {
      userImage: require("../assets/1.png"), 
      inputName: name,
      location: location,
      key: id, // Unique key for the user
    },
    // Add more user objects as needed
  ];

  const [imageUrl, setImageUrl] = useState(null);

  const loadDonationImage = (path) => {
    return new Promise((resolve, reject) => {
      getDownloadURL(ref(donationFiles, path))
        .then((url) => {
          resolve(url);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  const [donationInfo, setDonationInfo] = useState([])

  useFocusEffect(
    React.useCallback(() => {
        const fetchData = async () => {
          try {
              // Your asynchronous code goes here
              const user = await AsyncStorage.getItem('user-session');
              const userData = JSON.parse(user);
              
              if (userData !== null){
                setId(userData.id)
                setName(userData.name);
                setLocation(userData.location);
              }

              const q = query(collection(db, 'donations'), where('donator', '==', userData.id));
              const querysnapshot = await getDocs(q)
              
              const imageUrls = await Promise.all(
                querysnapshot.docs.map(async (doc) => {
                  const path = doc.data().file_name;
                  try {
                    return await loadDonationImage(path);
                  } catch (error) {
                    console.error(`Error loading image for ${path}:`, error);
                    return null; // or handle the error in a different way
                  }
                })
              );
            
              console.log('Image URLs:', imageUrls);
            
              const donations = querysnapshot.docs.map((doc, index) => ({
                selectedImage: imageUrls[index],
                itemName: doc.data().item_name,
                itemDescription: doc.data().item_desc,
                location: doc.data().location,
              }));

              setDonationInfo(donations)

              console.log(donations)

          } catch (error) {
              console.error('Error fetching data:', error);
          }
        };

        fetchData();

      }, [])
  );

  return (
    <View className=" flex-1 relative bg-white" style={{backgroundColor: '#75BAA4'}}>
      <SafeAreaView style={{backgroundColor: '#90A09B'}}>
        <View className="flex-row justify-between ml-5 mt-3 mr-3 mb-3">
          <View className="mt-8">
          {users.map((user) => (
            <View key={user.key}>
              <Image source={user.userImage} 
              className="h-24 w-24 rounded-full"/>
              <Text className="text-3xl font-bold mt-2"> {user.inputName} </Text>
              <Text className="text-lg"> {user.location} </Text>
            </View>
            ))}
          </View>
          {/* Icons */}
          <View className="flex-row">
            {/* <TouchableOpacity 
              onPress={() => navigation.navigate('Notif')}
              className="p-2">
              <BellIcon size={30} color="black" />
            </TouchableOpacity> */}
            <TouchableOpacity 
              onPress={() => navigation.navigate('Settings')} 
              className="p-2">
              <Cog6ToothIcon size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <FlatList
        data={donationInfo}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle="flex-1 px-2 pt-2"
        numColumns={2}
        ListHeaderComponent={
          <View className="flex ml-3 mt-2 mb-2">
            <Text className="text-2xl font-bold"> My Donations </Text>
          </View>
        }
        renderItem={({ item }) => (
          <ScrollView>
            <View className="flex-row flex-wrap justify-between py-1 px-3">
              <View className="bg-white rounded-lg mb-4 w-40 shadow-lg">
                <Image
                  source={{ uri: item.selectedImage }}
                  className="h-36 w-full rounded-t-lg"
                  resizeMode="cover"/>
                <View className="px-2 py-2">
                  <View className="items-center">
                    <Text className="text-lg font-bold"> {item.itemName} </Text>
                  </View>
                  <View className="flex-start ml-1">
                    <Text className="text-sm text-gray-500 mb-1"> {item.itemDescription} </Text>
                    <Text className="text-sm text-gray-500"> {item.location} </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        )}/>
    </View>
  );
};

export default Profile;
