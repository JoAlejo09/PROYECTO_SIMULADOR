import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function VerTorneosScreen({ navigation }) {
  const [torneos, setTorneos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerTorneos = async () => {
      try {
        const q = query(collection(db, 'torneos'), orderBy('fechaCreacion', 'desc'));
        const snapshot = await getDocs(q);

        const lista = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTorneos(lista);
      } catch (error) {
        console.error('Error al obtener torneos:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerTorneos();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        // más adelante puedes navegar a una pantalla de simulación
        navigation.navigate('SimularTorneo', { torneoId: item.id, datos: item });
      }}
    >
      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text style={styles.tipo}>{item.tipo}</Text>
      <Text style={styles.fecha}>
        {item.fechaCreacion?.toDate().toLocaleDateString() || ''}
      </Text>
    </TouchableOpacity>
  );

  if (cargando) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Torneos guardados</Text>
      <FlatList
        data={torneos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: 'center' }}>No hay torneos guardados.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  item: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 8
  },
  nombre: { fontSize: 18, fontWeight: 'bold' },
  tipo: { fontSize: 14, color: '#666' },
  fecha: { fontSize: 12, color: '#999' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
