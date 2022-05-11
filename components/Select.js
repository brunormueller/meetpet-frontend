import React, {
    forwardRef,
    useImperativeHandle,
    useState,
} from 'react';
import {
    StyleSheet,
} from 'react-native';
import {
    IndexPath as KittenIndexPath,
    Layout as KittenLayout,
    Select as KittenSelect,
    SelectItem as KittenSelectItem,
} from '@ui-kitten/components';

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
});

const Select = forwardRef((props, ref) => {
    const {
        defaultValue,
        options,
    } = props;

    const defaultIndex = (options || []).findIndex(option => option.value == defaultValue);

    const [selectedIndex, setSelectedIndex] = useState(defaultIndex >= 0 ? new KittenIndexPath(defaultIndex) : null);
    const [valid, setValid] = useState(true);

    const getValue = () => {
        if (selectedIndex) {
            return options[selectedIndex.row].value;
        }

        return '';
    };

    const handleOnSelect = nextSelectedIndex => {
        if (!valid) {
            setValid(true);
        }

        setSelectedIndex(nextSelectedIndex);
    }

    useImperativeHandle(ref, () => ({
        getValue,
        setValid,
    }));

    return (
        <KittenLayout
            level='1'
            style={styles.container}
        >
            <KittenSelect
                {...props}
                value={selectedIndex ? options[selectedIndex.row].display : ''}
                selectedIndex={selectedIndex}
                status={valid ? 'basic' : 'danger'}
                caption={valid ? null : 'Campo obrigatório'}
                onSelect={handleOnSelect}
            >
                {(options || []).map((option, index) =>
                    <KittenSelectItem
                        key={index}
                        title={option.display}
                    />
                )}
            </KittenSelect>
        </KittenLayout >
    );
});

export default Select;
