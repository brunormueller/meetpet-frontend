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

    const handleOnAddPetButtonPress = async () => {
        try {
            await axios.post(`${baseURL}/pets`, {
                name: inputNameRef.current.getValue(),
                age: parseInt(inputAgeRef.current.getValue()),
                breed: selectBreedRef.current.getValue(),
                size: selectSizeRef.current.getValue(),
                genre: selectGenreRef.current.getValue(),
            }).then(({ status } = response) => {
                if (status === 200 || status === 201 || status === 204) {
                    navigation.navigate('Pets');
                    alert('Pet cadastrado com sucesso');
                    onInsertPet();
                }
            });
        } catch (error) {
            console.log(error.response)
            if (error && error.response && error.response.status == 401) {
                alert('Favor realizar o login novamente');
                navigation.navigate('Login')
            } else {
                alert('Falha ao tentar cadastrar o pet');
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
                    style={{
                        paddingBottom: '5%',
                    }}
                />
                <Input
                    ref={inputAgeRef}
                    placeholder='Idade'
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
                    style={{
                        with: '100%',
                        paddingBottom: '5%',
                    }}
                    options={[
                        { value: 'M', display: 'Maculino' },
                        { value: 'F', display: 'Feminino' },
                    ]}
                />
                <Button onPress={handleOnAddPetButtonPress}>
                    Cadastrar
                </Button>
            </Layout>
        </Layout>
    );
};
