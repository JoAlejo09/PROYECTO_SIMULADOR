import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

export default function EditorJugadoresScreen({ route, navigation }) {
  const { equipoId, nombreEquipo } = route.params;
  const [jugadores, setJugadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resumenPosiciones, setResumenPosiciones] = useState({
    portero:0,
    defensa:0,
    mediocampista:0,
    delantero:0,
  });

  useFocusEffect(
    useCallback(() => {
      const cargarJugadores = async () => {
        setLoading(true);
        try {
          const q = query(collection(db, 'jugadores'), where('equipoId', '==', equipoId));
          const snapshot = await getDocs(q);
          const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setJugadores(lista);
          const resumen = {
            portero:0,
            defensa:0,
            mediocampista:0,
            delantero:0
          };
          lista.forEach(jugador =>{
            const pos = jugador.posicion?.toLowerCase();
            if (pos.includes('portero')) resumen.portero++;
            else if (pos.includes('defensa')) resumen.defensa++;
            else if (pos.includes('mediocampista')) resumen.mediocampista++;
            else if (pos.includes('delantero')) resumen.delantero++;
          });
          setResumenPosiciones(resumen);
        } catch (error) {
          console.error('Error al cargar jugadores:', error);
        }
        setLoading(false);
      };
      cargarJugadores();
    }, [equipoId])
  );

/*  useEffect(() => {
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
  }, [equipoId]);*/

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
  const cumpleRequisitos = () =>
  {
    return(
    jugadores.length >= 16 &&
    resumenPosiciones.portero >= 1 &&
    resumenPosiciones.defensa >= 4 &&
    resumenPosiciones.mediocampista >= 4 &&
    resumenPosiciones.delantero >= 4
    );
  };
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

        <View style={styles.validacion}>
          <Text>✅ Formación mínima requerida:</Text>
          <Text style={getStyle(resumenPosiciones.portero >= 1)}>
            Porteros: {resumenPosiciones.portero} / 1 mínimo
          </Text>
          <Text style={getStyle(resumenPosiciones.defensa >= 4)}>
            Defensas: {resumenPosiciones.defensa} / 4 mínimo
          </Text>
          <Text style={getStyle(resumenPosiciones.mediocampista >= 4)}>
            Mediocampistas: {resumenPosiciones.mediocampista} / 4 mínimo
          </Text>
          <Text style={getStyle(resumenPosiciones.delantero >= 4)}>
            Delanteros: {resumenPosiciones.delantero} / 4 mínimo
          </Text>
        </View>

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

        <View style={{ marginTop: 20 }}>
          <Button title="Agregar jugador" onPress={irACrearJugador} />
        </View>

        <View style={{ marginTop: 20 }}>
          <Button
            title="Continuar con este equipo"
            onPress={() => {
              if (cumpleRequisitos()) {
                Alert.alert('Equipo válido', 'Puedes continuar.');
                // navigation.navigate('SimularPartido', { equipoId });
              } else {
                Alert.alert(
                  'Equipo incompleto',
                  'Este equipo no cumple con los requisitos mínimos para participar (mínimo 16 jugadores y formación completa).'
                );
              }
            }}
            color={cumpleRequisitos() ? 'green' : 'gray'}
            disabled={!cumpleRequisitos()}
          />
        </View>
      </>
    )}
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
  detalle: { fontSize: 14, color: '#555' },
  validacion: {
  marginVertical: 10
  }
});

const getStyle = (cumple) =>({
  color: cumple ? 'green' : 'red',
  fontWeight: 'bold'
});

