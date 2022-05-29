import React, {
    createRef,
    useState,
    forwardRef,
    useImperativeHandle,
} from 'react';

import {
    Button,
    Icon,
    Layout,
    Text,
    Card,
    Modal,
} from '@ui-kitten/components';

import axios from 'axios'

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

    const [state, setState] = useState({
        modalVisible: false,
        petSelected: {},
    });

    const petsListRef = createRef();

    const getPetsListRef = () => {
        return petsListRef.current;
    };

    const handleOnNewPetButtonPress = () => {
        navigation.navigate('NewPet');
    };

    const handleOnEditPetButtonPress = item => {
        navigation.navigate('NewPet', item);
    };

    const handleOnDeletePetButtonPress = item => {
        setState({
            modalVisible: true,
            petSelected: item
        })
    };

    const handleOnRemovePetButtonPress = async () => {
        try {
            const listPets = getPetsListRef();

            await axios.delete(`${baseURL}/pets/${state.petSelected.id}`)
            .then(() => {
                alert('Pet removido com sucesso');
                setState({
                    modalVisible: false
                })

                listPets.getData()
            })
            .catch(error => {
                console.error(error)
                alert('Falha ao remover o pet');
            })
        } catch (error) {
            console.log(error);
        }
    }

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
            <Modal
                visible={state.modalVisible}
                onBackdropPress={() => setState({
                    modalVisible: false
                })}>
                <Card disabled={true}>
                <Text>Tem certeza que deseja excluir o Pet {state.petSelected?.name}</Text>
                <Button onPress={() => handleOnRemovePetButtonPress(state.petSelected?.id)}>
                    Confirmar
                </Button>
                <Button onPress={() => setState({
                    modalVisible: false
                })}>
                    Cancelar
                </Button>
                </Card>
            </Modal>
        </Layout>
    );
});
