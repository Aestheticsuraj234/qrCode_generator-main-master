import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Logo from './subScreens/Logo';
import Colors from './subScreens/Colors';

const Tab = createMaterialTopTabNavigator();

function EditScreen() {
  return (
    <Tab.Navigator
    
    initialRouteName="Logo"
    screenOptions={{
      tabBarActiveTintColor: '#fff',
      tabBarLabelStyle: { fontSize: 12 , fontWeight:'bold' , textAlign:'center',justifyContent:"center", alignItems:'center'},
      tabBarStyle: { backgroundColor: '#7286d3' },
    }}
    >
  
      <Tab.Screen name="Logo" component={Logo} />
      <Tab.Screen name="Colors" component={Colors} />
    </Tab.Navigator>
  );
}

export default EditScreen;
