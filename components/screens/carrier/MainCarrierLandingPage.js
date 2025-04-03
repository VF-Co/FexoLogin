import { View, StyleSheet, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../../globals/colors";

export default function MainCarrierLandingPage(){
    const navigation = useNavigation();

    const handleInitialScreen = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "InitialScreen" }],
        });
    };
    

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Home Carrier Section</Text>
            <View style={styles.buttonContainer}>
                <Pressable
                    mode="contained"
                    // onPress={handleActiveTrip}
                    style={styles.btn}
                >
                    <Text style={styles.btnText}>Active Trip</Text>
                </Pressable>
                <Pressable
                    mode="contained"
                    // onPress={handleUpcomingTrips}
                    style={styles.btn}
                >
                    <Text style={styles.btnText}>Upcoming Trips</Text>
                </Pressable>
                <Pressable
                    mode="contained"
                    // onPress={handleSearchTrips}
                    style={styles.btn}
                >
                    <Text style={styles.btnText}>Search Trips</Text>
                </Pressable>
                <Pressable
                    onPress={handleInitialScreen}
                    style={styles.btn}
                >
                    <Text style={styles.btnText}>Back to Initial Screen</Text>
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