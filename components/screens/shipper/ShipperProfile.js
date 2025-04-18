import { View, StyleSheet, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../../globals/colors";

export default function ShipperProfile(){
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Shipper Account Section</Text>
            <View style={styles.buttonContainer}>
                <Pressable
                    mode="contained"
                    // onPress={handleActiveTrip}
                    style={styles.btn}
                >
                    <Text style={styles.btnText}>Address</Text>
                </Pressable>
                <Pressable
                    mode="contained"
                    // onPress={handleUpcomingTrips}
                    style={styles.btn}
                >
                    <Text style={styles.btnText}>Profile</Text>
                </Pressable>
                <Pressable
                    mode="contained"
                    // onPress={handleSearchTrips}
                    style={styles.btn}
                >
                    <Text style={styles.btnText}>Settings</Text>
                </Pressable>
                <Pressable
                    // onPress={handleInitialScreen}
                    style={styles.btn}
                >
                    <Text style={styles.btnText}>Support</Text>
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
        backgroundColor: Colors.fexoOrange,
        marginTop: 15,
        alignItems: 'center',
        marginHorizontal: 5,
        width: '45%'
    },
    btnText: {
        color: Colors.fexoWhite,
        fontWeight: "700"
        }
})