import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen  from './src/pages/splashScreen/SplashScreen';
import Home from './src/pages/Home/Home';
import CheckShipment from './src/pages/CheckShipment/CheckShipment';
import CreateShipment from './src/pages/CreateShipment/CreateShipment';
import ViewShipment from './src/pages/ViewShipment/ViewShipment';

import PaletsShipment from './src/pages/PaletsShipment/PaletsShipment';
import HojaCarga from './src/pages/HojaCarga/HojaCarga';



export type RootStackParamList = {
  Splash: undefined;
  Menu: undefined;
  CheckShipment: undefined;
  CreateShipment: undefined;
  ViewShipment: { id: number, facturado:string };
  PaletsShipment: { id: number, facturado:string };
  HojaCarga: { id: number }
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Menu" component={Home} />
        <Stack.Screen name="CheckShipment" component={CheckShipment} />
        <Stack.Screen name="CreateShipment" component={CreateShipment} />
        <Stack.Screen name="ViewShipment" component={ViewShipment} />
        <Stack.Screen name="PaletsShipment" component = {PaletsShipment} />
        <Stack.Screen name="HojaCarga" component = {HojaCarga} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;
