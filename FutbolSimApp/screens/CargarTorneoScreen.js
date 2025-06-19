import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CargarTorneoStyles } from '../styles/WindowStyle';

export default function CargarTorneoScreen({ route }) {
  const { tipo } = route.params;

  return (
    <View style={CargarTorneoStyles.container}>
      <Text style={CargarTorneoStyles.title}>📂 Cargar Torneo</Text>
      <Text>Tipo: {tipo}</Text>
      {/* Aquí podrías mostrar una lista de torneos guardados */}
    </View>
  );
}
