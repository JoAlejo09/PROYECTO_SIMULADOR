import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Asegúrate de que la ruta sea correcta

export default function CrearTorneoScreen({ route, navigation }) {
  const { tipo } = route.params; // tipo puede ser 'Clubes' o 'Selecciones'

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const guardarTorneo = async () => {
    if (!nombre) {
      Alert.alert('Error', 'Debes ingresar un nombre para el torneo');
      return;
    }

    try {
      await addDoc(collection(db, 'torneos'), {
        nombre,
        descripcion,
        tipo,
        fechaCreacion: Timestamp.now()
      });
      Alert.alert('Éxito', 'Torneo guardado correctamente');
      navigation.goBack(); // vuelve a la pantalla anterior
    } catch (error) {
      console.error('Error al guardar torneo:', error);
      Alert.alert('Error', 'No se pudo guardar el torneo');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Torneo - {tipo}</Text>

      <TextInput
        placeholder="Nombre del torneo"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />

      <TextInput
        placeholder="Descripción (opcional)"
        value={descripcion}
        onChangeText={setDescripcion}
        style={[styles.input, { height: 80 }]}
        multiline
      />

      <Button title="Guardar Torneo" onPress={guardarTorneo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 6
  }
});
