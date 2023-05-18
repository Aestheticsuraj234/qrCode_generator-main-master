import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, Animated, Easing } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanningAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    (async () => {
      const cameraStatus = await BarCodeScanner.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);


    Alert.alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const handleCameraScan = () => {
    setScanned(false);
  };

  const handleGalleryScan = async () => {
    const imagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    };

    const result = await ImagePicker.launchImageLibraryAsync(imagePickerOptions);

    if (!result.canceled && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      const { uri } = selectedAsset;

      setScanned(true);
      Alert.alert(`QR code from gallery with uri ${uri} has been scanned!`);
    }
  };

  useEffect(() => {
    animateScanningEffect();
  }, []);

  const animateScanningEffect = () => {
    scanningAnimation.setValue(0);
    Animated.timing(scanningAnimation, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      if (!scanned) {
        animateScanningEffect();
      }
    });
  };

  const scanningAnimationStyle = {
    opacity: scanningAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.6],
    }),
    transform: [
      {
        translateY: scanningAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 50], // Adjust this value to control the vertical translation
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <Text>Requesting camera and gallery permissions...</Text>;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera or gallery</Text>;
  }

  if (scanned) {
    return (
      <>
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Scan complete!</Text>
          <Button title="Scan Again" onPress={handleCameraScan} />
        </View>
        <View style={styles.bottomContainer}>
          <Button title="Scan from Gallery" onPress={handleGalleryScan} />
        </View>
      </>
    );
  }


  return (
    <>
      <View style={styles.headingContainer}>
        <Text style={styles.Heading}>Scan Any Qr Code</Text>
      </View>

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[styles.barcode, StyleSheet.absoluteFillObject]}
      />

      <Animated.View style={[styles.scanningEffectContainer, scanningAnimationStyle]}>
        <MaterialIcons name="crop-free" size={80} color="#7286d3" />
      </Animated.View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity>
          <FontAwesome name="photo" size={24} color="#fff" style={{ margin: 2, padding: 2 }} onPress={handleGalleryScan} />

        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7286d3',
    elevation: 5,
    gap: 30,
  },
  Heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: 'white',
  },
  barcode: {
    height: '100%',
    width: '100%',
  },
  scanningEffectContainer: {
    top: '34%',
    left: '25%',
    width: '50%',
    position: 'absolute',
    height: '32%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderColor: '#7286d3',
    borderWidth: 4,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    zIndex: 1,
  },
  overlay: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    width: '80%',
    height: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: '#7286d3',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10
  },
});