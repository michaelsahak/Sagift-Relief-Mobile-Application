import { View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import { BellIcon } from 'react-native-heroicons/outline'
import { QuestionMarkCircleIcon, HeartIcon, TruckIcon } from 'react-native-heroicons/outline'

export default function Home() {
  
  const navigation = useNavigation();

  const categories = [
    { icon: require('../assets/tshirt.png'), label: 'Clothes' },
    { icon: require('../assets/bag.png'), label: 'Bag' },
    { icon: require('../assets/shoes.png'), label: 'Shoes' },
    { icon: require('../assets/book.png'), label: 'Books' },
    { icon: require('../assets/equipment.png'), label: 'Equipment' },
    { icon: require('../assets/console.png'), label: 'Games' },
    { icon: require('../assets/must-have.png'), label: 'Essentials' },
    { icon: require('../assets/toiletries.png'), label: 'Toiletries' },
    // Add more categories as needed
  ];

  return (
    <ScrollView className=" flex-1 relative bg-white" style={{backgroundColor: '#75BAA4'}}>
        <SafeAreaView>
              <View className="flex-row justify-end ml-2 mt-3 mr-3">
                  {/* <TouchableOpacity 
                    onPress={() => navigation.navigate('Notif')}
                    className="p-2 ml-4">
                    <BellIcon size="30" color="black"/>
                  </TouchableOpacity> */}
              </View>
          </SafeAreaView>
          <View className="p-5">
            <Text className="text-3xl font-bold">Do you wish to give away items?</Text>
          </View>
          <View className="flex-row justify-around px-5 mb-3">
            {/* How to donate card */}
            <View className="w-1/3 bg-white p-2 rounded-lg shadow-lg mr-4">
              <QuestionMarkCircleIcon size={20} color="black" />
              <Text className="text-lg font-semibold mt-2">How to donate</Text>
              <Text className="text-xs mt-1">
                To Donate, choose an appropriate organization for your donation.
              </Text>
            </View>

            {/* How it works card */}
            <View className="w-1/3 bg-white p-2 rounded-lg shadow-lg">
              <HeartIcon size={20} color="black"/>
              <Text className="text-lg font-semibold mt-2">How it works</Text>
              <Text className="text-xs mt-1">
                Post a relief good that you want to donate.
              </Text>
            </View>

            {/* How it is utilized card */}
            <View className="w-1/3 bg-white p-2 rounded-lg shadow-lg ml-4">
              <TruckIcon size={20} color="black" />
              <Text className="text-lg font-semibold mt-2">How is it utilized</Text>
              <Text className="text-xs mt-1">
                Chosen organization will use the donation to affected communities.
              </Text>
            </View>
          </View>

          <View className="mt-2">
            <TouchableOpacity 
            onPress={() => navigation.navigate('Donation')}
            className="py-3 mx-3 rounded-xl" style={{backgroundColor: '#38517E'}}>
              <Text className="text-xl font-bold text-center text-white">
                Donate to An Organization
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-1 px-4 py-4">
              <Text className="text-3xl font-bold"> What can be donated</Text>
              <View className="flex-row flex-wrap">
              {categories.map((category, index) => (
                <View key={index} className="w-1/4">
                  <View className="items-center p-4 rounded-lg">
                    <Image source={category.icon} className="h-8 w-8" />
                  </View>
                  <Text className="text-center mt-2">{category.label}</Text>
                </View>
              ))}
            </View>
          </View>
    </ScrollView>
  );
};
