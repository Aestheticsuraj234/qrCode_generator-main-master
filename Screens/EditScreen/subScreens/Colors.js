import { StyleSheet, Text, View, Pressable, ScrollView, RefreshControl, Alert } from 'react-native';
import React, { useContext, useState, useCallback, useEffect } from 'react';
import QRCodeComponent from '../../../Components/QRCodeComponent';
import { QrCodeContext } from '../../../context/QrCodeContext';
import Toggle from 'react-native-toggle-input';
import { ColorPicker } from 'react-native-color-picker';
import Slider from '@react-native-community/slider';
import LinearDirection from '../../../Components/LinearDirection';
import { useNavigation } from '@react-navigation/native';


const Colors = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [isVisible, setIsvisible] = useState(false);
  const [isBgVisible, setIsBgvisible] = useState(false);
  const [isVisible1, setIsvisible1] = useState(false);
  const [isVisible2, setIsvisible2] = useState(false);

  const {
    setQRCodeLinearGradient,
    qrCodeColor,
    setQRCodeColor,
    saveQRCode,
    color1,
    color2,
    setColor1,
    setColor2,
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
    qrCodeLogo,
    setQRCodeEnableLinearGradient,
    setQRCodeBackgroundColor
  } = useContext(QrCodeContext);

  const navigation = useNavigation();
  const hasUnsavedChanges = Boolean([qrCodeEnableLinearGradient, qrCodeColor, qrCodeBackgroundColor]);


  useEffect(() => {
    setQRCodeLinearGradient([color1, color2]);
  }, [color1, color2]);


  useEffect(() => {
    if (qrCodeEnableLinearGradient) {
      setQRCodeEnableLinearGradient(false)
      setIsvisible1(false)
      setIsvisible2(false)
      setQRCodeBackgroundColor("#fff")
    }
    else {
      setQRCodeColor("#000")
      setQRCodeBackgroundColor("#fff")
    }
  }, []);

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          'Discard changes?',
          'You have unsaved changes. Are you sure to discard them and leave the screen?',
          [
            { text: "Don't leave", style: 'cancel', onPress: () => { } },
            {
              text: 'Discard',
              style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ]
        );
      }),
    [navigation, hasUnsavedChanges]
  );




  // function to handle the refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    setQR("");
    setColor1("");
    setColor2("");
  }, []);

  // function to handle toggle
  const toggletrue = () => {
    setQRCodeEnableLinearGradient(true)
    setIsvisible(false)
  }

  const toggleFalse = () => {
    setQRCodeEnableLinearGradient(false)
    setIsvisible1(false)
    setIsvisible2(false)
  }

  // function to handle colors
  const handleColor = () => {
    setIsvisible(!isVisible)
  }

  const handleColor1 = () => {
    setIsvisible1(!isVisible1)
  }

  const handleColor2 = () => {
    setIsvisible2(!isVisible2)
  }

  const handleBackgroundColor = () => {
    setIsBgvisible(!isBgVisible)
  }

  // function to update qrCodeLinearGradient state



  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }

    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        <View style={styles.UploadBox}>



          <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 10, flexDirection: 'column' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text style={styles.instraction}>
                <Text style={styles.instraicon}>Color Gradient</Text>
              </Text>

              {/* Pressable button for toggle */}
              <Toggle color={"#4C956e"}
                size={28}
                filled={true}
                circleColor={"yellow"}
                toggle={toggle}
                setToggle={setToggle}
                onTrue={toggletrue}
                onFalse={toggleFalse}
              />
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text style={styles.instraction}>
                <Text style={styles.instraicon}>BackgroundColor</Text>
              </Text>

              {/* Pressable button for toggle */}
              <Pressable style={{ height: 50, width: 50, backgroundColor: qrCodeBackgroundColor, borderColor: "#000", borderWidth: 2 }} onPress={handleBackgroundColor} >

              </Pressable>
            </View>
            {
              toggle &&
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text style={styles.instraction}>
                  <Text style={styles.instraicon}>Gradient Direction</Text>
                </Text>

                {/* Pressable button for toggle */}
                <LinearDirection />
              </View>
            }
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text style={styles.instraction}>
                <Text style={styles.instraicon}>Transpaernt Background</Text>
              </Text>

              {/* Pressable button for toggle */}
              <Toggle color={"#4C956e"}
                size={28}
                filled={true}
                circleColor={"yellow"}
                toggle={toggle2}
                setToggle={setToggle2}
                onTrue={() => setQRCodeBackgroundColor('#fff')}

              />
            </View>

          </View>

          {/* Render the components based on the toggle state */}
          {toggle ?

            (
              <>

                <Pressable style={{ height: 30, width: 30, position: 'absolute', right: 280, top: 68, backgroundColor: color1 }} onPress={handleColor1} ></Pressable>
                <Text style={{ fontSize: 16, position: 'absolute', right: 203, top: 68, fontWeight: 600, color: color1 }}>{color1}</Text>

                <Pressable style={{ height: 30, width: 30, position: 'absolute', right: 150, top: 68, backgroundColor: color2 }} onPress={handleColor2} ></Pressable>

                <Text style={{ fontSize: 16, position: 'absolute', right: 80, top: 68, fontWeight: 600, color: color2 }}>{color2}</Text>

              </>)
            : (
              <>
                <Pressable style={{ height: 30, width: 30, position: 'absolute', right: 280, top: 68, backgroundColor: qrCodeColor }} onPress={handleColor} ></Pressable>
                <Text style={{ fontSize: 16, position: 'absolute', right: 200, top: 68, fontWeight: 600, color: qrCodeColor }}>{qrCodeColor}</Text>
              </>
            )
          }

        </View>

        {/* Color picker container */}
        {isVisible &&
          <ColorPicker
            sliderComponent={Slider}
            onColorSelected={color => setQRCodeColor(color)}

            style={{ flex: 1, height: 300, width: 300, }}
          />}
        {isBgVisible &&
          <ColorPicker
            onColorSelected={color => setQRCodeBackgroundColor(color)}
            sliderComponent={Slider}
            style={{ flex: 1, height: 300, width: 300, }}
          />}

        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
          {isVisible1 &&
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <ColorPicker
                sliderComponent={Slider}
                onColorSelected={(color) => {
                  setColor1(color);

                }}

                style={{ height: 180, width: 180, }}
              />
              <Text style={{ color: (color1), fontSize: 16 }}>{color1}</Text>
            </View>
          }
          {isVisible2 &&
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <ColorPicker
                sliderComponent={Slider}
                onColorSelected={(color) => {
                  setColor2(color);

                }}
                style={{ height: 180, width: 180, }}
              />
              <Text style={{ color: (color2), fontSize: 16 }}>{color2}</Text>
            </View>
          }
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
    height: 308,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 8,
    marginVertical: 8,
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

export default Colors;




