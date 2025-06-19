import React, { useState } from 'react';
import { ScrollView, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // corregida esta línea
import {CrearEquipoStyles}  from '../styles/WindowStyle';


export default function CrearEquipoScreen({ navigation, route }) {
  const { tipo } = route.params; // recibe el tipo: "Club" o "Selección"

  const [nombre, setNombre] = useState('');
  const [pais, setPais] = useState('');
  const [estadio, setEstadio] = useState('');
  const [logo, setLogo] = useState('');
  const [ranking, setRanking] = useState('');

  const guardarEquipo = async () => {
    if (!nombre.trim() || !pais.trim() || !estadio.trim() || !ranking.trim()) {
      Alert.alert('Error', 'Por favor ingresa todos los campos obligatorios');
      return;
    }

    const rankingNumber = parseInt(ranking);
    if (isNaN(rankingNumber) || rankingNumber < 0) {
      Alert.alert('Error', 'El ranking debe ser un número válido');
      return;
    }

    try {
      await addDoc(collection(db, 'equipos'), {
        nombre,
        tipo,
        pais,
        estadio,
        logo,
        ranking: rankingNumber,
        fechaRegistro: new Date()
      });

      Alert.alert('Éxito', 'Equipo registrado correctamente');
      setNombre('');
      setPais('');
      setEstadio('');
      setLogo('');
      setRanking('');
      navigation.goBack();
    } catch (error) {
      console.error('Error al guardar el equipo: ', error);
      Alert.alert('Error', 'No se pudo guardar el equipo');
    }
  };

  return (
    <ScrollView contentContainerStyle={CrearEquipoStyles.container}>
      <Text style={CrearEquipoStyles.titulo}>Registrar nuevo equipo - {tipo}</Text>

      <TextInput
        placeholder="Nombre del equipo"
        value={nombre}
        onChangeText={setNombre}
        style={CrearEquipoStyles.input}
      />

      <TextInput
        placeholder="País"
        value={pais}
        onChangeText={setPais}
        style={CrearEquipoStyles.input}
      />

      <TextInput
        placeholder="Estadio"
        value={estadio}
        onChangeText={setEstadio}
        style={CrearEquipoStyles.input}
      />

      <TextInput
        placeholder="URL del logo (opcional)"
        value={logo}
        onChangeText={setLogo}
        style={CrearEquipoStyles.input}
      />

      <TextInput
        placeholder="Ranking (ej. 85)"
        value={ranking}
        onChangeText={setRanking}
        keyboardType="numeric"
        style={CrearEquipoStyles.input}
      />

      <Button title="Guardar Equipo" onPress={guardarEquipo} />
    </ScrollView>
  );
}


