import { StyleSheet } from "react-native";

const CargarTorneoStyles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 }
});
const CrearEquipoStyles = StyleSheet.create({
  container: { padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 6
  }
});
export {
    CargarTorneoStyles,
    CrearEquipoStyles
}