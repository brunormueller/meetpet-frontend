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

    const errorMessage = props.errorMessage ? props.errorMessage : 'Campo obrigatório'
    const keyboardType = props.keyboardType ? props.keyboardType : 'text'

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
            caption={valid ? null : errorMessage}
            onChangeText={handleOnChangeText}
            keyboardType={keyboardType}
        />

    );
});

export default Input;
