import { View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect }from 'react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'

const WelcomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: '#75BAA4'}}>
      <View className="flex-1 flex justify-around my-4">
        <Text className="text-white font-bold text-4xl text-center">
          Let's Get Started!
        </Text>
        <View className="flex-row justify-center">
          <Image source={require("../assets/sagift_logo-removebg-preview.png")}
              style={{width:350, height: 350}}/>
        </View>
        <View className="space-y-4">
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}
            className="py-3 mx-7 rounded-2xl" style={{backgroundColor: 'white'}}>
            <Text className="text-xl font-bold text-center text-black">
              Sign Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}
            className="py-3 mx-7 rounded-2xl" style={{backgroundColor: '#38517E'}}>
            <Text className="text-xl font-bold text-center text-white">
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default WelcomeScreen