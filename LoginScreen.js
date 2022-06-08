import React, {
    createRef,
} from 'react';

import {
    setItemAsync,
    getItemAsync
} from 'expo-secure-store';

import {
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {
    Button,
    Layout,
    Text,
} from '@ui-kitten/components';

import Input from './components/Input';
import { baseURL } from './configs'

const setSecureStoreItem = async (key, value) => {
    await setItemAsync(key, value);
}

export const LoginScreen = ({ navigation }) => {
    const inputLoginRef = createRef(null);
    const inputPasswordRef = createRef(null);

    const getInputLoginRef = () => {
        return inputLoginRef.current;
    };

    const getInputPasswordRef = () => {
        return inputPasswordRef.current;
    };

    const handleOnRegistryButtonPress = () => {
        navigation.navigate('Registry');
    };

    const handleOnLoginButtonPress = async () => {
        try {
            const { data } = await axios.post(`${baseURL}/users/login`, {
                login: getInputLoginRef().getValue(),
                password: getInputPasswordRef().getValue(),
            });
// console.log(data)
            setSecureStoreItem('user_token', data.access_token_meet_pet);
            setSecureStoreItem('user_type', data.type);
            // setSecureStoreItem('user_id', data.id);

            if (data.type == 'R') {
                navigation.navigate('Home');
            }

        } catch (error) {
            if (error && error.response && error.response.status == 401) {
                alert('Usuário ou senha inválido');
            } else {
                alert('Falha ao tentar fazer o login');
            }
        }
    };
    

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    padding: '5%',
                }}
            >
                <Input
                    ref={inputLoginRef}
                    placeholder='Usuário'
                    style={{
                        paddingBottom: '5%',
                    }}
                />
                <Input
                    secureTextEntry
                    ref={inputPasswordRef}
                    placeholder='Senha'
                    style={{
                        paddingBottom: '5%',
                    }}
                />
                <Layout
                    style={{
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        width: '100%',
                    }}
                >
                    <TouchableOpacity onPress={handleOnRegistryButtonPress}>
                        <Text
                            status='primary'
                            style={{
                                marginBottom: '5%',
                            }}
                        >
                            Clique aqui para fazer o cadastro
                        </Text>
                    </TouchableOpacity>
                    <Button onPress={handleOnLoginButtonPress}>
                        ENTRAR
                    </Button>
                </Layout>
            </Layout>
        </SafeAreaView>
    );
}
