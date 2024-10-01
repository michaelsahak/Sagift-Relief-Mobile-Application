import { View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import { BellIcon } from 'react-native-heroicons/outline'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OrgProfile() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [location, setLocation] = useState('')

  

  var orgDetails = [
    {
      label: 'NGO Name:',
      value: name,
      key: '1',
    },
    {
      label: 'Email:',
      value: email,
      key: '2',
    },
    {
      label: 'Mobile Number:',
      value: number,
      key: '3',
    },
    {
      label: 'Location:',
      value: location,
      key: '4',
    },
  ];

  useFocusEffect(
      React.useCallback(() => {
          const fetchData = async () => {
          try {
              // Your asynchronous code goes here
              const user = await AsyncStorage.getItem('user-session');
              const userData = JSON.parse(user);
              console.log(userData)
              
              if (userData !== null){
                setName(userData.name);
                setEmail(userData.email);
                setNumber(userData.number);
                setLocation(userData.location);
              }
          } catch (error) {
              console.error('Error fetching data:', error);
          }
          };

          fetchData();

      }, [])
  );

    return(
        <SafeAreaView className="flex-1 bg-gray" style={{backgroundColor: '#75BAA4'}}>
            <View className="ml-4 mt-3"> 
                <Text className="text-3xl font-bold mt-5"> Organizational Profile </Text>
            </View>
            <View className="flex justify-center items-center mt-2 mb-3">
                <TouchableOpacity className="mt-7">
                    <Image source={require("../assets/2.png")}
                        className="h-24 w-24 rounded-full"
                        resizeMode="cover"/>
                </TouchableOpacity>
            </View>
            <View className="flex px-4 py-4">
                {orgDetails.map((detail) => (
                    <View key={detail.key} className="flex-row items-center mb-4">
                        <Text className="font-bold text-xl"> {detail.label} </Text>
                        <Text className="text-base ml-3"> {detail.value} </Text>
                    </View>
                ))}
            </View>
        </SafeAreaView>
    )
}