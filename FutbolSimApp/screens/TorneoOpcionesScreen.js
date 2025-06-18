import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function TorneoOpcionesScreen({ route, navigation }) {
  const { tipo } = route.params;

  const crearTorneo = () => {
    // Aquí puedes luego pasar los datos necesarios
    navigation.navigate('CrearTorneo', { tipo });
  };

  const cargarTorneo = () => {
    navigation.navigate('CargarTorneo', { tipo });
  };
  const verTorneos = () =>{
    navigation.navigate('VerTorneos',{tipo});
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Opciones del Torneo</Text>
      <Text style={styles.subtitle}>
        Tipo seleccionado: {tipo === 'clubes' ? 'Torneo de Clubes' : 'Torneo de Selecciones'}
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="Crear Nuevo Torneo" onPress={crearTorneo} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Cargar Torneo Existente" onPress={verTorneos} />
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
