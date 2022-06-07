import React, {
  createRef,
} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';

import { HomeScreen } from '../HomeScreen';
import { PetsScreen } from '../PetsScreen';
import { BreedsScreen } from '../BreedsScreen';
import { NewPetScreen } from '../NewPetScreen';
import { LoginScreen } from '../LoginScreen';
import { NewBreedScreen } from '../NewBreedScreen';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='Início'/>
    <BottomNavigationTab title='Animais'/>
    <BottomNavigationTab title='Raças'/>
  </BottomNavigation>
);

const TabNavigator = () => {
  const petsScreenRef = createRef();
  const breedsScreenRef = createRef();
  
  const getPetsScreenRef = () => {
      return petsScreenRef.current;
  };
  
  const handleOnInsertPet = () => {
      getPetsScreenRef().refreshList();
  };
  
  const getBreedsScreenRef = () => {
    return breedsScreenRef.current;
  };
  
  const handleOnInsertBreed = () => {
    getBreedsScreenRef().refreshList();
  };
  return (

    <Navigator tabBar={props => <BottomTabBar {...props} />}>
      <Screen name='Home' component={HomeScreen}/>
      <Screen name='Pets' component={({ navigation }) =>
                    <PetsScreen
                        ref={petsScreenRef}
                        navigation={navigation}
                    />
                }/>
      <Screen name='Breeds' component={({ navigation }) =>
                    <BreedsScreen
                        ref={breedsScreenRef}
                        navigation={navigation}
                    />
                }/>

      <Screen name='Login' component={LoginScreen} />
      <Screen
          name='NewPet'
          component={({
              route,
              navigation,
          }) =>
              <NewPetScreen
                  routeParams={route.params}
                  navigation={navigation}
                  onInsertPet={handleOnInsertPet}
              />
          }
      />
      <Screen
          name='NewBreed'
          component={({
              route,
              navigation,
          }) =>
              <NewBreedScreen
                  routeParams={route.params}
                  navigation={navigation}
                  onInsertBreed={handleOnInsertBreed}
              />
          }
      />
    </Navigator>
  )
};

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator/>
  </NavigationContainer>
);