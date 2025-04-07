import { React, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import Colors from '../../../globals/colors';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import appFirebase from '../../../credentials';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function FPassword1() {
    const auth = getAuth(appFirebase);
    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    // State for controlling AwesomeAlert visibility and content
    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertConfirmText, setAlertConfirmText] = useState('OK');
    const [alertOnConfirm, setAlertOnConfirm] = useState(() => () => setShowAlert(false));

    const handleNext = async () => {
        if (!email.trim()) {
            setAlertTitle('Validation');
            setAlertMessage('Please enter your email');
            setShowAlert(true);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setAlertTitle('Validation');
            setAlertMessage('Please enter a valid email');
            setShowAlert(true);
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setAlertTitle('Succeed');
            setAlertMessage('An email has been sent with a link to reset your password. Check your inbox or spam folder.');
            setAlertConfirmText('OK');
            setAlertOnConfirm(() => () => {
                setShowAlert(false);
                navigation.navigate('FEXO');
            });
            setShowAlert(true);
        } catch (error) {
            console.error(error);
            if (error.code === 'auth/user-not-found') {
                setAlertTitle('Error');
                setAlertMessage('There is no account associated with this email');
            } else if (error.code === 'auth/invalid-email') {
                setAlertTitle('Error');
                setAlertMessage('The email is not valid');
            } else {
                setAlertTitle('Error');
                setAlertMessage('The reset email could not be sent.');
            }
            setShowAlert(true);
        }
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
                    Forgot <Text style={styles.textPassword}>Password</Text>
                </Text>
            </View>

            <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#6c757d" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#aaa"
                />
            </View>

            <Text style={styles.verificationText}>
                We will send you a email to restore your password.
            </Text>

            <Pressable style={styles.btnNext} onPress={handleNext}>
                <Text style={styles.btnText}>Send</Text>
            </Pressable>

            {/* AwesomeAlert Component */}
            <AwesomeAlert
                show={showAlert}
                title={alertTitle}
                message={alertMessage}
                showConfirmButton={true}
                confirmText={alertConfirmText}
                confirmButtonColor={Colors.fexoOrange}
                onConfirmPressed={alertOnConfirm}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                titleStyle={styles.alertTitle}
                messageStyle={styles.alertMessage}
                contentContainerStyle={styles.alertContainer}
                confirmButtonStyle={styles.confirmButton}
                confirmButtonTextStyle={styles.confirmButtonText}
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 16,
        color: '#333',
    },
    verificationText: {
        textAlign: 'center',
        color: '#555',
        fontSize: 14,
        marginVertical: 30,
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
    // AwesomeAlert Styles
    alertContainer: {
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#fff',
    },
    alertTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.fexoBlue,
        textAlign: 'center',
    },
    alertMessage: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginVertical: 10,
    },
    confirmButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});