import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, RefreshControl } from 'react-native';
import React, { useContext, useState, useCallback , useEffect } from 'react';
import QRCodeComponent from '../../Components/QRCodeComponent';
import { QrCodeContext } from '../../context/QrCodeContext';
import { useNavigation } from '@react-navigation/native';

const ContactScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState("")
    const [organization, setOrganization] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [emailAddress, setEmailAddress] = useState("")
    const [address, setAddress] = useState("")
    const [street, setStreet] = useState("")
    const [pincode, setPincode] = useState("")

    const { generateContactQRCode, saveQRCode, QR, setQRref, setQR } = useContext(QrCodeContext);
    const [refreshing, setRefreshing] = useState(false);



    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
        setName("")
        setOrganization("")
        setMobileNumber("")
        setEmailAddress("")
        setAddress("")
        setStreet("")
        setPincode("")
        setQR("")

    }, []);


    const handleGenerateQRCode = () => {

        if (!name || !organization || !mobileNumber || !emailAddress || !address || !street || !pincode) {
            alert('Please fill all fields to generate QR code');
            return;
        }
        const vCardData = `BEGIN:VCARD
        VERSION:3.0
        N:${name};;;;
        ORG:${organization}
        TEL;TYPE=CELL:${mobileNumber}
        EMAIL:${emailAddress}
        ADR;TYPE=WORK:;;${address};${street};;${pincode};;;
        FN:${name}
        END:VCARD`;


        const vCardUrl = `data:text/vcard;base64,${vCardData}`;

        generateContactQRCode(vCardUrl);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Clear the QR code when the screen comes into focus
            setQR("");
        });

        return unsubscribe;
    }, [navigation]);



    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <View style={styles.mainContainer}>
                {/* QR Code */}
                {QR && (
                    <View style={styles.qr}>
                        <Pressable onPress={saveQRCode}>
                            <QRCodeComponent key={QR} size={140} logoSize={100} qrCodeValue={QR} getRef={setQRref} backgroundColor="#fff" />
                        </Pressable>
                    </View>
                )}
                {QR && <Text onPress={() => navigation.navigate('Edit-QR')} style={{ color: 'green', fontWeight: 'bold', paddingVertical: 20 }}>Edit QR</Text>}
                {QR && <Text style={styles.instraction}>Click The <Text style={styles.instraicon}>QR</Text> Code to save it</Text>}

                {/* Form Container */}
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        placeholder="Name"
                        value={name}
                        cursorColor={'#616161'}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setOrganization}
                        placeholder="Organization"
                        value={organization}
                        cursorColor={'#616161'}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setMobileNumber}
                        placeholder="Mobile Number"
                        value={mobileNumber}
                        cursorColor={'#616161'}
                        keyboardType={"numeric"}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmailAddress}
                        placeholder="Email"
                        value={emailAddress}
                        cursorColor={'#616161'}
                        keyboardType={"email-address"}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setAddress}
                        placeholder="Address"
                        value={address}
                        cursorColor={'#616161'}
                        keyboardType={"twitter"}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setStreet}
                        placeholder="Street"
                        value={street}
                        cursorColor={'#616161'}
                        keyboardType={"twitter"}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPincode}
                        placeholder="Pincode"
                        value={pincode}
                        cursorColor={'#616161'}
                        keyboardType='numeric'

                    />
                </View>

                {/* Button */}
                <Pressable style={styles.button} onPress={handleGenerateQRCode}>
                    <Text style={styles.text}>Generate</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default ContactScreen;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#ecf2ff',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    Banner: {
        height: 230,
        width: 230,
    },
    input: {
        height: 47,
        width: 290,
        borderRadius: 20,
        backgroundColor: '#fff',
        margin: 12,
        borderWidth: 0,
        padding: 10,
        color: '#616161',
        fontWeight: 'bold',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 12,
        paddingVertical: 20,
        width: 290,
        borderRadius: 20,
        elevation: 4,
        backgroundColor: '#7286d3',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    qr: {
        margin: 10,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        width: 150,
    },

    instraction: {
        marginTop: 40,
        color: "#adadad"
    },

    instraicon: {
        color: "#bf88f3"
    },


})