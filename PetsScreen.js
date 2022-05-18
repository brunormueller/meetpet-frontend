import React from 'react';
import {
    Button,
    Layout,
    Text,
} from '@ui-kitten/components';

import List from './components/List';
import { baseURL } from './configs'

const getPetGenre = genre => {
    switch (genre) {
        case 'M':
            return 'Macho';
        case 'F':
            return 'Fêmea';
        default:
            return 'Indefinido';
    }
};

const getPetSize = size => {
    switch (size) {
        case 'P':
            return 'Pequeno';
        case 'M':
            return 'Médio';
        case 'G':
            return 'Grande';
        default:
            return 'Indefinido';
    }
};

const getPetAge = age => {
    if (age == 1) {
        return `${age} anos`;
    }

    return '1 ano';
};

export const PetsScreen = ({ navigation }) => {
    const handleOnNewPetButtonPress = () => {
        navigation.navigate('NewPet');
    };
    return (
        <Layout
            style={{
                flex: 1,
            }}
        >
            <Layout
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    paddingTop: '12%',
                    paddingLeft: '5%',
                    paddingRight: '5%',
                    paddingBottom: '5%',
                }}
            >
                <Text
                    category='h5'
                >
                    LISTA DE PETS
                </Text>
                <Button onPress={handleOnNewPetButtonPress}>
                    NOVO
                </Button>
            </Layout>
            <Layout
                style={{
                    flex: 1,
                    flexDirection: 'row',
                }}
            >
                <List
                    baseURL={`${baseURL}/pets`}
                    getTitle={item => item.name}
                    getDescription={item => `${getPetGenre(item.genre)}, ${getPetSize(item.size)}, ${getPetAge(item.age)}`}
                />
            </Layout>
        </Layout>
    );
};
