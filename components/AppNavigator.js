import React, {
  createRef,
  useState,
  useEffect,
  useCallback
} from 'react';

import {
  getItemAsync
} from 'expo-secure-store';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
} from '@ui-kitten/components';

import { HomeScreen } from '../HomeScreen';
import { PetsScreen } from '../PetsScreen';
import { BreedsScreen } from '../BreedsScreen';
import { NewPetScreen } from '../NewPetScreen';
import { LoginScreen } from '../LoginScreen';
import { NewBreedScreen } from '../NewBreedScreen';
import { RegistryScreen } from '../RegistryScreen'
import { TopNavigation } from './TopNavigation';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state, userToken }) => {
  return (
    userToken ?
      (
        <BottomNavigation
          selectedIndex={state.index}
          onSelect={index => navigation.navigate(state.routeNames[index])}>
          <BottomNavigationTab title='Home'/>
          <BottomNavigationTab title='Pets'/>
          <BottomNavigationTab title='Raças'/>
        </BottomNavigation>
      ) : (
        <></>
      )

  )
}

const TabNavigator = (props) => {
  const {
    userToken,
    setUserToken,
  } = props;

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
    <Navigator tabBar={props => <BottomTabBar {...props} userToken={userToken} />}>
      {userToken ? (
        <>
          <Screen
            name='Home'
            component={({ navigation }) =>
              <HomeScreen
                navigation={navigation}
                userToken={userToken}
              />
            }
          />
          <Screen
            name='Pets'
            component={({ navigation }) =>
              <PetsScreen
                userToken={userToken}
                ref={petsScreenRef}
                navigation={navigation}
              />
            }
          />
          <Screen
            name='Raças'
            component={({ navigation }) =>
              <BreedsScreen
                userToken={userToken}
                ref={breedsScreenRef}
                navigation={navigation}
              />
            }
          />
          <Screen
              name='Cadastrar pet'
              component={({
                  route,
                  navigation,
              }) =>
                  <NewPetScreen
                    userToken={userToken}
                    routeParams={route.params}
                    navigation={navigation}
                    onInsertPet={handleOnInsertPet}
                  />
              }
          />
          <Screen
              name='Cadastar Raça'
              component={({
                  route,
                  navigation,
              }) =>
                  <NewBreedScreen
                    userToken={userToken}
                    routeParams={route.params}
                    navigation={navigation}
                    onInsertBreed={handleOnInsertBreed}
                  />
              }
          />
        </>
        ) : (
          <>
            <Screen 
              name='Login' 
              component={({
                route,
                navigation,
              }) =>
                  <LoginScreen
                    navigation={navigation}
                    setUserToken={setUserToken}
                  />
              }
            />
            <Screen name='Cadastro' component={RegistryScreen} />
          </>
        )
      }
    </Navigator>
  )
};

export const AppNavigator = () =>  {
  const [userToken, setUserToken] = useState(null);
  const getToken = useCallback(async () => {
  let token = await getItemAsync('user_token');
    setUserToken(token);
  }, [setUserToken]);

  useEffect(() => {
    getToken();
  }, [getToken]);

    return (
    <NavigationContainer>
      {
        userToken &&
        <TopNavigation
          setUserToken={setUserToken}
        />
      }
      <TabNavigator 
       userToken={userToken}
        setUserToken={setUserToken}
      />
    </NavigationContainer>
  );
}