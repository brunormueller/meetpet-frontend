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

export const BreedsScreen = forwardRef((props, ref) => {
    const {
        navigation,
    } = props;

    const [state, setState] = useState({
        modalVisible: false,
        breedSelected: {},
    });

    const breedsListRef = createRef();

    const getBreedsListRef = () => {
        return breedsListRef.current;
    };

    const handleOnNewBreedButtonPress = () => {
        navigation.navigate('Cadastar Raça');
    };

    const handleOnEditBreedButtonPress = item => {
        navigation.navigate('Cadastar Raça', item);
    };

    const handleOnDeleteBreedButtonPress = item => {
        setState({
            modalVisible: true,
            breedSelected: item
        })
    };

    const handleOnRemoveBreedButtonPress = async () => {
        try {
            const listBreeds = getBreedsListRef();

            await axios.delete(`${baseURL}/breeds/${state.breedSelected.id}`)
            .then(() => {
                alert('Raça removida com sucesso');
                setState({
                    modalVisible: false
                })

                listBreeds.getData()
            })
            .catch(error => {
                console.error(error)
                alert('Falha ao remover a raça');
            })
        } catch (error) {
            console.log(error);
        }
    }

    const refreshList = () => {
        getBreedsListRef().getData();
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
                onPress={() => handleOnEditBreedButtonPress(item)}
                style={{
                    marginRight: '5%',
                }}
            />
            <Button
                size='small'
                accessoryLeft={TrashIcon}
                onPress={() => handleOnDeleteBreedButtonPress(item)}
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
                    LISTA DE RAÇAS
                </Text>
                <Button onPress={handleOnNewBreedButtonPress}>
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
                    ref={breedsListRef}
                    baseURL={`${baseURL}/breeds`}
                    getTitle={item => item.name}
                    getDescription={() => ''}
                    renderAccessoryRight={renderAccessoryRight}
                />
            </Layout>
            <Modal
                visible={state.modalVisible}
                onBackdropPress={() => setState({
                    modalVisible: false
                })}>
                <Card disabled={true}>
                <Text>Tem certeza que deseja excluir a raça {state.breedSelected?.name}</Text>
                <Button onPress={() => handleOnRemoveBreedButtonPress(state.breedSelected?.id)}>
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
