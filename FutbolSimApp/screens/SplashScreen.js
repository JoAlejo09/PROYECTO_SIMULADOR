import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('MainMenu');
    }, 3000); // 3 segundos
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚽ FutbolSimApp</Text>
      <Text style={styles.subtitle}>Simulador de Partidos de Fútbol</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#0066cc' },
  subtitle: { fontSize: 18, marginTop: 10, color: '#555' }
});
