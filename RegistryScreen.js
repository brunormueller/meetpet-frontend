import React, {
    createRef,
} from 'react';
import axios from 'axios';
import {
    Button,
    Layout,
} from '@ui-kitten/components';

import Input from './components/Input';

function RegistryScreen() {
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

    const handleOnSaveButtonPress = async () => {
        let name = getInputNameRef().getValue();
        let type = getInputTypeRef().getValue();
        let login = getInputLoginRef().getValue();
        let password = getInputPasswordRef().getValue();
        let confirmPassword = getInputConfirmPasswordRef().getValue();

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

                alert('Cadastro feito com sucesso');
            } catch (error) {
                console.error(error);
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
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    width: '100%',
                }}
            >
                <Button onPress={handleOnSaveButtonPress}>
                    SALVAR
                </Button>
            </Layout>
            {/* "photo": "image.jpg" */}
        </Layout>
    );
}

export default RegistryScreen;