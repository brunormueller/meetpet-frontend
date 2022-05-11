import React from 'react';
import {
    StyleSheet,
} from 'react-native';
import {
    Divider as KittenDivider,
    List as KittenList,
    ListItem as KittenListItem,
} from '@ui-kitten/components';

const data = new Array(20).fill({
    title: 'Item',
    description: 'Description for Item',
});

const List = () => {
    const renderItem = ({ item, index }) => (
        <KittenListItem
            title={`${item.title} ${index + 1}`}
            description={`${item.description} ${index + 1}`}
        />
    );

    return (
        <KittenList
            data={data}
            ItemSeparatorComponent={KittenDivider}
            renderItem={renderItem}
        />
    );
};

export default List;
