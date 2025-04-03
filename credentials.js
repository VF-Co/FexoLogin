import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Configuración de Firebase (la que te dio tu amigo)
const firebaseConfig = {
    apiKey: "AIzaSyAcQ4U9sg1aTBA0jdj0Zy5iDQUKvVGVpWg",
    authDomain: "fexo-450304.firebaseapp.com",
    projectId: "fexo-450304",
    storageBucket: "fexo-450304.appspot.com", // Asegúrate de incluir esto si lo necesitas
    messagingSenderId: "TU_MESSAGING_SENDER_ID", // Agrega este campo si está en su config
    appId: "TU_APP_ID", // Agrega este campo si está en su config
};

let app;

// Evitar inicializar Firebase más de una vez
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

// Inicializar autenticación con persistencia en React Native
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export default app;
