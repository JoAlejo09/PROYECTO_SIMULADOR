import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function EditorTipoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editor de Equipos</Text>

      <Button
        title="Editar Clubes"
        onPress={() => navigation.navigate('EditorEquipos', { tipo: 'Club' })}
      />

      <View style={styles.spacer} />

      <Button
        title="Editar Selecciones"
        onPress={() => navigation.navigate('EditorEquipos', { tipo: 'Selección' })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 40 },
  spacer: { height: 20 }
});
