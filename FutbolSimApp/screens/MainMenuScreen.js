import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

export default function MainMenuScreen({ navigation }) {
  const salir = () => {
    Alert.alert("Salir", "Gracias por usar la app. Cierra la app manualmente.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏟️ Menú Principal</Text>

      <View style={styles.buttonContainer}>
        <Button title="Torneo" onPress={() => navigation.navigate('TorneoTipo')} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Equipos" onPress={() => navigation.navigate('Equipos')} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Salir" onPress={salir} color="#d11a2a" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 40 },
  buttonContainer: { marginVertical: 10, width: '60%' }
});
