import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert, TouchableOpacity } from 'react-native';
import Colors from '../../../globals/colors'; // Si ya tienes una paleta de colores
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function FPassword2({route}) {
    const { confirmation } = route.params;
    const [code, setCode] = useState(['', '', '', '', '', '']); // Guardar cada dígito por separado
    const inputs = useRef([]); // Usamos un array para almacenar las referencias a los TextInput
    const navigation = useNavigation();

    const handleInputChange = (text, index) => {
        const numericText = text.replace(/[^0-9]/g, '');
    
        const newCode = [...code];
        newCode[index] = numericText;
        setCode(newCode);
    
        // Si el texto es válido y no es el último campo, mover el enfoque al siguiente
        if (numericText.length === 1 && index < 5) {
            inputs.current[index + 1].focus();
        }
    };
    

    const handleSubmit = async () => {
        const fullCode = code.join('');
        if (fullCode.length !== 6) {
            Alert.alert('Error', 'Por favor ingresa un código de 6 dígitos');
            return;
        }
        try {
            await confirmation.confirm(fullCode);
            Alert.alert('Éxito', 'Código verificado correctamente');
            navigation.navigate('Step3'); // o a donde quieras ir después
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'El código es incorrecto o ha expirado');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={24} color={Colors.fexoBlue} />
            </TouchableOpacity>
            <Text style={styles.textForgot}>Forgot <Text style={styles.textPassword}>Password</Text></Text>
            <View style={styles.codeContainer}>
                {code.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.input}
                        value={digit}
                        onChangeText={(text) => handleInputChange(text, index)}
                        keyboardType="numeric"
                        maxLength={1}
                        textAlign="center"
                        ref={(el) => inputs.current[index] = el} // Asignamos el ref al input
                    />
                ))}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Text style={{ color: Colors.fexoGrey }}>Didn't get a code? </Text>
                <Pressable onPress={() => { }}>
                    <Text style={{ color: Colors.fexoOrange }}>Resend</Text>
                </Pressable>
            </View>

            <Text style={styles.verificationText}>This code will expired 10 minutes after this message. If you don't get a message.</Text>

            <Pressable style={styles.btnNext} onPress={handleSubmit}>
                <Text style={styles.btnText}>Next</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
    }, 
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    textForgot: {
        fontSize: 40,
        fontWeight: 'bold',
        color: Colors.fexoBlue,
        marginBottom: 30,
        textAlign: 'center',
    },
    textPassword: {
        color: Colors.fexoOrange,
    },
    verificationText: {
        textAlign: 'center',
        color: '#555',
        fontSize: 14,
        marginVertical: 30,
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '80%',
    },
    input: {
        width: 50,
        height: 70,
        borderColor: Colors.fexoBlue,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: 'white',
    },
    btnNext: {
        backgroundColor: Colors.fexoOrange,
        width: '100%',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
