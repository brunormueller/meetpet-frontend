import React, {
    createRef,
} from 'react';
import axios from 'axios';
import {
    Button,
    Layout,
} from '@ui-kitten/components';

import Input from './components/Input';

export const RegistryScreen = ({ navigation }) => {
    const inputNameRef = createRef(null);
    const inputTypeRef = createRef(null);
    const inputLoginRef = createRef(null);
    const inputPasswordRef = createRef(null);
    const inputConfirmPasswordRef = createRef(null);

    const getInputNameRef = () => {
        return inputNameRef.current;
    };

    const getInputTypeRef = () => {
        return inputTypeRef.current;
    };

    const getInputLoginRef = () => {
        return inputLoginRef.current;
    };

    const getInputPasswordRef = () => {
        return inputPasswordRef.current;
    };

    const getInputConfirmPasswordRef = () => {
        return inputConfirmPasswordRef.current;
    };

    const handleOnBackButtonPress = () => {
        navigation.navigate('Login');
    };

    const handleOnSaveButtonPress = async () => {
        let auxInputNameRef = getInputNameRef();
        let auxInputTypeRef = getInputTypeRef();
        let auxInputLoginRef = getInputLoginRef();
        let auxInputPasswordRef = getInputPasswordRef();
        let auxInputConfirmPasswordRef = getInputConfirmPasswordRef();

        let name = auxInputNameRef.getValue();
        let type = auxInputTypeRef.getValue();
        let login = auxInputLoginRef.getValue();
        let password = auxInputPasswordRef.getValue();
        let confirmPassword = auxInputConfirmPasswordRef.getValue();

        let isNameValid = true;
        let isTypeValid = true;
        let isLoginValid = true;
        let isPasswordValid = true;
        let isConfirmPasswordValid = true;

        if (!name) {
            isNameValid = false;

            auxInputNameRef.setValid(false);
        }

        if (!type) {
            isTypeValid = false;

            auxInputTypeRef.setValid(false);
        }

        if (!login) {
            isLoginValid = false;

            auxInputLoginRef.setValid(false);
        }

        if (!password) {
            isPasswordValid = false;

            auxInputPasswordRef.setValid(false);
        }

        if (!confirmPassword) {
            isConfirmPasswordValid = false;

            auxInputConfirmPasswordRef.setValid(false);
        }

        if (isNameValid && isTypeValid && isLoginValid && isPasswordValid && isConfirmPasswordValid) {
            if (password != confirmPassword) {
                alert('Favor confirmar a senha');
            } else {
                try {
                    await axios.post('http://10.10.117.56:3000/users/register', {
                        name,
                        type,
                        login,
                        password,
                        photo: 'fixo.jpg',
                    });

                    navigation.navigate('Home');
                } catch (error) {
                    alert('Falha ao tentar fazer o cadastro');
                }
            }
        }
    };

    return (
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
                ref={inputNameRef}
                placeholder='Nome'
                style={{
                    paddingBottom: '5%',
                }}
            />
            <Input
                ref={inputTypeRef}
                placeholder='Tipo'
                style={{
                    paddingBottom: '5%',
                }}
            />
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
            <Input
                secureTextEntry
                ref={inputConfirmPasswordRef}
                placeholder='Confirmar Senha'
                style={{
                    paddingBottom: '5%',
                }}
            />
            <Layout
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    width: '100%',
                }}
            >
                <Button
                    onPress={handleOnBackButtonPress}
                    style={{
                        marginRight: '5%',
                    }}
                >
                    VOLTAR
                </Button>
                <Button onPress={handleOnSaveButtonPress}>
                    SALVAR
                </Button>
            </Layout>
            {/* "photo": "image.jpg" */}
        </Layout>
    );
}
