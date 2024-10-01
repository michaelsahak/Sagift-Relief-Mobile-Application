import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase'; 

export default OrgEditProfile = () => {
    const navigation = useNavigation();

    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputNumber, setInputNumber] = useState('');
    const [inputLocation, setInputLocation] = useState('');
    const [inputPassword, setInputPassword] = useState('')
    const [inputConfirmPassword, setInputConfirmPassword] = useState('')

    const handleChange = ({input, type}) => {
        if (type === 'name'){
          setInputName(input)
        } else if (type === 'email'){
          setInputEmail(input)
        } else if (type === 'mobile_number'){
          setInputNumber(input)
        } else if (type === 'location'){
          setInputLocation(input)
        } else if (type === 'password'){
          setInputPassword(input)
        } else if (type === 'confirm_password'){
          setInputConfirmPassword(input)
        }
      }

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
            try {
                // Your asynchronous code goes here
                const user = await AsyncStorage.getItem('user-session');
                const userData = JSON.parse(user);
                console.log(userData)
                if (userData !== null){
                if ( inputName === '' || inputEmail === '' || inputNumber === '' || inputLocation === '' || inputPassword === '') {
                    setInputName(userData.name)
                    setInputEmail(userData.email)
                    setInputNumber(userData.number)
                    setInputLocation(userData.location)
                }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            };

            fetchData();

        }, [])
    );

    const handleEdit = () => {
          
        const setAccountInfo = async () => {
        try {
            
            const user = await AsyncStorage.getItem('user-session');
            const userData = JSON.parse(user);

            if (userData !== null && inputPassword === inputConfirmPassword){
                await setDoc(doc(db, "users", userData.id), {
                    "name": inputName,
                    "email": inputEmail,
                    "number": inputNumber,
                    "location": inputLocation,
                    "password": inputPassword === '' ? userData.password : inputPassword,
                    "type": userData.type
                });

                await AsyncStorage.setItem('user-session', JSON.stringify({
                    "id": userData.id,
                    "name": inputName,
                    "email": inputEmail,
                    "number": inputNumber,
                    "location": inputLocation,
                    "password": inputPassword === '' ? userData.password : inputPassword,
                    "type": userData.type
                })
                );
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        setAccountInfo();
        
        navigation.goBack()

    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
        });
    
        if (!result.canceled && result.assets) {
          setSelectedImage(result.assets[0].uri);
        }
      };

    return(
        <ScrollView className="flex-1 bg-gray" style={{backgroundColor: '#75BAA4'}}>
            <SafeAreaView className="flex">
                <View className="flex-row justify-start">
                    <TouchableOpacity 
                        onPress={() => navigation.goBack()}
                        className="bg-gray-300 p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-2">
                        <ChevronLeftIcon size="20" color="black"/>
                    </TouchableOpacity>
                </View>
                <View className="ml-4 mt-3"> 
                    <Text className="text-3xl font-bold mt-2"> Edit Profile </Text>
                </View>
                {/* <View className="flex justify-center items-center mt-3 mb-3">
                    <TouchableOpacity className="mt-7">
                        <Image source={require("../assets/iu_bonnet.jpg")}
                            className="h-24 w-24 rounded-full"/>
                    </TouchableOpacity>
                    <Text className="mt-2 text-base"> Change photo </Text>
                </View> */}
                <KeyboardAvoidingView 
                    className="flex-1 px-8 pt-8"
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
                    <View className="form space-y-2">
                        <Text className="text-gray-700 ml-4"> Organizational Name </Text>
                            <TextInput 
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3" 
                                placeholder='Change organizational name'
                                value = {inputName} 
                                onChangeText={(text)=>handleChange({input: text, type: 'name'})}
                            />
                        <Text className="text-gray-700 ml-4"> Email </Text>
                            <TextInput 
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3" 
                                placeholder='Change email'
                                value = {inputEmail} 
                                onChangeText={(text)=>handleChange({input: text, type: 'email'})}
                            />
                        <Text className="text-gray-700 ml-4"> Mobile Number </Text>
                            <TextInput 
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3" 
                                placeholder='Change mobile number'
                                value = {inputNumber} 
                                onChangeText={(text)=>handleChange({input: text, type: 'mobile_number'})}
                            />
                        <Text className="text-gray-700 ml-4"> Location </Text>
                            <TextInput 
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3" 
                                placeholder='Change Location'
                                value = {inputLocation} 
                                onChangeText={(text)=>handleChange({input: text, type: 'location'})}
                            />                        
                        <Text className="text-gray-700 ml-4"> Password </Text>
                            <TextInput 
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3" 
                                secureTextEntry={true}
                                placeholder='Change password'
                                value = {inputPassword} 
                                onChangeText={(text)=>handleChange({input: text, type: 'password'})}
                            />
                        <Text className="text-gray-700 ml-4"> Confirm Password </Text>
                            <TextInput 
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3" 
                                secureTextEntry={true}
                                placeholder='Confirm new password'
                                value = {inputConfirmPassword} 
                                onChangeText={(text)=>handleChange({input: text, type: 'confirm_password'})}
                            />    
                        </View>
                        <TouchableOpacity onPress={handleEdit}
                            className="mt-2 mb-4 py-3 rounded-2xl" style={{backgroundColor: '#38517E'}}>
                            <Text className="text-xl text-white font-bold text-center"> Save </Text>
                        </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ScrollView>
    )
}