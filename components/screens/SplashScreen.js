import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import Colors from '../../globals/colors';


const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
        navigation.replace('FEXO'); // Cambia a la pantalla de Login
        }, 2000); // 2 segundos
    }, []);

    return (
        <View style={styles.container}>
        <Image source={require('../../assets/img/FEXO LOGO-NO BACKGROUND.png')} style={styles.img}/>
        <ActivityIndicator size="large" color="#f57c00" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.fexoBlue
    },
    img: {
        width: 200,
        height: 250,
        borderRadius: 50,
        alignItems: 'center'
    },
});

export default SplashScreen;
