import { View, Text, TouchableOpacity, Image, ScrollView, FlatList} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { BellIcon, Cog6ToothIcon } from 'react-native-heroicons/outline';
import { db, donationFiles } from '../Firebase';
import { addDoc, getDocs, query, collection, where, serverTimestamp, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; 

export default function OrgHome() {
    const navigation = useNavigation();

    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [id, setId] = useState('')

    const userImage = require("../assets/2.png");
      
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

                const q = query(collection(db, 'donations'), where('organization', '==', userData.id));
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
                userImage: imageUrls[index],
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
    


    const renderItem = ({ item }) => (

        <View className="m-2 bg-white p-4 rounded-lg shadow-md flex-row items-center">
            <Image 
            source={{uri: item.userImage}} 
            style={{ height: 144, width: 144, borderRadius: 8 }} // Adjust size as needed
            resizeMode="cover"
            />
            <View className="flex-1 ml-4">
            <Text className="text-lg font-bold"> {item.itemName} </Text>
            <Text className="text-sm"> {item.itemDescription} </Text>
            <Text className="text-sm text-gray-500"> {item.location} </Text>
            </View>
        </View>
    );  

    return(
        <View className=" flex-1 relative bg-white" style={{backgroundColor: '#75BAA4'}}>
            <SafeAreaView style={{backgroundColor: '#90A09B'}}>
                <View className="flex-row justify-between ml-5 mt-3 mr-3 mb-3">
                    <View className="mt-8">
                    <View>
                        <Image 
                        source={userImage} 
                        className="h-24 w-24 rounded-full"
                        resizeMode="cover"/>
                        <Text className="text-3xl font-bold mt-2"> {name} </Text>
                        <Text className="text-base"> {location} </Text>
                    </View>
                    </View>
                    {/* Icons */}
                    <View className="flex-row">
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('OrgSettings')} 
                        className="p-2">
                        <Cog6ToothIcon size={30} color="black" />
                    </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
            <Text className="text-2xl font-bold p-4"> New Donations </Text>
                <FlatList
                    data={donationInfo}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.key}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
        </View>
    )
}