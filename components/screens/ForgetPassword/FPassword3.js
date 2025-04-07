import { React, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import Colors from '../../../globals/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useNavigation } from '@react-navigation/native';


export default function FPassword3() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState();
    const [passwordValid, setPasswordValid] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const navigation = useNavigation();

    const isPasswordValid = (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>\-_+=/\\[\]~`]/.test(password);
        const isLongEnough = password.length >= 8;
        return hasUppercase && hasNumber && hasSpecialChar && isLongEnough;
    };       

    // Lógica para comprobar si las contraseñas coinciden
    const handleSubmit = () => {
        if (!isPasswordValid(password)) {
            setPasswordValid(false);
            return;
        }
    
        if (password === confirmPassword) {
            console.log("Contraseña cambiada");
            setShowAlert(true);
        } else {
            alert("Las contraseñas no coinciden");
        }
    };       

    const handleConfirm = () => {
        setShowAlert(false); // Ocultar la alerta cuando se confirma
        navigation.reset({
            index: 0,
            routes: [{ name: 'FEXO' }], // Cambia 'Login' a la pantalla correspondiente de login
        });
    };

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={24} color={Colors.fexoBlue} />
            </TouchableOpacity>
            <View>
                <Text style={styles.textForgot}>
                    Change <Text style={styles.textPassword}>Password</Text>
                </Text>
            </View>

            {/* Campo para la nueva contraseña */}
            <View style={styles.inputTxt}>
                <TextInput
                    placeholder="Type your new password"
                    style={styles.input}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        setPasswordValid(isPasswordValid(text));
                    }}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#6c757d" />
                </TouchableOpacity>
            </View>
            {!passwordValid && (
                <Text style={styles.errorText}>
                    The password must have at least one capital letter, one number and one special character, it must be at least 8 characters long.
                </Text>
            )}

            {/* Campo para confirmar la nueva contraseña */}
            <View style={styles.inputTxt}>
                <TextInput
                        placeholder="Confirm new password"
                        style={styles.input}
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#6c757d" />
                    </TouchableOpacity>
                </View>

                {/* Botón para cambiar la contraseña */}
                <Pressable style={styles.btnNext} onPress={handleSubmit}>
                    <Text style={styles.btnText}>Change Password</Text>
                </Pressable>
                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title='Succeed!!'
                    message="Your password has been updated, Go back to login."
                    messageStyle={{textAlign: 'center'}}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmButtonColor='#10B981'
                    onConfirmPressed={handleConfirm}  // Al hacer clic en el botón de confirmar
                />
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
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
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
    inputTxt: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '100%',
        padding: 20,
        borderWidth: 0.2,
        borderColor: Colors.fexoGrey,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Alineación vertical para que el icono esté centrado
    },
    input: {
        fontSize: 16,
        color: Colors.fexoBlue,
        width: '85%', // Deja espacio para el ícono
    },
    errorText: {
        color: 'red',
        marginTop: -5,
        marginBottom: 10,
        alignSelf: 'flex-start',
        fontSize: 14,
    },    
    btnNext: {
        marginTop: 40,
        backgroundColor: Colors.fexoOrange,
        width: '100%',
        paddingVertical: 15,
        borderRadius: 40,
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
