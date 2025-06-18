import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const equiposEjemplo = [
  { nombre: 'FC Barcelona', tipo: 'club' },
  { nombre: 'Real Madrid', tipo: 'club' },
  { nombre: 'Argentina', tipo: 'selección' },
  { nombre: 'Brasil', tipo: 'selección' }
];

export default function EquiposScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📋 Equipos Registrados</Text>
      {equiposEjemplo.map((equipo, index) => (
        <Text key={index} style={styles.equipo}>
          {equipo.nombre} ({equipo.tipo})
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  equipo: { fontSize: 16, marginVertical: 5 }
});
