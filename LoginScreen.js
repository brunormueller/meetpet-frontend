import React, {
    createRef,
} from 'react';
import {
    SafeAreaView,
} from 'react-native';
import axios from 'axios';
import {
    Button,
    Layout,
} from '@ui-kitten/components';

import Input from './components/Input';

export const LoginScreen = ({ navigation }) => {
    const inputLoginRef = createRef(null);
    const inputPasswordRef = createRef(null);

    const getInputLoginRef = () => {
        return inputLoginRef.current;
    };

    const getInputPasswordRef = () => {
        return inputPasswordRef.current;
    };

    const handleOnLoginButtonPress = async () => {
        try {
            await axios.post('http://10.10.117.56:3000/users/login', {
                login: getInputLoginRef().getValue(),
                password: getInputPasswordRef().getValue(),
            });

            navigation.navigate('Home');
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
                    <Button onPress={handleOnLoginButtonPress}>
                        ENTRAR
                    </Button>
                </Layout>
            </Layout>
        </SafeAreaView>
    );
}
