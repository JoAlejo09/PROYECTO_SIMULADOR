import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './screens/SplashScreen';
import MainMenuScreen from './screens/MainMenuScreen';
import TorneoTipoScreen from './screens/TorneoTipoScreen';
import EquiposScreen from './screens/EquiposScreen';
import CrearTorneoScreen from './screens/CrearTorneoScreen';
import CargarTorneoScreen from './screens/CargarTorneoScreen';
import TorneoOpcionesScreen from './screens/TorneoOpcionesScreen';
import VerTorneosScreen from './screens/VerTorneosScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="MainMenu" component={MainMenuScreen} />
        <Stack.Screen name="TorneoTipo" component={TorneoTipoScreen} />
        <Stack.Screen name="Equipos" component={EquiposScreen} />
        
        <Stack.Screen name="TorneoOpciones" component={TorneoOpcionesScreen} />
        <Stack.Screen name="CrearTorneo" component={CrearTorneoScreen} />
        <Stack.Screen name="CargarTorneo" component={CargarTorneoScreen} />

        <Stack.Screen name="VerTorneos" component={VerTorneosScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
