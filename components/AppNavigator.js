import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../HomeScreen';
import { LoginScreen } from '../LoginScreen';
import { RegistryScreen } from '../RegistryScreen';
import { PetsScreen } from '../PetsScreen';

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
    <Navigator screenOptions={{ headerShown: false }}>
        <Screen name='Login' component={LoginScreen} />
        <Screen name='Registry' component={RegistryScreen} />
        <Screen name='Home' component={HomeScreen} />
        <Screen name='Pets' component={PetsScreen} />
    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <HomeNavigator />
    </NavigationContainer>
);