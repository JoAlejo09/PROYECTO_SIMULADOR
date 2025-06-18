import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function EditorEquiposScreen({ route, navigation }) {
  const { tipo } = route.params;
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    const cargarEquipos = async () => {
      try {
        const q = query(collection(db, 'equipos'), where('tipo', '==', tipo));
        const snapshot = await getDocs(q);
        const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEquipos(lista);
      } catch (error) {
        console.error('Error al cargar equipos:', error);
      }
    };

    cargarEquipos();
  }, [tipo]);

  const irACrearEquipo = () => {
    navigation.navigate('CrearEquipo', { tipo });
  };

  const irAEditorJugadores = (equipoId, nombreEquipo) => {
    navigation.navigate('EditorJugadores', { equipoId, nombreEquipo });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Equipos - {tipo}</Text>

      <FlatList
        data={equipos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.equipo}
            onPress={() => irAEditorJugadores(item.id, item.nombre)}
          >
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.detalle}>País: {item.pais} | Ranking: {item.ranking}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Agregar nuevo equipo" onPress={irACrearEquipo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  equipo: {
    padding: 15,
    backgroundColor: '#f2f2f2',
    marginBottom: 10,
    borderRadius: 8
  },
  nombre: { fontSize: 16, fontWeight: 'bold' },
  detalle: { fontSize: 14, color: '#555' }
});
