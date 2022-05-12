import React from 'react';
import {
    Button,
    Layout,
    Text,
} from '@ui-kitten/components';

import List from './components/List';

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

export const PetsScreen = () => {
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
                <Button>
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
                    baseURL='http://10.10.117.56:3000/pets'
                    getTitle={item => item.name}
                    getDescription={item => `${getPetGenre(item.genre)} (${getPetSize(item.size)})`}
                />
            </Layout>
        </Layout>
    );
};
