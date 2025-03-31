import { View, StyleSheet, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MainShipperLandingPage(){
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Payment Shipper Section</Text>
            <View style={styles.buttonContainer}>
                <Pressable
                    mode="contained"
                    // onPress={handleActiveTrip}
                    style={styles.btn}
                >
                    <Text>Current Invoice</Text>
                </Pressable>
                <Pressable
                    mode="contained"
                    // onPress={handleUpcomingTrips}
                    style={styles.btn}
                >
                    <Text>Past Invoices</Text>
                </Pressable>
                <Pressable
                    mode="contained"
                    // onPress={handleSearchTrips}
                    style={styles.btn}
                >
                    <Text>Payments</Text>
                </Pressable>
                <Pressable
                    // onPress={handleInitialScreen}
                    style={styles.btn}
                >
                    <Text>Statements</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        color: "#1b263b",
        fontWeight: 'bold'
    },
    buttonContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    btn: {
        padding: 12,
        borderRadius: 25,
        backgroundColor: '#00b4d8',
        marginTop: 15,
        alignItems: 'center',
        marginHorizontal: 5,
        width: '45%'
    },
})