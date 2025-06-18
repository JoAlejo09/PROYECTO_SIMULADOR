import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './screens/SplashScreen';
import MainMenuScreen from './screens/MainMenuScreen';
import TorneoTipoScreen from './screens/TorneoTipoScreen';
import EditorEquiposScreen from './screens/EditorEquiposScreen';
import CrearTorneoScreen from './screens/CrearTorneoScreen';
import CargarTorneoScreen from './screens/CargarTorneoScreen';
import TorneoOpcionesScreen from './screens/TorneoOpcionesScreen';
import VerTorneosScreen from './screens/VerTorneosScreen';
import CrearEquipoScreen from './screens/CrearEquipoScreen';
import CrearJugadorScreen from './screens/CrearJugadorScreen';

import EditorTipoScreen from './screens/EditorTipoScreen';
import EditorEquiposScreen from './screens/EditorEquiposScreen'; // la crearemos después
import EditorJugadoresScreen from './screens/EditorJugadoresScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="MainMenu" component={MainMenuScreen} />
        <Stack.Screen name="TorneoTipo" component={TorneoTipoScreen} />

        <Stack.Screen name="TorneoOpciones" component={TorneoOpcionesScreen} />
        <Stack.Screen name="CrearTorneo" component={CrearTorneoScreen} />
        <Stack.Screen name="CargarTorneo" component={CargarTorneoScreen} />

        <Stack.Screen name="VerTorneos" component={VerTorneosScreen} />
        <Stack.Screen name="CrearEquipo" component={CrearEquipoScreen}/>
        <Stack.Screen name="CrearJugador" component={CrearJugadorScreen} />

        <Stack.Screen name="EditorTipo" component={EditorTipoScreen} />
        <Stack.Screen name="EditorEquipos" component={EditorEquiposScreen} />
        <Stack.Screen name="EditorJugadores" component={EditorJugadoresScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
