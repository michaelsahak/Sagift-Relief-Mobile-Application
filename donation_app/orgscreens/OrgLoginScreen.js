import { View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../Firebase'; 
import { getDocs, query, collection, where } from 'firebase/firestore';

export default function OrgLogin() {
    const navigation = useNavigation();

    const [inputEmail, setInputEmail] = useState('')
    const [inputPassword, setInputPassword] = useState('')

    const handleChange = ({input,type}) => {
        if (type === 'email'){
        setInputEmail(input)
        } else if (type === 'password'){
        setInputPassword(input)
        } 
    }

    const handleLogin = async () => {
        try {

            const q = query(collection(db, 'users'), where('email', '==', inputEmail));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();

                if (userData.password === inputPassword && userData.type === 'organization') {
                    
                    await AsyncStorage.setItem('user-session', JSON.stringify({
                        "id": userDoc.id,
                        "email": userData.email,
                        "password": userData.password,
                        "name": userData.name,
                        "number": userData.number,
                        "location": userData.location,
                        "type": userData.type
                    })
                    );
                    
                    navigation.navigate('OrgTabScreen')

                } else {

                    console.log("Invalid Credentials: Please check your email and password.");

                }

            } else {

                console.log("User Not Found: Please check your username and try again.");

            }

        } catch (error) {

            console.log(error.message);
            
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, []);

      
      return (
        <View className="flex-1 bg-white" style={{backgroundColor: '#75BAA4'}}>
            <SafeAreaView className="flex">
                <View className="flex-row justify-start">
                    <TouchableOpacity 
                        onPress={() => navigation.goBack()}
                        className="bg-gray-300 p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-2">
                        <ChevronLeftIcon size="20" color="black"/>
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center">
                    <Image source={require("../assets/clothing-donation.png")}
                            style={{width:200, height: 200}}/>
                </View>
            </SafeAreaView>
            <KeyboardAvoidingView 
                className="flex-1 bg-white px-8 pt-8"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
                style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                <View className="form space-y-2">
                    <Text className="text-xl font-semibold"> Organization Account </Text>
                    <Text className="text-gray-700 ml-4"> Email Address </Text>
                    <TextInput 
                        className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-3" 
                        value = {inputEmail} 
                        onChangeText={(text)=>handleChange({input: text, type: 'email'})}
                        //placeholder='Enter email'
                    />
                    <Text className="text-gray-700 ml-4"> Password </Text>
                    <TextInput 
                        className="p-4 bg-gray-200 text-gray-700 rounded-2xl mb-3" 
                        secureTextEntry={true}
                        value = {inputPassword} 
                        onChangeText={(text)=>handleChange({input: text, type: 'password'})}
                        //placeholder='Enter password'
                    />
                </View>
                <TouchableOpacity onPress={handleLogin}
                    className="mt-5 py-3 rounded-2xl" style={{backgroundColor: '#38517E'}}>
                    <Text className="text-white text-xl font-bold text-center"> Login </Text>
                </TouchableOpacity>
                </KeyboardAvoidingView>
        </View>
    )
}

