import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function EditorJugadoresScreen({ route, navigation }) {
  const { equipoId, nombreEquipo } = route.params;
  const [jugadores, setJugadores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarJugadores = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'jugadores'), where('equipoId', '==', equipoId));
        const snapshot = await getDocs(q);
        const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setJugadores(lista);
      } catch (error) {
        console.error('Error al cargar jugadores:', error);
      }
      setLoading(false);
    };

    cargarJugadores();
  }, [equipoId]);

  const irACrearJugador = () => {
    navigation.navigate('CrearJugador', { equipoId, nombreEquipo });
  };
  const editarJugador = (jugador) =>{
    navigation.navigate('CrearJugador',{
        equipoId,
        nombreEquipo,
        jugador
    });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jugadores de {nombreEquipo}</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Text style={styles.contador}>
            Total: {jugadores.length} {jugadores.length < 16 ? '❌ (Mínimo 16 requerido)' : '✅'}
          </Text>

          <FlatList
            data={jugadores}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.item} onPress={() => editarJugador(item)}>
                <Text style={styles.nombre}>{item.nombre}</Text>
                <Text style={styles.detalle}>
                Posición: {item.posicion} | Dorsal: {item.dorsal} | Edad: {item.edad}
    </Text>
  </TouchableOpacity>
            )}
          />
        </>
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Agregar jugador" onPress={irACrearJugador} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  contador: { fontSize: 16, marginBottom: 15 },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 8,
    borderRadius: 6
  },
  nombre: { fontSize: 16, fontWeight: 'bold' },
  detalle: { fontSize: 14, color: '#555' }
});
