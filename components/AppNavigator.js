import React, {
    createRef,
} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../HomeScreen';
import { LoginScreen } from '../LoginScreen';
import { RegistryScreen } from '../RegistryScreen';
import { PetsScreen } from '../PetsScreen';
import { NewPetScreen } from '../NewPetScreen';

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => {
    const petsScreenRef = createRef();

    const getPetsScreenRef = () => {
        return petsScreenRef.current;
    };

    const handleOnInsertPet = () => {
        getPetsScreenRef().refreshList();
    };

    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name='Login' component={LoginScreen} />
            <Screen name='Registry' component={RegistryScreen} />
            <Screen name='Home' component={HomeScreen} />
            <Screen
                name='Pets'
                component={({ navigation }) =>
                    <PetsScreen
                        ref={petsScreenRef}
                        navigation={navigation}
                    />
                }
            />
            <Screen
                name='NewPet'
                component={({ navigation }) =>
                    <NewPetScreen
                        navigation={navigation}
                        onInsertPet={handleOnInsertPet}
                    />
                }
            />
        </Navigator>
    );
};

export const AppNavigator = () => (
    <NavigationContainer>
        <HomeNavigator />
    </NavigationContainer>
);