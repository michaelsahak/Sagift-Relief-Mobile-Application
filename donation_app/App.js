import React from 'react';
import { View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import TabScreen from './screens/TabScreen';
import OrgLogin from './orgscreens/OrgLoginScreen';
import OrgTabs from './orgscreens/OrgTabScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <TailwindProvider>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen 
            name="TabScreen" 
            component={TabScreen} 
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen name="Donation" component={DonationScreen}/> */}
          <Stack.Screen name="OrgLogin" component={OrgLogin} />
          <Stack.Screen 
            name="OrgTabScreen" 
            component={OrgTabs} 
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </TailwindProvider>
    </NavigationContainer>
  );
}
