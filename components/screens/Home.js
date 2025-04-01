import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
            <Image source={require('../../assets/img/FEXO.jpg')} style={styles.img}/>
            <Text style={styles.title}>Welcome to FEXO</Text>
            <View style={styles.btnContainer}>
                <Pressable style={styles.btn} onPress={HandlerShipper}>
                    <Text style={styles.btnText}>Shipper</Text>
                </Pressable>
                <Pressable style={styles.btn} onPress={HandlerCarrier}>
                    <Text style={styles.btnText}>Carrier</Text>
                </Pressable>
                <Pressable style={styles.btn}>
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
    },
    img: {
        width: 150,
        height: 150,
        borderRadius: 50,
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        color: '#1b263b',
        fontWeight: 'bold',
        marginVertical: 12,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    },
    btn: {
        padding: 12,
        borderRadius: 25,
        backgroundColor: '#00b4d8',
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