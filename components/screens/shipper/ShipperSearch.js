import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable, SafeAreaView, ScrollView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../globals/colors";
import { LinearGradient } from "expo-linear-gradient";

export default function ShipperSearch() {
    const navigation = useNavigation();
    const [selectedFilter, setSelectedFilter] = useState(null); 

    const handleFilterPress = (filter) => {
        // Toggle filter: if the same filter is pressed again, deselect it
        setSelectedFilter(selectedFilter === filter ? null : filter);
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView style={styles.container}>
                {/* Gradient Header with Search Bar */}
                <LinearGradient
                    colors={[Colors.fexoBlue, Colors.fexoBlue]} // Orange to blue gradient
                    style={styles.header}
                >
                    <View style={styles.headerContent}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back-outline" size={24} color="#ffffff" />
                        </Pressable>
                        <Text style={styles.headerTitle}>Search</Text>
                    </View>
                    <View style={styles.searchContainer}>
                        <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search trips..."
                            placeholderTextColor="#666"
                        />
                    </View>
                </LinearGradient>

                {/* Welcome Section */}
                <View style={styles.welcomeSection}>
                    <Text style={styles.welcomeText}>Search Your Trips</Text>
                    <Text style={styles.welcomeSubText}>Find trips quickly and easily.</Text>
                </View>

                {/* Filter Options Section (Grid) */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Filter By</Text>
                    <View style={styles.filterGrid}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.filterCard,
                                selectedFilter === "Trip ID" && styles.filterCardSelected,
                                !selectedFilter && pressed && styles.filterCardPressed,
                            ]}
                            onPress={() => handleFilterPress("Trip ID")}
                        >
                            <Ionicons
                                name="barcode-outline"
                                size={24}
                                color={selectedFilter === "Trip ID" ? Colors.fexoWhite : "#666"}
                            />
                            <Text
                                style={[
                                    styles.filterText,
                                    selectedFilter === "Trip ID" && styles.filterTextSelected,
                                ]}
                            >
                                Trip ID
                            </Text>
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [
                                styles.filterCard,
                                selectedFilter === "Client" && styles.filterCardSelected,
                                !selectedFilter && pressed && styles.filterCardPressed,
                            ]}
                            onPress={() => handleFilterPress("Client")}
                        >
                            <Ionicons
                                name="person-outline"
                                size={24}
                                color={selectedFilter === "Client" ? Colors.fexoWhite : "#666"}
                            />
                            <Text
                                style={[
                                    styles.filterText,
                                    selectedFilter === "Client" && styles.filterTextSelected,
                                ]}
                            >
                                Client
                            </Text>
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [
                                styles.filterCard,
                                selectedFilter === "Date" && styles.filterCardSelected,
                                !selectedFilter && pressed && styles.filterCardPressed,
                            ]}
                            onPress={() => handleFilterPress("Date")}
                        >
                            <Ionicons
                                name="calendar-outline"
                                size={24}
                                color={selectedFilter === "Date" ? Colors.fexoWhite : "#666"}
                            />
                            <Text
                                style={[
                                    styles.filterText,
                                    selectedFilter === "Date" && styles.filterTextSelected,
                                ]}
                            >
                                Date
                            </Text>
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [
                                styles.filterCard,
                                selectedFilter === "Status" && styles.filterCardSelected,
                                !selectedFilter && pressed && styles.filterCardPressed,
                            ]}
                            onPress={() => handleFilterPress("Status")}
                        >
                            <Ionicons
                                name="filter-outline"
                                size={24}
                                color={selectedFilter === "Status" ? Colors.fexoWhite : "#666"}
                            />
                            <Text
                                style={[
                                    styles.filterText,
                                    selectedFilter === "Status" && styles.filterTextSelected,
                                ]}
                            >
                                Status
                            </Text>
                        </Pressable>
                    </View>
                </View>

                {/* Recent Searches Section (Horizontal Scroll) */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Searches</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {["Trip ID: 12345", "Client: ABC Corp", "Date: 4/10/2025", "Status: Active"].map(
                            (search, index) => (
                                <Pressable
                                    key={index}
                                    style={({ pressed }) => [
                                        styles.recentSearchChip,
                                        pressed && styles.recentSearchChipPressed,
                                    ]}
                                    onPress={() => console.log(`Repeat search: ${search}`)} // Add search logic
                                >
                                    <Text style={styles.recentSearchText}>{search}</Text>
                                </Pressable>
                            )
                        )}
                    </ScrollView>
                </View>

                {/* Search Button */}
                <View style={styles.section}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.actionButton,
                            pressed && styles.buttonPressed,
                        ]}
                        onPress={() => console.log("Search pressed")} // Add search logic
                    >
                        <Text style={styles.buttonText}>Search Now</Text>
                    </Pressable>
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
    },
    // Gradient Header Styles
    header: {
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#ffffff",
        marginLeft: 10,
    },
    // Search Bar Styles
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
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
    // Welcome Section Styles
    welcomeSection: {
        alignItems: "center",
        marginVertical: 30,
        paddingHorizontal: 20,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: "700",
        color: "#1b263b",
        marginBottom: 5,
    },
    welcomeSubText: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
    },
    // Section Styles
    section: {
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1b263b",
        marginBottom: 15,
    },
    // Filter Grid Styles
    filterGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    filterCard: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 15,
        alignItems: "center",
        width: "48%", // 2x2 grid with spacing
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    filterCardSelected: {
        backgroundColor: Colors.fexoOrange,
        borderColor: Colors.fexoOrange,
    },
    filterCardPressed: {
        backgroundColor: "#f0f0f0",
    },
    filterText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#1b263b",
        marginTop: 5,
    },
    filterTextSelected: {
        color: Colors.fexoWhite,
    },
    // Recent Searches Styles (Horizontal Chips)
    recentSearchChip: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginRight: 10,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    recentSearchChipPressed: {
        backgroundColor: "#f0f0f0",
    },
    recentSearchText: {
        fontSize: 14,
        color: "#1b263b",
    },
    // Action Button Styles
    actionButton: {
        backgroundColor: Colors.fexoOrange,
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: "center",
    },
    buttonPressed: {
        backgroundColor: "#e07b39", // Slightly darker shade when pressed
        opacity: 0.9,
    },
    buttonText: {
        color: Colors.fexoWhite,
        fontSize: 16,
        fontWeight: "600",
    },
});