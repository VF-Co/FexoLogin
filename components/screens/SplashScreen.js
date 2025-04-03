import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ImageBackground } from 'react-native';
import Colors from '../../globals/colors';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('FEXO'); // Cambia a la pantalla de Login
        }, 2000); // 2 segundos
    }, []);

    return (
        <ImageBackground 
            source={require('../../assets/img/Background.png')} // Asegúrate de la ruta correcta
            style={styles.background}
        >
            <View style={styles.overlay}>
                <Image 
                    source={require('../../assets/img/FEXO LOGO-NO BACKGROUND.png')} 
                    style={styles.img}
                />
                <ActivityIndicator size="large" color="#f57c00" />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover', // Para cubrir toda la pantalla
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)' // Oscurece un poco el fondo
    },
    img: {
        width: 200,
        height: 250,
        borderRadius: 50,
    },
});

export default SplashScreen;
