import { View, StyleSheet, Text, Pressable, SafeAreaView, ScrollView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // For icons (install if needed)
import Colors from "../../../globals/colors";

export default function ShipperTrip() {
    const navigation = useNavigation();

    const HandlerWorkorder = () => {
        navigation.navigate("TripForm");
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView style={styles.container}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.title}>Trip Manager</Text>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search trips..."
                        placeholderTextColor="#666"
                    />
                </View>

                {/* Recent Trips Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Trips</Text>
                    <View style={styles.recentTripCard}>
                        <Text style={styles.recentTripText}>No recent trips available</Text>
                        <Text style={styles.recentTripSubText}>
                            Start a new trip or check your history.
                        </Text>
                    </View>
                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Trip Actions Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Trip Actions</Text>
                    <View style={styles.cardsContainer}>
                        {/* Trip Overview Card */}
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Ionicons name="map-outline" size={28} color={Colors.fexoOrange} />
                                <Text style={styles.cardTitle}>Trip Overview</Text>
                            </View>
                            <Text style={styles.cardDescription}>
                                View all your active and upcoming trips.
                            </Text>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.cardButton,
                                    pressed && styles.buttonPressed,
                                ]}
                                onPress={() => navigation.navigate("TripOverview")} // Replace with actual navigation
                            >
                                <Text style={styles.buttonText}>View Trips</Text>
                            </Pressable>
                        </View>

                        {/* Add Workorder Card */}
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Ionicons name="add-circle-outline" size={28} color={Colors.fexoOrange} />
                                <Text style={styles.cardTitle}>Add Workorder</Text>
                            </View>
                            <Text style={styles.cardDescription}>
                                Create a new workorder for your trip.
                            </Text>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.cardButton,
                                    pressed && styles.buttonPressed,
                                ]}
                                onPress={HandlerWorkorder}
                            >
                                <Text style={styles.buttonText}>Create Now</Text>
                            </Pressable>
                        </View>

                        {/* Completed Trips Card */}
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Ionicons name="checkmark-done-outline" size={28} color={Colors.fexoOrange} />
                                <Text style={styles.cardTitle}>Completed Trips</Text>
                            </View>
                            <Text style={styles.cardDescription}>
                                Review your completed trips and details.
                            </Text>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.cardButton,
                                    pressed && styles.buttonPressed,
                                ]}
                                onPress={() => navigation.navigate("CompletedTrips")} // Replace with actual navigation
                            >
                                <Text style={styles.buttonText}>See History</Text>
                            </Pressable>
                        </View>

                        {/* Maps Card */}
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Ionicons name="location-outline" size={28} color={Colors.fexoOrange} />
                                <Text style={styles.cardTitle}>Maps</Text>
                            </View>
                            <Text style={styles.cardDescription}>
                                Navigate and track your trips on the map.
                            </Text>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.cardButton,
                                    pressed && styles.buttonPressed,
                                ]}
                                onPress={() => navigation.navigate("Maps")} // Replace with actual navigation
                            >
                                <Text style={styles.buttonText}>Open Maps</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#f5f7fa", // Light gray background for a clean look
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    // Header Styles
    header: {
        paddingVertical: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1b263b",
    },
    // Search Bar Styles
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#1b263b",
    },
    // Recent Trips Section
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1b263b",
        marginBottom: 15,
    },
    recentTripCard: {
        backgroundColor: "#ffffff",
        borderRadius: 15,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    recentTripText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#1b263b",
        marginBottom: 5,
    },
    recentTripSubText: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
    },
    // Divider
    divider: {
        height: 1,
        backgroundColor: "#e0e0e0",
        marginVertical: 20,
    },
    // Trip Actions Section
    cardsContainer: {
        flexDirection: "column", // Stack cards vertically
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1b263b",
        marginLeft: 10,
    },
    cardDescription: {
        fontSize: 14,
        color: "#666",
        marginBottom: 15,
    },
    cardButton: {
        backgroundColor: Colors.fexoOrange,
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: "center",
    },
    buttonPressed: {
        backgroundColor: "#e07b39", // Slightly darker shade when pressed
        opacity: 0.9,
    },
    buttonText: {
        color: Colors.fexoWhite,
        fontSize: 14,
        fontWeight: "600",
    },
});