import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function TorneoTipoScreen({ navigation }) {
  const seleccionarTipo = (tipo) => {
    navigation.navigate('TorneoOpciones', { tipo });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚔️ Tipo de Torneo</Text>
      <Text style={styles.subtitle}>¿Qué tipo de torneo deseas?</Text>

      <View style={styles.buttonContainer}>
        <Button title="Torneo de Clubes" onPress={() => seleccionarTipo('clubes')} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Torneo de Selecciones" onPress={() => seleccionarTipo('selecciones')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 30 },
  buttonContainer: { marginVertical: 10, width: '70%' }
});
