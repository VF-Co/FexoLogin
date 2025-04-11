import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    Pressable,
    Switch,
    SafeAreaView,
    ScrollView,
    TextInput,
    Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../globals/colors";

export default function SettingsPage() {
    const navigation = useNavigation();
    const [isFaceIDEnabled, setIsFaceIDEnabled] = useState(true);
    const [search, setSearch] = useState(""); 

    const toggleFaceID = () => setIsFaceIDEnabled((previousState) => !previousState);

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Search Container */}
                <View style={styles.searchContainer}>
            
                    <View style={styles.textBox}>
                        <Ionicons name="search-outline" size={20} style={styles.icon} />
                        <TextInput
                            style={styles.searchBar}
                            placeholder="AI Assistant will be coming soon..."
                            value={search}
                            onChangeText={setSearch}
                            placeholderTextColor="#888"
                        />
                    </View>
                    <View>
                        <Ionicons
                            name="logo-slack"
                            size={30}
                            style={styles.iconRight}
                        />
                    </View>
                </View>

                {/* User Profile Section */}
                <View style={styles.profileCard}>
                    <Pressable style={styles.profileItem}>
                        <View style={styles.profileHeader}>
                            <Ionicons name="extension-puzzle-outline" size={30} color="#888" style={styles.profileIcon} />
                            <View>
                                <Text style={styles.profileName}>USER FULL NAME</Text>
                                <Text style={styles.profileSubtext}>
                                    A Description...
                                </Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#888" />
                    </Pressable>

                    <View style={styles.innerSeparator} />

                    <Pressable style={styles.sectionItem}>
                        <Text style={styles.sectionItemText}>Contact Info</Text>
                        <Ionicons name="chevron-forward" size={20} color="#888" />
                    </Pressable>
                </View>

                {/* Login Settings Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.sectionIcon} />
                        <Text style={styles.sectionTitle}>LOGIN SETTINGS</Text>
                    </View>
                    <Pressable style={styles.sectionItem}>
                        <Text style={styles.sectionItemText}>User ID</Text>
                        <Ionicons name="chevron-forward" size={20} color="#888" />
                    </Pressable>
                    <Pressable style={styles.sectionItem}>
                        <Text style={styles.sectionItemText}>Password</Text>
                        <Ionicons name="chevron-forward" size={20} color="#888" />
                    </Pressable>
                    <View style={styles.sectionItem}>
                        <Text style={styles.sectionItemText}>Face ID</Text>
                        <Switch
                            onValueChange={toggleFaceID}
                            value={isFaceIDEnabled}
                            trackColor={{ false: "#767577", true: "#007AFF" }}
                            thumbColor={isFaceIDEnabled ? "#fff" : "#f4f3f4"}
                        />
                    </View>
                    <Pressable style={styles.sectionItem}>
                        <Text style={styles.sectionItemText}>Login History</Text>
                        <Ionicons name="chevron-forward" size={20} color="#888" />
                    </Pressable>
                    <Pressable style={styles.sectionItem}>
                        <Text style={styles.sectionItemText}>Remember This Device</Text>
                        <Ionicons name="chevron-forward" size={20} color="#888" />
                    </Pressable>
                    <Pressable style={styles.sectionItem}>
                        <Text style={styles.sectionItemText}>Third-Party Site Access</Text>
                        <Ionicons name="chevron-forward" size={20} color="#888" />
                    </Pressable>
                </View>

                {/* Paperless Settings Section */}
                <Pressable style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="document-outline" size={20} color="#888" style={styles.sectionIcon} />
                        <Text style={styles.sectionTitle}>PAPERLESS SETTINGS</Text>
                    </View>
                </Pressable>

                {/* Feature Settings Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="settings-outline" size={20} color="#888" style={styles.sectionIcon} />
                        <Text style={styles.sectionTitle}>FEATURE SETTINGS</Text>
                    </View>
                    <Pressable style={styles.sectionItem}>
                        <Text style={styles.sectionItemText}>Option 1</Text>
                        <Ionicons name="chevron-forward" size={20} color="#888" />
                    </Pressable>
                    <Pressable style={styles.sectionItem}>
                        <Text style={styles.sectionItemText}>Option 2</Text>
                        <Ionicons name="chevron-forward" size={20} color="#888" />
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
    },
    scrollContent: {
        paddingBottom: 20,
    },
    searchContainer: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        alignItems: "center",
    },
    backButton: {
        marginRight: 10,
    },
    textBox: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#ced4da",
        borderWidth: 0.5,
        marginBottom: 0,
        paddingHorizontal: 10,
        backgroundColor: "#dee2e6",
        borderRadius: 20,
        paddingVertical: Platform.OS === "android" ? 0 : 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
        width: "85%",
    },
    icon: {
        color: "#888",
        marginRight: 0,
    },
    searchBar: {
        flex: 1,
        fontSize: 16,
        color: "#000",
        paddingHorizontal: 15,
    },
    iconRight: {
        marginLeft: 10,
        color: "#1b263b",
    },
    profileCard: {
        backgroundColor: "#fff",
        marginHorizontal: 15,
        marginTop: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    profileItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
    },
    profileHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    profileIcon: {
        marginRight: 15,
    },
    profileName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1b263b",
    },
    profileSubtext: {
        fontSize: 14,
        color: "#888",
        marginTop: 4,
    },
    section: {
        backgroundColor: "#fff",
        marginHorizontal: 15,
        marginTop: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    sectionIcon: {
        marginRight: 10,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#888",
    },
    sectionItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    sectionItemText: {
        fontSize: 16,
        color: "#1b263b",
    },
    innerSeparator: {
        height: 1,
        backgroundColor: "#eee",
    },
});