import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Pressable, Image, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appFirebase from '../../credentials';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Colors from '../../globals/colors';

const auth = getAuth(appFirebase);

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle normal authentication 
    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            await AsyncStorage.setItem('userEmail', email);
            await AsyncStorage.setItem('userPassword', password);
            Alert.alert('Logging in', 'Accessing....');
            props.navigation.navigate('InitialScreen');
        } catch (error) {
            console.log("Error en login manual:", error);
            Alert.alert('Error!', 'Incorrect username or password');
        }
    };

    const checkBiometricSupport = async () => {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        console.log("¿Hardware biométrico disponible?:", compatible);

        const enrolled = await LocalAuthentication.isEnrolledAsync();
        console.log("¿Datos biométricos registrados?:", enrolled);

        if (!compatible) {
            Alert.alert("Error", "Biometric authentication is not supported on this device");
            return false;
        }
        if (!enrolled) {
            Alert.alert("Error", "No biometric records found. Please set up biometrics in your device settings.");
            return false;
        }
        return true;
    };

    // Handle biometric authentication
    const handleBiometricAuth = async () => {
        const supported = await checkBiometricSupport();
        if (!supported) return;

        try {
            console.log("Iniciando autenticación biométrica...");
            const { success, error } = await LocalAuthentication.authenticateAsync({
                promptMessage: "Authenticate with Biometrics",
                disableDeviceFallback: false, // Permitir fallback para depurar
                fallbackLabel: "Use Passcode",
            });

            if (success) {
                console.log("Autenticación biométrica exitosa");
                await autoLogin();
            } else {
                console.log("Fallo en autenticación. Error:", error);
                Alert.alert("Authentication Failed", `Please try again. Error: ${error}`);
            }
        } catch (err) {
            console.error("Error durante autenticación:", err);
            Alert.alert("Error", "Ocurrió un problema al autenticar.");
        }
    };

    const autoLogin = async () => {
        try {
            const storedEmail = await AsyncStorage.getItem('userEmail');
            const storedPassword = await AsyncStorage.getItem('userPassword');

            if (storedEmail && storedPassword) {
                await signInWithEmailAndPassword(auth, storedEmail, storedPassword);
                Alert.alert("Login Successful", "Welcome back!");
                props.navigation.navigate('InitialScreen');
            } else {
                Alert.alert("Error", "No credentials found. Please log in manually first.");
            }
        } catch (error) {
            console.error("Error durante auto login:", error);
            Alert.alert("Error", "Ocurrió un error al iniciar sesión.");
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View>
                <Image source={require('../../assets/img/FEXO LOGO-NO BACKGROUND.png')} style={styles.img}/>
            </View>

            <View>
                    <Text style={styles.title}>Login</Text>
                    <Text style={styles.subTitle}>Sign in to your account</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <View style={styles.textBox}>
                        <Ionicons name="mail-outline" size={20} color="#6c757d" style={styles.icon} />
                        <TextInput
                            placeholder="Email"
                            style={styles.input}
                            keyboardType="email-address"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                    <View style={styles.textBox}>
                        <Ionicons name="lock-closed-outline" size={20} color="#6c757d" style={styles.icon} />
                        <TextInput
                            placeholder="Password"
                            style={styles.input}
                            secureTextEntry
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>
                </View>

                <Pressable style={styles.pressed}>
                     <Text style={styles.pressedText2}>Don't have an account?   </Text> 
                     <Text style={styles.signUp}>Sign Up</Text>
                 </Pressable>

                <TouchableOpacity style={styles.btn} onPress={login}>
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={handleBiometricAuth}>
                    <Text style={styles.btnText}>Login with Biometrics</Text>
                </TouchableOpacity>
                <Pressable style={styles.pressed}>
                    <Text style={styles.pressedText}>Forgot Your password?</Text>
                </Pressable>
            </View>
        </View>
    );
}

// Estilos (sin cambios)
const styles = StyleSheet.create({
    img: {
        width: 350,
        height: 150,
        borderRadius: 50,
        alignItems: 'center'
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.fexoBlue,
    },
    title: {
        fontSize: 36,
        fontWeight: '700',
        textAlign: 'center',
        color: Colors.fexoWhite,
        marginBottom: 10
    },
    subTitle: {
        color: Colors.fexoWhite,
        marginBottom: 0,
        textAlign: 'center'
    },
    form: {
        margin: 20,
        // borderRadius: 35,
        borderColor: '#ced4da',
        borderWidth: 0,
        width: '95%',
        padding: 20,
        backgroundColor: 'transparent',
    },
    inputContainer: {
        borderRadius: 10, // Bordes redondeados solo en el exterior
        overflow: 'hidden', // Asegura que los hijos no sobresalgan del borde
    },
    textBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderColor: '#ced4da',
        borderWidth: 0.5,
        marginTop: -2,
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: Colors.fexoWhite,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: Colors.fexoBlue
    },
    btn: {
        padding: 12,
        borderRadius: 35,
        backgroundColor: Colors.fexoOrange,
        marginTop: 15,
        width: '100%',
        alignItems: 'center',
    },
    btnText: {
        fontWeight: 'bold',
        color: Colors.fexoWhite,
        fontSize: 16,
    },
    pressed: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5
    },
    pressedText: {
        color: Colors.fexoWhite,
        textDecorationLine: 'underline'
    },
    pressedText2: {
        marginTop: 0,
        color: Colors.fexoWhite,
    },
    signUp: {
        color: '#4D81E7',
    },
});