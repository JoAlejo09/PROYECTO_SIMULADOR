import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, Alert, ScrollView
} from 'react-native';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker'; // asegúrate de tener esto instalado

export default function CrearJugadorScreen({ navigation, route }) {
  const equipoIdFromRoute = route.params?.equipoId || '';
  const nombreEquipo = route.params?.nombreEquipo || null;

  const [equipos, setEquipos] = useState([]);
  const [equipoId, setEquipoId] = useState(equipoIdFromRoute);
  const [nombre, setNombre] = useState('');
  const [posicion, setPosicion] = useState('');
  const [edad, setEdad] = useState('');
  const [dorsal, setDorsal] = useState('');
  const [nacionalidad, setNacionalidad] = useState('');

  useEffect(() => {
    if (!equipoIdFromRoute) {
      const cargarEquipos = async () => {
        try {
          const snapshot = await getDocs(collection(db, 'equipos'));
          const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setEquipos(lista);
          if (lista.length > 0) {
            setEquipoId(lista[0].id);
          }
        } catch (error) {
          console.error('Error al cargar equipos:', error);
          Alert.alert('Error', 'No se pudieron cargar los equipos');
        }
      };
      cargarEquipos();
    }
  }, []);

  const guardarJugador = async () => {
    if (!nombre || !posicion || !edad || !dorsal || !nacionalidad || !equipoId) {
      Alert.alert('Campos incompletos', 'Por favor llena todos los campos');
      return;
    }

    try {
      await addDoc(collection(db, 'jugadores'), {
        nombre,
        posicion,
        edad: parseInt(edad),
        dorsal: parseInt(dorsal),
        nacionalidad,
        equipoId
      });
      Alert.alert('Éxito', 'Jugador registrado correctamente');
      navigation.goBack();
    } catch (error) {
      console.error('Error al guardar jugador:', error);
      Alert.alert('Error', 'No se pudo guardar el jugador');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Registrar jugador {nombreEquipo ? `para ${nombreEquipo}` : ''}
      </Text>

      {!equipoIdFromRoute && (
        <>
          <Text style={styles.label}>Equipo:</Text>
          <Picker
            selectedValue={equipoId}
            onValueChange={(value) => setEquipoId(value)}
            style={styles.picker}
          >
            {equipos.map((equipo) => (
              <Picker.Item key={equipo.id} label={equipo.nombre} value={equipo.id} />
            ))}
          </Picker>
        </>
      )}

      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Posición"
        value={posicion}
        onChangeText={setPosicion}
        style={styles.input}
      />
      <TextInput
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Dorsal"
        value={dorsal}
        onChangeText={setDorsal}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Nacionalidad"
        value={nacionalidad}
        onChangeText={setNacionalidad}
        style={styles.input}
      />

      <Button title="Guardar Jugador" onPress={guardarJugador} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  label: { marginBottom: 5 },
  picker: { height: 50, marginBottom: 15 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 6
  }
});
