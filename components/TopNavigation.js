import React from 'react';
import {
  Button,
  TopNavigation as KittenTopNavigation,
} from '@ui-kitten/components';
import {
  deleteItemAsync,
} from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationHelpersContext } from '@react-navigation/native';


export const TopNavigation = (props) => {
  const {
    setUserToken
  } = props;
  
  const logoutUser = async () => {
    await deleteItemAsync('user_token');

    setUserToken(null);
  }

  const renderRightActions = () => (
    <React.Fragment>
      <Button onPress={logoutUser}>Sair</Button>
    </React.Fragment>
  );

  return (
    <SafeAreaView>
      <KittenTopNavigation
        alignment='center'
        accessoryRight={renderRightActions}
      />
    </SafeAreaView>
  );
};