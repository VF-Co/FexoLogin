import { useEffect, useRef, useState } from 'react';
import { Alert, AppState } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function SessionManager({ children }) {
    const [showAlert, setShowAlert] = useState(false)

    const appState = useRef(AppState.currentState);
    const backgroundTime = useRef(null);
    const navigation = useNavigation();

    const logout = () => {
        console.log('⏰ Sesión expirada, redirigiendo a login...');
        setShowAlert(true)
    };

    const handleAppStateChange = (nextAppState) => {
        if (appState.current === 'active' && nextAppState === 'background') {
        // guardamos el timestamp de salida
        backgroundTime.current = Date.now();
        }

        if (appState.current === 'background' && nextAppState === 'active') {
            if (backgroundTime.current) {
                const now = Date.now();
                const elapsed = (now - backgroundTime.current) / 1000; // segundos

                console.log(`⏱ Tiempo fuera: ${elapsed} segundos`);
                if (elapsed > 60) { // por ejemplo, 60 segundos
                    logout();
                }

                backgroundTime.current = null;
            }
        }

        appState.current = nextAppState;
    };

    useEffect(() => {
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => subscription.remove();
    }, []);

    const handleConfirm = () => {
        setShowAlert(false);  // Ocultar la alerta
        navigation.reset({
            index: 0,
            routes: [{ name: 'FEXO' }], // Cambia 'Login' a la pantalla correspondiente de login
        });
    };

    return (
        <>
            {children}
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="For your security, we require you to log in again."
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                onConfirmPressed={handleConfirm}  // Al hacer clic en el botón de confirmar
            />
        </>
    );
}
