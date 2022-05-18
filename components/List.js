import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useState,
} from 'react';
import axios from 'axios';
import {
    Divider as KittenDivider,
    List as KittenList,
    ListItem as KittenListItem,
} from '@ui-kitten/components';

const List = forwardRef((props, ref) => {
    const {
        baseURL,
        accessoryRight,
        getTitle,
        getDescription,
    } = props;

    const [state, setState] = useState({
        loadData: true,
        rows: [],
    });

    const getData = useCallback(async () => {
        try {
            const { data } = await axios.get(baseURL);

            setState({
                loadData: false,
                rows: data,
            });
        } catch (error) {
            alert('Falha ao tentar carregar os dados');
        }
    }, [baseURL]);

    useEffect(() => {
        setTimeout(() => {
            if (state.loadData) {
                getData();
            }
        }, 0);
    }, [state.loadData, getData]);

    const renderItem = ({ item, index }) => (
        <KittenListItem
            key={index}
            title={getTitle(item)}
            description={getDescription(item)}
            accessoryRight={accessoryRight}
        />
    );

    useImperativeHandle(ref, () => ({
        getData,
    }));

    return (
        <KittenList
            data={state.rows}
            ItemSeparatorComponent={KittenDivider}
            renderItem={renderItem}
        />
    );
});

export default List;
