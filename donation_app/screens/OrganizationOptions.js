import { View, Text, TouchableOpacity, FlatList, Image, ScrollView} from 'react-native';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';

const OrgOptions = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions
    ({ headerShown: false });
  }, []);

  const organizations = [
    // Your array of organizations
    { id: '1', name: 'Angat Buhay' },
    { id: '2', name: 'Segunda Mana' },
    { id: '3', name: 'Philippine Red Cross' },
    // { id: '4', name: 'Gravity Boys' },
    // ...other organizations
  ];

  const renderItem = ({ item }) => (
    <View className="flex-1 flex-row p-4">
      <TouchableOpacity
        className="flex-row ml-8 mt-2"
        onPress={() => {
          // Handle the press action, e.g., navigate to a details page
          if (item.name === 'Angat Buhay') {
            navigation.navigate('AngatBuhay', { orgId: item.id });
          }
          if (item.name === 'Segunda Mana') {
            navigation.navigate('SegundaMana', { orgId: item.id });
          }
          if (item.name === 'Philippine Red Cross') {
            navigation.navigate('RedCross', { orgId: item.id });
          }
        }}>
        {item.name === 'Angat Buhay' && (
          <Image
            source={require("../assets/Angat_Buhay_logo.png")}
            className="w-24 h-12 mr-9" // adjust your image size as needed
          />
        )}
        {item.name === 'Segunda Mana' && (
          <Image
            source={require("../assets/segunda_mana_logo.png")}
            className="w-28 h-24 mr-5" // adjust your image size as needed
          />
        )}
        {item.name === 'Philippine Red Cross' && (
          <Image
            source={require("../assets/red_cross_logo.png")}
            className="w-28 h-24 mr-5" // adjust your image size as needed
          />
        )}
        <Text className="text-lg font-semibold">{item.name}</Text>
      </TouchableOpacity>
    </View>
  );  

  return (
    <View className="flex-1 bg-gray" style={{backgroundColor: '#75BAA4'}}>
        <SafeAreaView className="flex">
            <View className="flex-row justify-start">
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    className="bg-gray-300 p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-2">
                    <ChevronLeftIcon size="20" color="black"/>
                </TouchableOpacity>
            </View>
            <Text className="px-4 mt-5 mb-2 text-3xl font-bold text-center"> Charity Organizations </Text>
            <FlatList
                data={organizations}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    </View>
  );
}

export default OrgOptions
