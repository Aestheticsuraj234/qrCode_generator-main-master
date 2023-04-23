import { useState, useCallback  } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './Screens/Authentication/SignUp/SignUp'
import Login from './Screens/Authentication/Login/Login'
import Hero from './Screens/HeroScreen/Hero'
import ScannerScreen from './Screens/Scanner/ScannerScreen'
import UrlScreen from './Screens/UrlScreen/UrlScreen'
import TextScreen from './Screens/TextScreen/TextScreen'
import MailScreen from './Screens/MailScreen/MailScreen'
import ContactScreen from './Screens/ContactScreen/ContactScreen'
import EditScreen from './Screens/EditScreen/EditScreen'
import { QrCodeProvider } from './context/QrCodeContext'
import AppScreen from './Screens/AppScreen/AppScreen';
import MusicScreen from './Screens/MusicScreen/MusicScreen';
import InstagramScreen from './Screens/InstagramScreen/InstagramScreen';
import LinkedInScreen from './Screens/LinkedInScreen/LinkedInScreen';
import TwitterScreen from './Screens/TwitterScreen/TwitterScreen';
import FacebookScreen from './Screens/FacebookScreen/FacebookScreen';
import WhatsAppScreen from './Screens/WhatsAppScreen/WhatsAppScreen';
import YoutubeScreen from './Screens/YoutubeScreen/YoutubeScreen';


const Stack = createNativeStackNavigator();
function App() {

  return (
    <QrCodeProvider>
      <NavigationContainer  >
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Hero} />
          <Stack.Screen name="Scanner" component={ScannerScreen} />
          <Stack.Screen name="URL-QR" component={UrlScreen} />
          <Stack.Screen name="TEXT-QR" component={TextScreen} />
          <Stack.Screen name="Mail-QR" component={MailScreen} />
          <Stack.Screen name="Contact-QR" component={ContactScreen} />
          <Stack.Screen name="APP-QR" component={AppScreen} />
          <Stack.Screen name="Music-QR" component={MusicScreen} />
          <Stack.Screen name="FB-QR" component={FacebookScreen} />
          <Stack.Screen name="INSTA-QR" component={InstagramScreen} />
          <Stack.Screen name="LinkedIN-QR" component={LinkedInScreen} />
          <Stack.Screen name="TW-QR" component={TwitterScreen} />
          <Stack.Screen name="WP-QR" component={WhatsAppScreen} />
          <Stack.Screen name="YT-QR" component={YoutubeScreen} />
          <Stack.Screen
            name="Edit-QR"
            component={EditScreen}
            options={{
              headerStyle: {
                backgroundColor: '#7286d3',
                elevation: 0,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QrCodeProvider>
  );
}

export default App;