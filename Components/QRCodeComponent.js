import React from 'react';
import { View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeComponent = ({  qrCodeValue, size, color, backgroundColor, logo, logoSize, logoBackgroundColor, logoMargin, logoBorderRadius, quietZone, enableLinearGradient , gradientDirection, linearGradient, getRef, ecl, onError }) => {
    return (
        <View style={styles.container}>
            <QRCode
              // add key prop with value of QR
                value={qrCodeValue}
                size={size}
                color={color}
                backgroundColor={backgroundColor}
                logo={logo}
                logoSize={logoSize}
                logoBackgroundColor={logoBackgroundColor}
                logoMargin={logoMargin}
                logoBorderRadius={logoBorderRadius}
                quietZone={quietZone}
                getRef={getRef}
                ecl={ecl}
                onError={onError}
                enableLinearGradient={enableLinearGradient}
                gradientDirection={gradientDirection}
                linearGradient={linearGradient}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default QRCodeComponent;
