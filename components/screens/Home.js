import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../globals/colors';

export default function Home() {
    const navigation = useNavigation();

    const HandlerShipper = () => {
        navigation.navigate('ShipperTabs', { screen: 'Shipper' })
    }
    const HandlerCarrier = () => {
        navigation.navigate('CarrierTabs', { screen: 'Carrier' })
    }
    // const HandlerOperator = () => {
    //     navigation.navigate('ShipperMain')
    // }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Welcome to</Text>
            <Image source={require('../../assets/img/FEXO LOGO-NO BACKGROUND.png')} style={styles.img}/>
            <View style={styles.btnContainer}>
                <Pressable style={styles.btn} onPress={HandlerShipper}>
                    <Text style={styles.btnText}>Shipper</Text>
                </Pressable>
                <Pressable style={styles.btn1} onPress={HandlerCarrier}>
                    <Text style={styles.btnText}>Carrier</Text>
                </Pressable>
                <Pressable style={styles.btn2}>
                    <Text style={styles.btnText}>Operator</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
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
    title: {
        fontSize: 30,
        color: Colors.fexoWhite,
        fontWeight: 'bold',
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    },
    btn: {
        padding: 12,
        borderRadius: 25,
        backgroundColor: Colors.fexoOrange,
        marginTop: 15,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    btn1: {
        padding: 12,
        borderRadius: 25,
        backgroundColor: Colors.fexoGrey,
        marginTop: 15,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    btn2: {
        padding: 12,
        borderRadius: 25,
        backgroundColor: '#000000',
        marginTop: 15,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold'
    },
})