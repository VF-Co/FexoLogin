import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    Pressable,
    TextInput,
    Platform,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../globals/colors";

const Drawer = createDrawerNavigator();

function MainShipperLandingPageContent() {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState("Accounts");
    const [showTrips, setShowTrips] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [search, setSearch] = useState("");

    const toggleTrips = () => setShowTrips(!showTrips);
    const toggleOptions = () => setShowOptions(!showOptions);
    const handleInitialScreen = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "InitialScreen" }],
        });
    };
    const HandlerWorkorder = () => {
        navigation.navigate("TripForm");
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                    <View style={styles.container}>

                        {/* Header w/ Tabs */}
                        <View style={styles.headerRow}>
                            <View style={styles.tabsRow}>
                                {["Accounts", "Dashboard"].map((tab) => (
                                    <Pressable key={tab} style={styles.tabItem} onPress={() => setActiveTab(tab)}>
                                        <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                                            {tab}
                                        </Text>
                                        {activeTab === tab && <View style={styles.underline} />}
                                    </Pressable>
                                ))}
                            </View>
                        </View>

                        {/* Search */}
                        <View style={styles.textBox}>
                            <Ionicons name="search-outline" size={20} style={styles.icon} />
                            <TextInput
                                style={styles.searchBar}
                                placeholder="Search..."
                                value={search}
                                onChangeText={setSearch}
                                placeholderTextColor="#888"
                            />
                        </View>

                        {/* Greeting Card */}
                        <View style={styles.card}>
                            <Text style={styles.greeting}>Hello, User</Text>
                            <Text style={styles.subtext}>Mini Description...</Text>
                        </View>

                        {/* Create Work Order Card */}
                        <View style={styles.card}>
                            <Text style={styles.greeting}>Create Work Order</Text>

                            {/* Grey Separation Line inside the card */}
                            <View style={styles.innerSeparator}></View>

                            <Pressable style={styles.specialBtn} onPress={HandlerWorkorder}>
                                <Text style={styles.specialBtnText}>Create Work Order +</Text>
                            </Pressable>
                        </View>

                        {/* Dropdowns */}
                        <View style={styles.selectContainer}>
                            <Pressable onPress={toggleTrips} style={styles.select}>
                                <Text style={styles.selectText}>Trips</Text>
                                <Ionicons name={showTrips ? "chevron-up" : "chevron-down"} size={20} color="white" />
                            </Pressable>
                            {showTrips && (
                                <View style={styles.dropdown}>
                                    {["Active Trip", "Upcoming Trips", "Search Trips"].map((item, i) => (
                                        <Pressable key={i} style={styles.dropdownItem}>
                                            <Text style={styles.dropdownItemText}>{item}</Text>
                                        </Pressable>
                                    ))}
                                </View>
                            )}

                            <Pressable onPress={toggleOptions} style={styles.select}>
                                <Text style={styles.selectText}>Options</Text>
                                <Ionicons name={showOptions ? "chevron-up" : "chevron-down"} size={20} color="white" />
                            </Pressable>
                            {showOptions && (
                                <View style={styles.dropdown}>
                                    <Pressable style={styles.dropdownItem} onPress={handleInitialScreen}>
                                        <Text style={styles.dropdownItemText}>Back to Initial Screen</Text>
                                    </Pressable>
                                </View>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default function MainShipperLandingPage() {
    return (
        <Drawer.Navigator initialRouteName="Shipper">
            <Drawer.Screen
                name="Shipper"
                component={MainShipperLandingPageContent}
                options={{
                    drawerIcon: ({ color }) => <Ionicons name="car" size={24} color={color} />,
                    drawerLabel: "Shipper",
                }}
            />
            <Drawer.Screen
                name="Settings"
                component={() => <View style={styles.screen}><Text>Settings Page</Text></View>}
                options={{
                    drawerIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
                }}
            />
            <Drawer.Screen
                name="Account"
                component={() => <View style={styles.screen}><Text>Account Page</Text></View>}
                options={{
                    drawerIcon: ({ color }) => <Ionicons name="key-outline" size={24} color={color} />,
                }}
            />
            <Drawer.Screen
                name="Logout"
                component={() => <View style={styles.screen}><Text>Logging out...</Text></View>}
                options={{
                    drawerIcon: ({ color }) => <Ionicons name="log-out" size={24} color={color} />,
                }}
            />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: "#f8f9fa",
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    tabsRow: {
        flexDirection: "row",
        gap: 30,
        alignItems: "center",
    },
    tabItem: {
        alignItems: "center",
        width: '45%'
    },
    tabText: {
        fontSize: 16,
        color: "#6c757d",
        fontWeight: "500",
    },
    tabTextActive: {
        color: Colors.fexoOrange,
        fontWeight: "600",
    },
    underline: {
        marginTop: 4,
        height: 2,
        backgroundColor: Colors.fexoOrange,
        width: "100%",
    },
    textBox: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#ced4da",
        borderWidth: 0.5,
        marginBottom: 20,
        paddingHorizontal: 15,
        backgroundColor: "#dee2e6",
        borderRadius: 20,
        paddingVertical: Platform.OS === "android" ? 0 : 8,
    },
    icon: {
        color: "#888",
        marginRight: 10,
    },
    searchBar: {
        flex: 1,
        fontSize: 16,
        color: "#000",
    },
    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
    greeting: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1b263b",
    },
    subtext: {
        fontSize: 14,
        color: "#6c757d",
        marginTop: 4,
    },
    specialBtn: {
        backgroundColor: "#1b263b",
        padding: 15,
        borderRadius: 20,
        marginTop: 5,
        alignItems: "center",
    },
    specialBtnText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    selectContainer: {
        gap: 20,
    },
    select: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: Colors.fexoOrange,
        padding: 15,
        borderRadius: 15,
        alignItems: "center",
    },
    selectText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    dropdown: {
        backgroundColor: "#ffffff",
        borderRadius: 15,
        marginTop: 0,
        paddingVertical: 10,
        paddingHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    dropdownItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    dropdownItemText: {
        fontSize: 16,
        color: "#1b263b",
        fontWeight: "500",
    },
    separator: {
        height: 1,
        backgroundColor: "#ccc",
        marginVertical: 20,
    },
    innerSeparator: {
        height: 1,
        backgroundColor: "#ccc",
        marginVertical: 15,
    },
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
