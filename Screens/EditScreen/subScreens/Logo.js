import { StyleSheet, Text, View, Pressable, Image, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useContext, useState, useCallback  , useEffect} from 'react';
import QRCodeComponent from '../../../Components/QRCodeComponent';
import { QrCodeContext } from '../../../context/QrCodeContext';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
const Logo = () => {
 
  const [refreshing, setRefreshing] = useState(false);
  const {

    qrCodeColor,
    setQRCodeColor,
    saveQRCode,
    QR,
    setQRref,
    qrCodeBackgroundColor,
    qrCodeEnableLinearGradient,
    qrCodeGradientDirection,
    qrCodeLinearGradient,
    setQR,
    qrCodeSize,
    qrCodeLogoSize,
    qrCodeLogoBackgroundColor,
    qrCodeLogoMargin,
    qrCodeLogoBorderRadius,
    qrCodeLogo, setQRCodeLogo,

  } = useContext(QrCodeContext);

  const onRefresh = useCallback(() => {

    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);

    setQRCodeLogo("")
    setQR("")

  }, []);



  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedAsset = result.assets[0];

      // Encode the image in base64
      const base64 = await FileSystem.readAsStringAsync(selectedAsset.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Save the encoded image to the state
      setQRCodeLogo(`data:image/png;base64,${base64}`);

      const info = await FileSystem.getInfoAsync(
        FileSystem.documentDirectory + 'logo.png'
      );
      if (info.exists) {
        await FileSystem.deleteAsync(FileSystem.documentDirectory + 'logo.png');
      }

      // Save the encoded image to the file system
      await FileSystem.writeAsStringAsync(
        FileSystem.documentDirectory + 'logo.png',
        base64,
        {
          encoding: FileSystem.EncodingType.Base64,
        }
      );
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }

    >
      <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
        <View style={styles.UploadBox}>
          {/* Upload logo into view */}
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
            {qrCodeLogo ? (
              <Image source={{ uri: qrCodeLogo }} style={{ width: 100, height: 100 }} />
            ) : (
              <>
                <AntDesign name="upload" size={30} color="green" />
                <Text style={styles.instraction}>
                  Click The <Text style={styles.instraicon}>Icon</Text>
                </Text>
              </>
            )}
          </View>
          {/* Pressable button for upload */}
          <Pressable style={styles.button} onPress={pickImage}>
            <Text style={styles.text}>Upload</Text>
          </Pressable>
        </View>

        {/* QRCODE Components */}
        <View style={styles.qr}>
          <Pressable>
            {QR && <QRCodeComponent
              color={qrCodeColor}
              size={qrCodeSize}
              logo={qrCodeLogo}
              logoSize={qrCodeLogoSize}
              qrCodeValue={QR}
              getRef={setQRref}
              backgroundColor={qrCodeBackgroundColor}
              logoBackgroundColor={qrCodeLogoBackgroundColor}
              logoMargin={qrCodeLogoMargin}
              logoBorderRadius={qrCodeLogoBorderRadius}
              enableLinearGradient={qrCodeEnableLinearGradient}
              gradientDirection={qrCodeGradientDirection}
              linearGradient={qrCodeLinearGradient}
            />}
          </Pressable>
        </View>
        {QR &&
          <Pressable style={styles.button} onPress={saveQRCode} >
            <Text style={styles.text}>Download</Text>
          </Pressable>
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  qr: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  UploadBox: {
    flex: 1,
    flexDirection: 'row',
    height: 108,
    alignItems: 'center',
    justifyContent: 'center',
    width: 320,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 7,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 12,
    paddingVertical: 8,
    width: 120,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: '#7286d3',
    margin: 10
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  instraction: {
    color: 'gray',
  },
  instraicon: {
    fontWeight: 'bold',
    color: 'black',
  },


});

export default Logo;




