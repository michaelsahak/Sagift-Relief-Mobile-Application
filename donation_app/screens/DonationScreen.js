import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon, CameraIcon } from 'react-native-heroicons/solid';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import { db, donationFiles } from '../Firebase';
import { addDoc, getDocs, query, collection, where, serverTimestamp, doc } from 'firebase/firestore';
import { ref, uploadBytes } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; 

export default function DonationScreen() {
  const navigation = useNavigation();

  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [location, setLocation] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const deliveryMode = [
    { label: 'Pick Up', value: 'pickup' },
    { label: 'Drop Off', value: 'dropoff' }
  ];

  const [organizationList, setOrganizationList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
      try {
          // Your asynchronous code goes here
          const q = query(collection(db, 'users'), where('type', '==', 'organization'));

          const querysnapshot = await getDocs(q)
          
          const orgs = querysnapshot.docs.map((doc) => ({
            label: doc.data().name,
            value: doc.id
          }));

          setOrganizationList(orgs)
          

      } catch (error) {
          console.error('Error fetching data:', error);
      }
      };

      fetchData();

    }, [])
  );
  


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const getBlobFroUri = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    return blob;
  };

  const handleSubmit = async () => {
    if (itemName !== '' || itemDescription !== '' || location !== '' || selectedImage !== null) {
      try {

        filename = String(selectedImage).split('/').pop()
        uploadFile = ref(donationFiles, filename);

        const imageBlob = await getBlobFroUri(selectedImage);

        uploadBytes(uploadFile, imageBlob).then((snapshot) => {
          console.log('Success: Uploaded a blob or file!');
        });

        const user = await AsyncStorage.getItem('user-session');
        const userData = JSON.parse(user);


        const donationRef = collection(db, 'donations');

          // Set the user data in the document
          addDoc(donationRef, {
            "donator": userData.id,
            "organization": selectedOrg,
            "item_name": itemName,
            "item_desc": itemDescription,
            "location": location,
            "delivery_mode": currentValue,
            "date": serverTimestamp(),
            "file_name": filename

          });

          setIsOpen(false);
          setOpen(false)
          setItemName('');
          setItemDescription('');
          setLocation('');
          setSelectedOrg(null);
          setCurrentValue(null);
          setSelectedImage(null);
          navigation.goBack()  
          
      } catch(error) {
        console.log(error.message)
      }
    }
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#75BAA4' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <ScrollView className="flex-1 bg-gray" nestedScrollEnabled={true}>
            <SafeAreaView>
              <View className="flex-row justify-start">
                <TouchableOpacity 
                  onPress={() => navigation.goBack()}
                  className="bg-gray-300 p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-2">
                  <ChevronLeftIcon size="20" color="black"/>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
              <View className="flex-1 p-4">
                <TouchableOpacity 
                  onPress={pickImage}
                  className="border-dashed border-2 border-gray-300 rounded-md p-4 flex items-center justify-center"
                  style={{ width: '100%', height: 250 }}>
                  {selectedImage ? (
                    <Image 
                      source={{ uri: selectedImage }} 
                      style={{ width: '100%', height: 250 }} 
                      resizeMode="contain"/>
                      ) : (
                      <>
                      <CameraIcon size={30} color="gray" />
                      <Text className="text-gray-500 mt-2"> Add a Photo </Text>
                      </>
                    )}
                </TouchableOpacity>
                <View className="mt-4">
                  <DropDownPicker
                    className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-3 z-10"
                    items={organizationList} 
                    open={open}
                    setOpen={setOpen}
                    value={selectedOrg}
                    setValue={setSelectedOrg}
                    maxHeight={200}
                    listMode="SCROLLVIEW"
                    placeholder='Choose an Organization'/>
                  <TextInput 
                    className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-3" 
                    placeholder="Item name"
                    value={itemName}
                    onChangeText={setItemName}
                  />
                  <TextInput 
                    className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-3 h-20" 
                    placeholder="Item description"
                    value={itemDescription}
                    onChangeText={setItemDescription}
                    multiline={true}
                  />
                  <TextInput 
                    className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-3"
                    placeholder="Location"
                    value={location}
                    onChangeText={setLocation}
                  />
                  <DropDownPicker
                    className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-3 z-10"
                    items={deliveryMode} 
                    open={isOpen}
                    setOpen={setIsOpen}
                    value={currentValue}
                    setValue={setCurrentValue}
                    maxHeight={200}
                    listMode="SCROLLVIEW"
                    placeholder='Select delivery method'/>
                <TouchableOpacity className="mt-2 py-3 rounded-xl" style={{ backgroundColor: '#38517E' }} onPress={handleSubmit}>
                  <Text className="text-xl font-bold text-center text-white"> Submit </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
