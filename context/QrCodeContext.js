import { createContext, useEffect, useState } from 'react'
import { Platform } from 'react-native';
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import Toast from 'react-native-root-toast';
export const QrCodeContext = createContext()
export const QrCodeProvider = ({ children }) => {
  // Url Screen
  const [QR, setQR] = useState(null);
  const [input, setInput] = useState("");
  const [QRref, setQRref] = useState();
  const [hasPermissions, setHasPermissions] = useState(false);
  // TextScreeen
  const [text, setText] = useState("");
  // !-------------State-Variables-for-EDIT-SCREEN
  const [qrCodeSize, setQRCodeSize] = useState(200);
  const [color1, setColor1] = useState('#2900ff');
  const [color2, setColor2] = useState('#ff9400');
  const [qrCodeColor, setQRCodeColor] = useState('#000');
  const [qrCodeBackgroundColor, setQRCodeBackgroundColor] = useState('#fff');
  const [qrCodeLogo, setQRCodeLogo] = useState(null);
  const [qrCodeLogoSize, setQRCodeLogoSize] = useState(50);
  const [qrCodeLogoBackgroundColor, setQRCodeLogoBackgroundColor] = useState(qrCodeBackgroundColor);
  const [qrCodeLogoMargin, setQRCodeLogoMargin] = useState(6);
  const [qrCodeLogoBorderRadius, setQRCodeLogoBorderRadius] = useState(3);
  const [qrCodeQuietZone, setQRCodeQuietZone] = useState(10);
  const [qrCodeEnableLinearGradient, setQRCodeEnableLinearGradient] = useState(false);
  const [qrCodeGradientDirection, setQRCodeGradientDirection] = useState(['10%', '90%', '0', '0']);
  const [qrCodeLinearGradient, setQRCodeLinearGradient] = useState([color1, color2]);
  // !App link 

  const [musicLink, setMusicLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [whatsAppLink, setWhatsAppLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  // !-----------For-Generating-Url -------------------
  const generateQRCode = () => {
    if (!input) {
      alert('Please fill Empty Field to generate QR code')
      return;
    }
    else {
      setQR(input)
    }
  }

  // !-----------For-Generating-Text -------------------
  const generateTextQRCode = () => {
    if (!text) {
      alert('Please fill Empty Field to generate QR code');
      return;

    }
    setQR(text)
  }

  // !-----------For Generating mail -------------------
  const generateMailQRCode = (emailContent) => {

    setQR(emailContent);

  };


  // !-----------For-Generating-Vcard -------------------
  const generateContactQRCode = (vcard) => {
    setQR(vcard)
  };

  // !-----------For-Generating-App -------------------
  const generateAppQRCode = (qrCodeValue) => {

    setQR(qrCodeValue);

  };

  // !-----------For-Generating-musicLink -------------------
  const generateMusicQRCode = () => {

    setQR(musicLink)
  };


  const generateFbQRCode = () => {

    setQR(facebookLink)
  };
  const generateYTQRCode = () => {

    setQR(youtubeLink)
  };
  const generateWPQRCode = () => {

    setQR(whatsAppLink)
  };
  const generateTWQRCode = () => {

    setQR(twitterLink)
  };
  const generateINSTAQRCode = () => {

    setQR(instagramLink)
  };
  const generateLinkedInQRCode = () => {

    setQR(linkedIn)
  };

  const navigateToEdit = () => navigation.navigate('/Edit-QR')

  useEffect(() => {
    (async () => { setHasPermissions((await MediaLibrary.requestPermissionsAsync()).granted) })()
  }, [])


  // !-----------For-Clearing-QRcode-------------------
  const clearQRCode = () => {
    setQR(null);
  }

  // !-----------For-Saving-QRcode-------------------
  const saveQRCode = () => {
    if (!hasPermissions || !QRref) return

    QRref.toDataURL(async data => {
      const QRCodeImg = FileSystem.documentDirectory + "QRCode.png";
      await FileSystem.writeAsStringAsync(QRCodeImg, data, { encoding: FileSystem.EncodingType.Base64 })
      MediaLibrary.saveToLibraryAsync(QRCodeImg)
        .then(() => (Toast.show("QR Code saved to gallery", Toast.durations.LONG)))
        .catch(console.error)
    })

  }


  return (
    <QrCodeContext.Provider
      value={{
        clearQRCode,
        navigateToEdit,
        generateContactQRCode,
        text,
        saveQRCode,
        QR,
        setInput,
        setQRref,
        generateTextQRCode,
        setText,
        generateQRCode,
        generateMailQRCode,
        setQR,
        input,
        qrCodeSize,
        setQRCodeSize,
        qrCodeColor,
        setQRCodeColor,
        qrCodeBackgroundColor,
        setQRCodeBackgroundColor,
        qrCodeLogo, setQRCodeLogo,
        setQRCodeLogo,
        qrCodeLogoSize,
        setQRCodeLogoSize,
        qrCodeLogoBackgroundColor,
        setQRCodeLogoBackgroundColor,
        qrCodeLogoMargin,
        setQRCodeLogoMargin,
        qrCodeLogoBorderRadius,
        setQRCodeLogoBorderRadius,
        qrCodeQuietZone,
        setQRCodeQuietZone,
        qrCodeEnableLinearGradient,
        setQRCodeEnableLinearGradient,
        qrCodeGradientDirection,
        setQRCodeGradientDirection,
        qrCodeLinearGradient,
        qrCodeColor,
        setQRCodeLinearGradient,
        color1,
        color2,
        setColor1,
        setColor2,
        setQRCodeBackgroundColor,
        generateAppQRCode,
        musicLink, setMusicLink, generateMusicQRCode,
        facebookLink, setFacebookLink, generateFbQRCode,
        youtubeLink, generateYTQRCode, setYoutubeLink,
        whatsAppLink, setWhatsAppLink, generateWPQRCode,
        twitterLink, setTwitterLink, generateTWQRCode,
        instagramLink, setInstagramLink, generateINSTAQRCode,
        linkedIn, setLinkedIn, generateLinkedInQRCode,

      }}
    >
      {children}
    </QrCodeContext.Provider>
  )
}