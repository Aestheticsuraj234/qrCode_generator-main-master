import { StyleSheet, Text, View, TextInput, Pressable, ScrollView, RefreshControl } from 'react-native';
import React, { useContext, useState, useCallback, useEffect } from 'react';
import QRCodeComponent from '../../Components/QRCodeComponent';
import { QrCodeContext } from '../../context/QrCodeContext';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'MAIL_QR_CODE';

const MailScreen = () => {
    const navigation = useNavigation();
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [qrCodeValue, setQRCodeValue] = useState(null);

   
    const { generateMailQRCode, saveQRCode, QR, setQRref, setQR } = useContext(QrCodeContext);

    const isFocused = useIsFocused();

    const handleGenerateQRCode = () => {
        if (!recipient || !subject || !body) {
            alert('Please fill all fields to generate QR code');
            return;
        }
        const emailContent = `mailto:${recipient}?subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(body)}`;
        const qrCode = generateMailQRCode(emailContent);
        setQRCodeValue(qrCode);
        if (qrCode) {
            AsyncStorage.setItem(STORAGE_KEY, qrCode); // Save the QR code in storage
        } else {
            AsyncStorage.removeItem(STORAGE_KEY); // Remove the QR code from storage if qrCode is null or undefined
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
        setRecipient("");
        setSubject("");
        setBody("");
        setQR("");
        setQRCodeValue(null);
        AsyncStorage.removeItem(STORAGE_KEY); // Remove the QR code from storage
    }, []);

    useEffect(() => {
        if (isFocused) {
            AsyncStorage.getItem(STORAGE_KEY).then(qrCode => setQRCodeValue(qrCode)); // Retrieve the QR code from storage
        }
    }, [isFocused]);

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }

        >
            <View style={styles.mainContainer}>
                {/* QR Code */}
                {QR && isFocused && (
                    <View style={styles.qr}>
                        <Pressable onPress={saveQRCode}>
                            <QRCodeComponent key={QR} size={140} logoSize={100} qrCodeValue={QR} getRef={setQRref} backgroundColor="#fff" />
                        </Pressable>
                    </View>
                )}
                {QR && isFocused && <Text onPress={() => navigation.navigate('Edit-QR')} style={{ color: 'green', fontWeight: 'bold', paddingVertical: 20 }}>Edit QR</Text>}

                {QR && isFocused && <Text style={styles.instraction}>Click The <Text style={styles.instraicon}>QR</Text> Code to save it</Text>}

                {/* Form Container */}
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setRecipient}
                        placeholder="Recipient"
                        value={recipient}
                        cursorColor={'#616161'}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setSubject}
                        placeholder="Subject"
                        value={subject}
                        cursorColor={'#616161'}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setBody}
                        placeholder="Body"
                        value={body}
                        cursorColor={'#616161'}
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

export default MailScreen;


const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#ecf2ff',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    input: {
        height: 69,
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