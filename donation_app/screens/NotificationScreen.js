import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList, ScrollView} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect }from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'
import { GiftIcon} from 'react-native-heroicons/outline'

const Notif = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, []);

    const notifications = [
        { id: '1', date: '10 Nov 2023', message: 'Angat Buhay got your donation!' },
        { id: '2', date: '10 Nov 2023', message: 'Angat Buhay got your donation!' },
        { id: '3', date: '12 Nov 2023', message: 'Angat Buhay got your donation!' },
        { id: '4', date: '13 Nov 2023', message: 'Angat Buhay got your donation!' },
        { id: '5', date: '14 Nov 2023', message: 'Angat Buhay got your donation!' },
        { id: '6', date: '12 Nov 2023', message: 'Angat Buhay got your donation!' },
        { id: '7', date: '13 Nov 2023', message: 'Angat Buhay got your donation!' },
        { id: '8', date: '14 Nov 2023', message: 'Angat Buhay got your donation!' },
        { id: '9', date: '12 Nov 2023', message: 'Angat Buhay got your donation!' },
        { id: '10', date: '13 Nov 2023', message: 'Angat Buhay got your donation!' },
        { id: '11', date: '14 Nov 2023', message: 'Angat Buhay got your donation!' },
        { id: '12', date: '13 Nov 2023', message: 'Angat Buhay got your donation!' },
        { id: '13', date: '14 Nov 2023', message: 'Angat Buhay got your donation!' },
    ];

        // Group notifications by date
    const groupedNotifications = notifications.reduce((grouped, notification) => {
        const { date } = notification;
        if (!grouped[date]) {
        grouped[date] = [];
        }
        grouped[date].push(notification);
        return grouped;
    }, {});

    const renderGroup = ({ item }) => {
        const [date, notificationsForDate] = item;
        return (
            <ScrollView className="flex-1">
                <Text className="text-sm text-black ml-5 py-2">{date}</Text>
                {notificationsForDate.map(notification => (
                    <View key={notification.id} className="flex-row flex-start ml-8 mt-2">
                        <GiftIcon size={24} color="red"/>
                        <Text className="font-bold ml-3">{notification.message}</Text>
                    </View>
                ))}
            </ScrollView>
        );
    };    

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
                <Text className="px-4 mt-5 mb-2 text-3xl font-bold"> Notifications </Text>
                <FlatList
                    data={Object.entries(groupedNotifications)}
                    renderItem={renderGroup}
                    keyExtractor={(item) => item[0]}
                    className=""
                />
            </SafeAreaView>
        </View>
    )
}

export default Notif
