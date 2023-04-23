import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useContext } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { QrCodeContext } from '../context/QrCodeContext';

const data = [
    { label: 'NW to SE', value: ['0%', '0%', '100%', '100%'] },
    { label: 'SE to NW', value: ['100%', '100%', '0%', '0%'] },
    { label: 'NE to SW', value: ['0%', '100%', '100%', '0%'] },
    { label: 'SW to NE', value: ['100%', '0%', '0%', '100%'] },
];


const LinearDirection = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const {
        setQRCodeGradientDirection

    } = useContext(QrCodeContext);
    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: '#7286d3' }]}>

                </Text>
            );
        }
        return null;
    };

    return (
        <ScrollView style={styles.container}>
            {renderLabel()}
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: '#000' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={600}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : ''}
                searchPlaceholder="Search."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                    setQRCodeGradientDirection(item.value)
                }}
            />
        </ScrollView>
    );

}

export default LinearDirection

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});