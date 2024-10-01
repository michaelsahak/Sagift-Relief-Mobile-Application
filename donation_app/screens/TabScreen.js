import React, { useLayoutEffect } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, Settings } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HomeIcon, UserIcon} from 'react-native-heroicons/solid'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from '@react-navigation/native'
import Home from '../tabs/Home';
import Profile from '../tabs/Profile';
import DonationScreen from '../screens/DonationScreen';
import NotificationScreen from '../screens/NotificationScreen';
import OrgOptions from '../screens/OrganizationOptions';
import SettingScreen from '../screens/SettingScreen';
import EditProfile from '../screens/EditProfileScreen';

// Import other screens here if needed

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarShowLabel: false,
        headerShown: false, 
        tabBarStyle: { height: 50},
      }}>
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
        tabBarIcon: ({ focused }) => (
          <HomeIcon size={30}color={focused ? '#75BAA4' : '#C3C5C8'} /> 
        ),
      }}/>
      <Tab.Screen name="Profile" 
        component={Profile} 
        options={{
        tabBarIcon: ({ focused }) => (
          <UserIcon size={30}color={focused ? '#75BAA4' : '#C3C5C8'} /> 
        ),
      }}/>
      <Tab.Screen 
        name="Donation" 
        component={DonationScreen} 
        options={{
          tabBarButton: () => <View/> // Hides the tab bar icon for this tab
        }}/>
      <Tab.Screen 
        name="Notif" 
        component={NotificationScreen}
        options={{
          tabBarButton: () => <View/> // Hides the tab bar icon for this tab
        }}/>
      <Tab.Screen 
        name="Settings" 
        component={SettingScreen} 
        options={{
          tabBarButton: () => <View/> // Hides the tab bar icon for this tab
        }}/>
      <Tab.Screen 
        name="EditProfile" 
        component={EditProfile} 
        options={{
          tabBarButton: () => <View/> // Hides the tab bar icon for this tab
        }}/>
      <Tab.Screen 
        name="OrganizationOptions" 
        component={OrgOptions}
        options={{
          tabBarButton: () => <View/> // Hides the tab bar icon for this tab
        }}/>
    </Tab.Navigator>
  );
}
export default Tabs;
