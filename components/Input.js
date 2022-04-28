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
    const [valid, setValid] = useState(true);

    const getValue = () => {
        return value;
    };

    const handleOnChangeText = nextValue => {
        if (!valid) {
            setValid(true);
        }

        setValue(nextValue);
    }

    useImperativeHandle(ref, () => ({
        getValue,
        setValid,
    }));

    return (
        <KittenInput
            {...props}
            value={value}
            status={valid ? 'basic' : 'danger'}
            caption={valid ? null : 'Campo obrigatório'}
            onChangeText={handleOnChangeText}
        />

    );
});

export default Input;
