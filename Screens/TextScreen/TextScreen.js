import { Pressable, StyleSheet, Text, TextInput, View, ScrollView, RefreshControl } from 'react-native';

import QRCodeComponent from '../../Components/QRCodeComponent';

import { useContext, useState, useCallback ,  useEffect } from 'react';
import { QrCodeContext } from '../../context/QrCodeContext'
import { useNavigation } from '@react-navigation/native';

export default function TextScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    setQR("")
    setText("")
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        // Clear the QR code when the screen comes into focus
        setQR("");
    });

    return unsubscribe;
}, [navigation]);

  const maxChars = 300;
  const {  
    text,
    saveQRCode,
    QR,
    setQRref,
    generateTextQRCode,
    setText,
    setQR,
    qrCodeSize,
   } = useContext(QrCodeContext)

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}><Text style={styles.icon}>QR</Text> Code Generator</Text>
        <View style={styles.field}>
          <TextInput style={styles.input} cursorColor={'blueviolet'} selectionColor={'blueviolet'} onChangeText={setText} placeholder='e.g Enter-Text' maxLength={maxChars} />
          <Pressable onPress={generateTextQRCode}>
            <Text style={styles.button}>Generate</Text>
          </Pressable>
        </View>
        <View style={styles.charCounter}>
          <Text style={{ color: text.length > maxChars ? 'red' : 'gray' }}>{text.length}/{maxChars}</Text>
        </View>


        <View style={styles.qr}>
          <Pressable onPress={saveQRCode}>
            {QR && <QRCodeComponent
            key={QR} 
            size={qrCodeSize} 
            qrCodeValue={QR} 
            getRef={setQRref} 
            backgroundColor={"#fff"}  
            />}
          </Pressable>
        </View>
        {QR && <Text onPress={() => navigation.navigate('Edit-QR')} style={{ color: 'green', fontWeight: 'bold', paddingVertical: 20 }}>Edit QR</Text>}
        {QR && <Text style={styles.instraction}>Click The <Text style={styles.instraicon}>QR</Text> Code to save it</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 40,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  icon: {
    color: "#7286D3"
  },

  field: {
    width: 400,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
    marginBottom: 30
  },

  input: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: 240,
    borderWidth: 1.5,
    marginRight: 10,
    borderRadius: 10,
    borderColor: "gray",
  },

  button: {
    padding: 12,
    borderRadius: 10,
    color: "white",
    backgroundColor: "#7286d3",
  },

  qr: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    width: 250,
  },

  instraction: {
    marginTop: 40,
    color: "#adadad"
  },

  instraicon: {
    color: "#bf88f3"
  },

  logoHolder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: "relative",
  },

  logo: {
    height: 40,
    width: 40,
    opacity: 0.3
  },
  charCounter: {
    position: 'relative',
    top: -28,
    left: 55,
    width: 100,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    marginLeft: 0,
  },

});
