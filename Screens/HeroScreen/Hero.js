import { StyleSheet, RefreshControl, Text, View, Image, ScrollView, Pressable } from 'react-native'
import { useCallback, useState } from 'react'
import { MaterialIcons, AntDesign, Entypo, FontAwesome, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const Hero = () => {
    const [refreshing, setRefreshing] = useState(false);

    const navigation = useNavigation();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    return (

        <ScrollView

            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} enabled={true} />
            }

        >
            <View style={styles.MainContainer}>
                {/* HeroBanner */}
                <View style={styles.heroContainer}>
                    <Image style={styles.Image} source={require('../../assets/Svg/Banner.png')} />
                </View>
                {/* Scanner */}
                <Pressable onPress={() => navigation.navigate('Scanner')} style={styles.ScannerBox}>
                    <MaterialIcons name="qr-code-scanner" size={38} color="#4d7bff" />
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#395365' }}>Scanner</Text>
                </Pressable>
                {/* Basic QR Codes */}
                <View>
                    <View>
                        <Text style={{
                            position: 'relative', right: -20
                            , fontWeight: 'bold', color: '#0a98ff'
                        }}>Basic QR Codes</Text>
                    </View>
                    <View style={styles.QRCategory}>
                        <Pressable onPress={() => navigation.navigate('URL-QR')} style={styles.CategoryBox}>
                            <AntDesign name="link" size={24} color="#0a60fe" />
                            <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#395365' }}>URL Qr</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('TEXT-QR')} style={styles.CategoryBox}>
                            <Entypo name="text-document-inverted" size={24} color="#d5236d" />
                            <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#395365' }}>Text</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('APP-QR')} style={styles.CategoryBox}>
                            <FontAwesome name="android" size={24} color="#488c12" />
                            <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#395365' }}>App</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('Mail-QR')} style={styles.CategoryBox}>
                            <Entypo name="mail" size={24} color="#ff2020" />
                            <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#395365' }}>Mail</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('Contact-QR')} style={styles.CategoryBox}>
                            <MaterialCommunityIcons name="contacts" size={24} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#395365' }}>Contact</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('Music-QR')} style={styles.CategoryBox}>
                            <MaterialIcons name="headset" size={24} color="#c856e4" />
                            <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#395365' }}>Mp3</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Social Media QR Codes  */}
                <View>
                    <View>
                        <Text style={{
                            position: 'relative', right: -20
                            , fontWeight: 'bold', color: '#0a98ff'
                        }}>Social Media QR Codes</Text>
                    </View>
                    <View style={styles.SocialCategory}>
                        <Pressable onPress={() => navigation.navigate('FB-QR')} style={styles.SocialCategoryBox}>
                            <AntDesign name="facebook-square" size={24} color="#4267B2" />
                            <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#395365' }}>Facebook</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('YT-QR')} style={styles.SocialCategoryBox}>
                            <AntDesign name="youtube" size={24} color="#f00000" />
                            <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#395365' }}>Youtube</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('INSTA-QR')} style={styles.SocialCategoryBox}>
                            <AntDesign name="instagram" size={24} color="#fcaf45" />
                            <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#395365' }}>Instagram</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('LinkedIN-QR')} style={styles.SocialCategoryBox}>
                            <AntDesign name="linkedin-square" size={24} color="#0077b5" />
                            <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#395365' }}>linkedIn</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('TW-QR')} style={styles.SocialCategoryBox}>
                            <Entypo name="twitter-with-circle" size={24} color="#1da1f2" />
                            <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#395365' }}>Twitter</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('WP-QR')} style={styles.SocialCategoryBox}>
                            <FontAwesome5 name="whatsapp-square" size={24} color="#47d923" />
                            <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#395365' }}>whatsapp</Text>
                        </Pressable>

                    </View>
                </View>
            </View>
        </ScrollView>

    )
}

export default Hero

const styles = StyleSheet.create({
    MainContainer: {
        marginHorizontal: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroContainer: {
        height: 250,
        width: 436,
        backgroundColor: '#7286d3',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Image: {
        height: 180,
        width: 200
    },
    ScannerBox: {
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
    CategoryBox: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        width: 90,
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
    SocialCategoryBox: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        width: 152,
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
    QRCategory: {
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        alignItems: "center",
        flexDirection: 'row'
    },
    SocialCategory: {
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        alignItems: "center",
        flexDirection: 'row'
    },

})