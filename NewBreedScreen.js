import React, {
    createRef,
} from 'react';
import {
    Button,
    Layout,
    IndexPath as KittenIndexPath,
} from '@ui-kitten/components';

import axios from 'axios';
import Input from './components/Input';
import { baseURL } from './configs'

export const NewBreedScreen = (props) => {
    const {
        routeParams,
        navigation,
        onInsertBreed,
    } = props;

    const handleOnAddOrEditPetButtonPress = async () => {
        const name = inputNameRef.current.getValue();

        let isNameValid = true;

        if (!name) {
            isNameValid = false;

            inputNameRef.current.setValid(false);
        }

        if (!isNameValid)
            return;

        const isEdit = routeParams?.id ? true : false

        try {
            await axios({
                method: isEdit ? 'PATCH' : 'POST',
                url: `${baseURL}/breeds${isEdit ? `/${routeParams.id}` : ''}`,
                data: {
                    name,
                }
            }).then(({ status }) => {
                if (status === 200 || status === 201 || status === 204) {
                    navigation.navigate('Raças');
                    alert(isEdit ? 'Raça editada com sucesso' : 'Raça cadastrada com sucesso');
                    onInsertBreed();
                }
            });
        } catch (error) {
            if (error && error.response && error.response.status == 401) {
                alert('Favor realizar o login novamente');
                navigation.navigate('Login')
            } else {
                alert(isEdit ? 'Falha ao tentar editar a raça': 'Falha ao tentar cadastrar a raça');
            }
        }
    };

    const inputNameRef = createRef(null);

    return (
        <Layout
            style={{
                flex: 1,
            }}
        >
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
                    defaultValue={routeParams?.name ? routeParams.name : ''}
                    style={{
                        paddingBottom: '5%',
                    }}
                />
                {routeParams &&
                    <Button onPress={handleOnAddOrEditPetButtonPress}>
                        Salvar
                    </Button>
                    ||
                    <Button onPress={handleOnAddOrEditPetButtonPress}>
                        Cadastrar
                    </Button>
                }
            </Layout>
        </Layout>
    );
};
