import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../HomeScreen';
import { LoginScreen } from '../LoginScreen';

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
    <Navigator screenOptions={{ headerShown: false }}>
        <Screen name='Login' component={LoginScreen} />
        <Screen name='Home' component={HomeScreen} />
    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <HomeNavigator />
    </NavigationContainer>
);