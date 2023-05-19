import { Pressable, StyleSheet, Text, TextInput, View, ScrollView, RefreshControl, Platform, Alert } from 'react-native';
import QRCodeComponent from '../../Components/QRCodeComponent';
import { useContext, useState, useCallback, useEffect } from 'react';
import { QrCodeContext } from '../../context/QrCodeContext';
import { useNavigation } from '@react-navigation/native';
import { BottomSheet } from 'react-native-btr';
import { Entypo } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { SocialIcon } from 'react-native-elements';
import * as Sharing from 'expo-sharing';

export default function TextScreen() {
  const [visible, setVisible] = useState(false);
  const [isSharingInProgress, setIsSharingInProgress] = useState(false);

  const shareQrCode = async () => {
    // Function to share the QR code image to different platforms using expo sharing

    if (Platform.OS === 'android' && !isSharingInProgress) {
      // Check if the platform is android and sharing is not in progress
      try {

        setIsSharingInProgress(true); // Set the sharing in progress to true
        const qrCodePath = FileSystem.documentDirectory + 'QRCode.png';
        const options = {

          dialogTitle: 'Share QR Code',
          UTI: 'image/png',
        };
        await Sharing.shareAsync(qrCodePath, options); // Share the QR code image to different platforms    
      } catch (error) {
        Alert.alert('Error', error.message); // Alert the error message if there is an error
      } finally {
        setIsSharingInProgress(false); // Set the sharing in progress to false
      }
    } else {
      // If the platform is not android
      try {
        await Sharing.shareAsync(QRref.current); // Share the QR code image to different platforms
      } catch (error) {
        Alert.alert('Error', error.message); // Alert the error message if there is an error
      }

    }


    setVisible(!visible); // Set the visibility of the BottomSheet to false after sharing

  };

  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    setQR('');
    setText('');
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Clear the QR code when the screen comes into focus
      setQR('');
      setText('');
    });

    return unsubscribe;
  }, [navigation]);

  const maxChars = 300;
  const {
    text,
    saveQRCode,
    QR,
    QRref,
    setQRref,
    generateTextQRCode,
    setText,
    setQR,
    qrCodeSize,
  } = useContext(QrCodeContext);

  // function to handle share Qrcode image to different platforms using expo sharing


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
            onChangeText={setText}
            placeholder="e.g Enter-Text"
            maxLength={maxChars}
          />
          <Pressable onPress={generateTextQRCode}>
            <Text style={styles.button}>Generate</Text>
          </Pressable>
        </View>
        <View style={styles.charCounter}>
          <Text style={{ color: text.length > maxChars ? 'red' : 'gray' }}>
            {text.length}/{maxChars}
          </Text>
        </View>

        <View style={styles.qr}>
          <Pressable
            style={{ justifyContent: 'center', alignItems: 'center', gap: 12 }}
            onPress={saveQRCode}
          >
            {QR && (
              <>
                <QRCodeComponent
                  key={QR}
                  size={qrCodeSize}
                  qrCodeValue={QR}
                  getRef={setQRref}
                  backgroundColor={'#fff'}
                />

                <Entypo
                  name="share"
                  size={24}
                  color="white"
                  style={{
                    backgroundColor: '#7286d3',
                    padding: 10,
                    borderRadius: 50,
                    textAlign: 'center',
                  }}
                  onPress={shareQrCode}
                />
              </>
            )}
          </Pressable>
        </View>

        {QR && (
          <Text
            onPress={() => navigation.navigate('Edit-QR')}
            style={{ color: 'green', fontWeight: 'bold', paddingVertical: 20 }}
          >
            Edit QR
          </Text>
        )}
        {QR && <Text style={styles.instruction}>Click The <Text style={styles.icon}>QR</Text> Code to save it</Text>}
        <BottomSheet
          visible={visible}
          //setting the visibility state of the bottom shee
          onBackButtonPress={shareQrCode}
          //Toggling the visibility state on the click of the back botton
          onBackdropPress={shareQrCode}
        //Toggling the visibility state on the clicking out side of the sheet
        // Toggling the visibility state on clicking outside of the sheet
        >
          {/*Bottom Sheet inner View*/}
          <View style={styles.bottomNavigationView}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  padding: 20,
                  fontSize: 20,
                }}>
                Share Using
              </Text>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <SocialIcon
                  //Social Icon using react-native-elements
                  type="twitter"
                  //Type of Social Icon
                  onPress={() => {
                    //Action to perform on press of Social Icon
                    shareQrCode();
                    alert('twitter');
                  }}
                />
                <SocialIcon
                  type="gitlab"
                  onPress={() => {
                    shareQrCode();
                    alert('gitlab');
                  }}
                />
                <SocialIcon
                  type="medium"
                  onPress={() => {
                    shareQrCode();
                    alert('medium');
                  }}
                />
                <SocialIcon
                  type="facebook"
                  onPress={() => {
                    shareQrCode();
                    alert('facebook');
                  }}
                />
                <SocialIcon
                  type="instagram"
                  onPress={() => {
                    shareQrCode();
                    alert('instagram');
                  }}
                />
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <SocialIcon
                  type="facebook"
                  onPress={() => {
                    shareQrCode();
                    alert('facebook');
                  }}
                />
                <SocialIcon
                  type="instagram"
                  onPress={() => {
                    shareQrCode();
                    alert('instagram');
                  }}
                />
                <SocialIcon
                  type="gitlab"
                  onPress={() => {
                    shareQrCode();
                    alert('gitlab');
                  }}
                />
                <SocialIcon
                  type="twitter"
                  onPress={() => {
                    shareQrCode();
                    alert('twitter');
                  }}
                />
                <SocialIcon
                  type="medium"
                  onPress={() => {
                    shareQrCode();
                    alert('medium');
                  }}
                />
              </View>
            </View>
          </View>
        </BottomSheet>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  icon: {
    color: '#7286D3',
  },

  field: {
    width: 400,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 30,
  },

  input: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: 240,
    borderWidth: 1.5,
    marginRight: 10,
    borderRadius: 10,
    borderColor: 'gray',
  },

  button: {
    padding: 12,
    borderRadius: 10,
    color: 'white',
    backgroundColor: '#7286d3',
  },

  qr: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    width: 250,
  },

  instruction: {
    marginTop: 40,
    color: '#adadad',
  },

  logoHolder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
  },

  logo: {
    height: 40,
    width: 40,
    opacity: 0.3,
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
