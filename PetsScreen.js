import React, {
    createRef,
    forwardRef,
    useImperativeHandle,
} from 'react';
import {
    Button,
    Icon,
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
        return '1 ano';
    }

    return `${age} anos`;
};

export const PetsScreen = forwardRef((props, ref) => {
    const {
        navigation,
    } = props;

    const petsListRef = createRef();

    const getPetsListRef = () => {
        return petsListRef.current;
    };

    const handleOnNewPetButtonPress = () => {
        navigation.navigate('NewPet');
    };

    const handleOnEditPetButtonPress = item => {
        alert(`Edit pet ${item.id}`);
    };

    const handleOnDeletePetButtonPress = item => {
        alert(`Delete pet ${item.id}`);
    };

    const refreshList = () => {
        getPetsListRef().getData();
    };

    const EditIcon = (props) => (
        <Icon
            {...props}
            name='edit'
        />
    );

    const TrashIcon = (props) => (
        <Icon
            {...props}
            name='trash'
        />
    );

    const renderAccessoryRight = (props, item) => (
        <Layout
            style={{
                flexDirection: 'row',
            }}
        >
            <Button
                size='small'
                accessoryLeft={EditIcon}
                onPress={() => handleOnEditPetButtonPress(item)}
                style={{
                    marginRight: '5%',
                }}
            />
            <Button
                size='small'
                accessoryLeft={TrashIcon}
                onPress={() => handleOnDeletePetButtonPress(item)}
            />
        </Layout>
    );

    useImperativeHandle(ref, () => ({
        refreshList,
    }));

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
                    ref={petsListRef}
                    baseURL={`${baseURL}/pets`}
                    getTitle={item => item.name}
                    getDescription={item => `${getPetGenre(item.genre)}, ${getPetSize(item.size)}, ${getPetAge(item.age)}`}
                    renderAccessoryRight={renderAccessoryRight}
                />
            </Layout>
        </Layout>
    );
});
