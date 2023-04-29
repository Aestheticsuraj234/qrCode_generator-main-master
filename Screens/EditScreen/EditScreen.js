import React, { useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Logo from './subScreens/Logo';
import Colors from './subScreens/Colors';
import { backslashRegex } from 'vcard-generator/lib/util';

const Tab = createMaterialTopTabNavigator();

function EditScreen({ navigation }) {
  
  return (  
    <Tab.Navigator
      initialRouteName="Logo"
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold', textAlign: 'center', justifyContent: "center", alignItems: 'center' },
        tabBarStyle: { backgroundColor: '#7286d3' },
      }}
    >
      <Tab.Screen name="Logo" component={Logo} />
      <Tab.Screen name="Colors" component={Colors} />
    </Tab.Navigator>
  );
}

export default EditScreen;
