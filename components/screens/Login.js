import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Pressable, Image, Alert, ImageBackground, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appFirebase from '../../credentials';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Colors from '../../globals/colors';
import { useNavigation } from '@react-navigation/native';
import SignUp from './SignUp';

const auth = getAuth(appFirebase);

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();

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

    const handleForgotPassword = () => {
        navigation.navigate('Step1');
    };
    
    const HandlerSignUp = () => {
        navigation.navigate('SignUp');
    };    

    return (
            <SafeAreaView style={{flex: 1}}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                >
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.mainContainer}>
                            <View>
                                <Image source={require('../../assets/img/FEXO-LOGO.jpg')} style={styles.img}/>
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
                                            secureTextEntry={!showPassword}
                                            value={password}
                                            onChangeText={(text) => setPassword(text)}
                                        />
                                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                            <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#6c757d" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.pressed}>
                                <Text style={styles.pressedText2}>Don't have an account?   </Text> 
                                <Pressable onPress={HandlerSignUp}>
                                        <Text style={styles.signUp}>Sign Up</Text>
                                </Pressable>
                                </View>

                                <TouchableOpacity style={styles.btn} onPress={login}>
                                    <Text style={styles.btnText}>Login</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} onPress={handleBiometricAuth}>
                                    <Text style={styles.btnText}>Login with Biometrics</Text>
                                </TouchableOpacity>
                                <Pressable style={styles.pressed} onPress={handleForgotPassword}>
                                    <Text style={styles.pressedText}>Forgot Your password?</Text>
                                </Pressable>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
    );
}

// Estilos (sin cambios)
const styles = StyleSheet.create({
    img: {
        width: 350,
        height: 150,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 20
    },
    background: {
        flex: 1,
        resizeMode: 'cover', // Asegura que la imagen cubra toda la pantalla
        justifyContent: 'center',
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.fexoWhite // Elimina el color de fondo
    },
    title: {
        fontSize: 36,
        fontWeight: '700',
        textAlign: 'center',
        color: Colors.fexoBlue,
        marginBottom: 10
    },
    subTitle: {
        color: Colors.fexoBlue,
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
        shadowOpacity: 0.3,
        // elevation: 4
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
        backgroundColor: "#ffffff",
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
        borderRadius: 20,
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
        color: Colors.fexoBlue,
        textDecorationLine: 'underline'
    },
    pressedText2: {
        marginTop: 0,
        color: Colors.fexoBlue,
    },
    signUp: {
        color:Colors.fexoBlue,
    },
});