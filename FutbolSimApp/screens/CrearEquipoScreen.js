import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Picker, ScrollView } from 'react-native';
import { collection, addDoc} from 'firebase/firestore';
import {db} from '../fire(baseConfig';

export default function CrearEquipoScreen({navigation}) {
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('Club');
    const [pais, setPais] = useState('');
    const [estadio, setEstadio] = useState('');
    const [logo, setLogo] = useState('');
    const [ranking, setRanking] = useState('');

    const guardarEquipo = async () => {
        if(!nombre.trim()|| !pais.trim()|| !estadio.trim() || !ranking.trim()){
            Alert.alert('Error','Porfavor ingrese todos los campos');
            return;
        }
        const rankingNumber = parseInt(ranking);
        if (isNaN(rankingNumber) || rankingNumber < 0) {
             Alert.alert('Error', 'El ranking debe ser un número válido');
            return;
        }

        try{
            await addDoc(collection(db,'equipos'),{
                nombre,
                tipo,
                pais,
                estadio,
                logo,
                ranking: rankingNumber,
                fechaRegistro: new Date()
            });

            Alert.alert('Exito', 'Equipo registrado correctamente');
            setNombre('')
            setPais('')
            setEstadio('')
            setLogo('')
            setRanking('')
            navigation.goBack();
        }catch(e){
            console.error('Error al guardar el equipo: ',error)
            Alert.alert('Error', 'No se pudo guardar el equipo')
        }
    };

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style= {styles.titulo}>Registrar equipo nuevo</Text>
            
            <TextInput 
            placeholder='Nombre del equipo' 
            value={nombre} 
            onChangeText={setNombre} 
            style={styles.input}
            />

            <TextInput
            placeholder="Tipo (Club o Selección)"
            value={tipo}
            onChangeText={setTipo}
            style={styles.input}
            />

            <TextInput
            placeholder="País"
            value={pais}
            onChangeText={setPais}
            style={styles.input}
            />

          <TextInput
            placeholder="Estadio"
            value={estadio}
            onChangeText={setEstadio}
            style={styles.input}
          />

         <TextInput
            placeholder="URL del logo (opcional)"
            value={logo}
            onChangeText={setLogo}
            style={styles.input}
        />

        <TextInput
            placeholder="Ranking (ej. 85)"
            value={ranking}
            onChangeText={setRanking}
            keyboardType="numeric"
            style={styles.input}
         />
         <Button title="Guardar Equipo" onPress={guardarEquipo} />
        </ScrollView>         
   );
}
const styles = StyleSheet.create({
    container: {padding:20},
    titulo: {fontSize: 22, fontWeight: 'bold', marginBottom: 20},
    input:{
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
        borderRadius:6
    }
});