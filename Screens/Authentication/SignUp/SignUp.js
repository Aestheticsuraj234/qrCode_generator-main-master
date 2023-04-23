import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
const SignUp = () => {
    const [text, onChangeText] = React.useState('');
    return (
        <View style={styles.mainContainer}>

            <Image
                style={styles.Banner}
                source={require('../../../assets/Svg/Signup_Svg.png')}

            />


            {/* Form COntainer */}

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    placeholder='Name'
                    value={text}
                    cursorColor={'#616161'}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    placeholder='Email'
                    value={text}
                    cursorColor={'#616161'}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    onChangeText={onChangeText}
                    value={text}
                    cursorColor={'#616161'}
                    secureTextEntry
                />
            </View>

            {/* Button */}
            <Pressable style={styles.button} onPress={() => console.warn("helo")}>
                <Entypo name="lock" style={{ marginHorizontal: 4 }} size={24} color="white" />
                <Text style={styles.text}>SignUp</Text>
            </Pressable>


            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                {/* Text for or */}
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#696666' }}>Or</Text>

                {/* Continue as a  Guest */}
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#696666' }}>Continue as <Text style={{ color: '#407BFF' }}>Guest</Text> </Text>

            </View>

        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({

    mainContainer: {
        backgroundColor: '#ecf2ff',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1

    },
    Banner: {
        height: 230,
        width: 230
    },
    input: {
        height: 69,
        width: 290,
        borderRadius: 20,
        backgroundColor: '#e3dffd',
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

})