import React, {
    createRef,
    useState,
    useEffect,
} from 'react';
import {
    Button,
    Layout,
    Text,
} from '@ui-kitten/components';

import axios from 'axios';
import Select from './components/Select';
import Input from './components/Input';
import { baseURL } from './configs'

export const NewPetScreen = (props) => {
    const {
        routeParams,
        navigation,
        onInsertPet,
    } = props;

    const [state, setState] = useState({
        loadData: true,
        breeds: [],
    });

    const getBreeds = async () => {
        try {
            const { data } = await axios.get(`${baseURL}/breeds`);
            setState({
                loadData: false,
                breeds: data,
            });
        } catch (error) {
            alert('Falha ao tentar carregar os dados');
        }
    };

    useEffect(() => {
        setTimeout(() => {
            if (state.loadData) {
                getBreeds();
            }
        }, 0);
    }, [state.loadData, setState]);

    const handleOnAddOrEditPetButtonPress = async () => {
        const name = inputNameRef.current.getValue();
        const age = parseInt(inputAgeRef.current.getValue());
        const breed = selectBreedRef.current.getValue();
        const size = selectSizeRef.current.getValue();
        const genre = selectGenreRef.current.getValue();

        let isNameValid = true;
        let isAgeValid = true;
        let isBreedValid = true;
        let isSizeValid = true;
        let isGenreValid = true;

        if (!name) {
            isNameValid = false;

            inputNameRef.current.setValid(false);
        }

        if (!age) {
            isAgeValid = false;

            inputAgeRef.current.setValid(false);
        }

        if (!breed) {
            isBreedValid = false;

            selectBreedRef.current.setValid(false);
        }

        if (!size) {
            isSizeValid = false;

            selectSizeRef.current.setValid(false);
        }

        if (!genre) {
            isGenreValid = false;

            selectGenreRef.current.setValid(false);
        }
        if (!isNameValid || !isAgeValid || !isBreedValid || !isSizeValid || !isGenreValid)
            return;

        const isEdit = routeParams?.id ? true : false
        try {
            await axios({
                method: isEdit ? 'PATCH' : 'POST',
                url: `${baseURL}/pets${isEdit ? `/${routeParams.id}` : ''}`,
                data: {
                    name,
                    age,
                    breed,
                    size,
                    genre
                }
            }).then(({ status } = response) => {
                if (status === 200 || status === 201 || status === 204) {
                    navigation.navigate('Pets');
                    alert(isEdit ? 'Pet editado com sucesso' : 'Pet cadastrado com sucesso');
                    onInsertPet();
                }
            });
        } catch (error) {
            if (error && error.response && error.response.status == 401) {
                alert('Favor realizar o login novamente');
                navigation.navigate('Login')
            } else {
                alert(isEdit ? 'Falha ao tentar editar o pet': 'Falha ao tentar cadastrar o pet');
            }
        }
    };

    const inputNameRef = createRef(null);
    const inputAgeRef = createRef(null);
    const selectBreedRef = createRef(null);
    const selectSizeRef = createRef(null);
    const selectGenreRef = createRef(null);

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
                <Input
                    ref={inputAgeRef}
                    placeholder='Idade'
                    defaultValue={routeParams?.age ? routeParams.age.toString() : ''}
                    keyboardType='numeric'
                    style={{
                        paddingBottom: '5%',
                    }}
                />
                <Select
                    ref={selectBreedRef}
                    placeholder='Raça'
                    style={{
                        with: '100%',
                        paddingBottom: '5%',
                    }}
                    options={state.breeds.map(breed => {
                        return { value: breed.id, display: breed.name }
                    })}
                />
                <Select
                    ref={selectSizeRef}
                    placeholder='Tamanho'
                    defaultValue={routeParams?.size ? routeParams.size : ''}
                    style={{
                        with: '100%',
                        paddingBottom: '5%',
                    }}
                    options={[
                        { value: 'P', display: 'Pequeno' },
                        { value: 'M', display: 'Médio' },
                        { value: 'G', display: 'Grande' }
                    ]}
                />
                <Select
                    ref={selectGenreRef}
                    placeholder='Gênero'
                    defaultValue={routeParams?.genre ? routeParams.genre : ''}
                    style={{
                        with: '100%',
                        paddingBottom: '5%',
                    }}
                    options={[
                        { value: 'M', display: 'Maculino' },
                        { value: 'F', display: 'Feminino' },
                    ]}
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
