import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CargarTorneoScreen({ route }) {
  const { tipo } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📂 Cargar Torneo</Text>
      <Text>Tipo: {tipo}</Text>
      {/* Aquí podrías mostrar una lista de torneos guardados */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 }
});
