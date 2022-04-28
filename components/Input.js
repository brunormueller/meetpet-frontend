import React, {
    forwardRef,
    useImperativeHandle,
    useState,
} from 'react';
import {
    Input as KittenInput,
} from '@ui-kitten/components';

const Input = forwardRef((props, ref) => {
    const {
        defaultValue
    } = props;

    const [value, setValue] = useState(defaultValue || '');

    const getValue = () => {
        return value;
    };

    useImperativeHandle(ref, () => ({
        getValue,
    }));

    return (
        <KittenInput
            {...props}
            value={value}
            onChangeText={nextValue => setValue(nextValue)}
        />

    );
});

export default Input;
