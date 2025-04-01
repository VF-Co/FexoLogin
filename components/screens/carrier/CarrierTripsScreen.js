import { View, StyleSheet, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../../globals/colors";

export default function CarrierTrip(){
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Carrier Trip Manager</Text>
            <View style={styles.buttonContainer}>
                <Pressable
                    mode="contained"
                    // onPress={handleActiveTrip}
                    style={styles.btn}
                >
                    <Text style={styles.btnText}>Active Trip...</Text>
                </Pressable>
                <Pressable
                    mode="contained"
                    // onPress={handleUpcomingTrips}
                    style={styles.btn}
                >
                    <Text style={styles.btnText}>Complete / Historial</Text>
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
        backgroundColor: Colors.fexoGrey,
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