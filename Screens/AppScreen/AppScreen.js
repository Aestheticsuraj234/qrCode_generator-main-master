import { Pressable, StyleSheet, Text, TextInput, View, ScrollView, RefreshControl, Platform } from 'react-native';
import QRCodeComponent from '../../Components/QRCodeComponent';
import { useContext, useState, useCallback, useEffect } from 'react';
import { QrCodeContext } from '../../context/QrCodeContext'
import { useNavigation } from '@react-navigation/native';

export default function AppScreen() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const { saveQRCode, QR, setQR, setQRref, generateAppQRCode } = useContext(QrCodeContext);
  const [androidLink, setAndroidLink] = useState('');
  const [iosLink, setIosLink] = useState('');
  const [defaultLink, setDefaultLink] = useState('');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    setAndroidLink('');
    setIosLink('');
    setDefaultLink('');
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Clear the QR code when the screen comes into focus
      setQR('');
    });
    return unsubscribe;
  }, [navigation]);


  const handleAppGenerateQRCode = () => {

    if(!androidLink || !iosLink || !defaultLink ){
      alert('Please fill all fields to generate QR code');
      return;
    }
    let qrCodeValue = defaultLink;
    if (Platform.OS === 'ios' && iosLink) {
      qrCodeValue = iosLink;
    
    } else if (Platform.OS === 'android' && androidLink) {
      qrCodeValue = androidLink;
    }
    generateAppQRCode(qrCodeValue);
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}><Text style={styles.icon}>QR</Text> Code Generator</Text>
        <View style={styles.field}>
          <TextInput
            style={styles.input}
            cursorColor={'blueviolet'}
            selectionColor={'blueviolet'}
            value={androidLink}
            onChangeText={setAndroidLink}
            placeholder='Android-app-link'
          />
          <TextInput
            style={styles.input}
            cursorColor={'blueviolet'}
            selectionColor={'blueviolet'}
            value={iosLink}
            onChangeText={setIosLink}
            placeholder='iOS-app-link'
          />
          <TextInput
            style={styles.input}
            cursorColor={'blueviolet'}
            selectionColor={'blueviolet'}
            value={defaultLink}
            onChangeText={setDefaultLink}
            placeholder='Default-app-link'
          />

          <Pressable onPress={handleAppGenerateQRCode}>
            <Text style={styles.button}>Generate</Text>
          </Pressable>
        </View>


        <View style={styles.qr}>
          <Pressable onPress={saveQRCode}>
            {QR && <QRCodeComponent size={240} logoSize={100} qrCodeValue={QR} getRef={setQRref} backgroundColor="#fff" />}
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
    flexDirection: "column",
    marginBottom: 30,
    gap: 30,
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
  }

});
