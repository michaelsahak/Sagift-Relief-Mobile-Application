import React, { useLayoutEffect } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, Settings } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HomeIcon, UserIcon} from 'react-native-heroicons/solid'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from '@react-navigation/native'

import OrgHome from '../tabs/OrgHome';
import OrgProfile from '../tabs/OrgProfile';
import SettingScreen from '../screens/SettingScreen';
import OrgEditProfile from './OrgEditProfile';
import OrgSettingScreen from './OrgSettingScreen';

const Tab = createBottomTabNavigator();

const OrgTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
          tabBarShowLabel: false,
          headerShown: false, 
          tabBarStyle: { height: 50},
        }}>
        <Tab.Screen 
          name="OrgHome" 
          component={OrgHome} 
          options={{
          tabBarIcon: ({ focused }) => (
            <HomeIcon size={30}color={focused ? '#75BAA4' : '#C3C5C8'} /> 
          ),
        }}/>
        <Tab.Screen name="Profile" 
          component={OrgProfile} 
          options={{
          tabBarIcon: ({ focused }) => (
            <UserIcon size={30}color={focused ? '#75BAA4' : '#C3C5C8'} /> 
          ),
        }}/>
        <Tab.Screen 
            name="OrgSettings" 
            component={OrgSettingScreen} 
            options={{
            tabBarButton: () => <View/> // Hides the tab bar icon for this tab
        }}/>
        <Tab.Screen 
            name="OrgEditProfile" 
            component={OrgEditProfile} 
            options={{
            tabBarButton: () => <View/> // Hides the tab bar icon for this tab
        }}/>

        </Tab.Navigator>
    )
}

export default OrgTabs;