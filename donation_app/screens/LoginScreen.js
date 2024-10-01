import { View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../Firebase'; 
import { getDocs, query, collection, where } from 'firebase/firestore';

export default function LoginScreen() {
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

                if (userData.password === inputPassword && userData.type === 'donator') {
                    
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
                    
                    navigation.navigate('TabScreen')

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
                            style={{width:150, height: 150}}/>
                </View>
            </SafeAreaView>
            <KeyboardAvoidingView 
                className="flex-1 bg-white px-8 pt-8"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
                style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                <View className="form space-y-2">
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
                        secureTextEntry
                        value = {inputPassword} 
                        onChangeText={(text)=>handleChange({input: text, type: 'password'})}
                        //placeholder='Enter password'
                    />
                </View>
                <View className="flex-row items-center mt-2">
                    <View className="flex-1 h-0.5 bg-gray-300" />
                    <Text className="text-center text-base mx-2"> Or </Text>
                    <View className="flex-1 h-0.5 bg-gray-300" />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('OrgLogin')}
                    className="flex items-center mt-5 mb-5">
                    <Text className="text-black text-lg font-bold"> Login to Organization Account </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogin}
                    className="mt-2 py-3 rounded-2xl" style={{backgroundColor: '#38517E'}}>
                    <Text className="text-xl text-white font-bold text-center"> Login </Text>
                </TouchableOpacity>
                <View className="flex-row justify-center items-center mt-3">
                    <Text className="text-black font-2xl mt-2"> Not a user? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}
                        className="mt-2">
                        <Text className="text-black font-2xl font-bold"> Sign up here. </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}