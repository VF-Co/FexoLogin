import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    Pressable,
    TextInput,
    TouchableOpacity,
    Platform, SafeAreaView, KeyboardAvoidingView, ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Colors from "../../../globals/colors";
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

function MainShipperLandingPageContent() {
    const navigation = useNavigation();
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
        navigation.navigate('TripForm')
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.container}>
                        <Text style={styles.title}>Home Shipper Section</Text>

                        <View style={styles.textBox}>
                            <Ionicons name="search-outline" size={20} style={styles.icon}/>
                            <TextInput
                                style={styles.searchBar}
                                placeholder="Search..."
                                value={search}
                                onChangeText={setSearch}
                                placeholderTextColor="#888"
                            />
                        </View>

                        {/* Botón para añadir workorder */}
                        <Pressable style={styles.specialBtn} onPress={HandlerWorkorder}>
                            <Text style={styles.specialBtnText}>+ Add Workorder</Text>
                        </Pressable>

                        {/* Selects: Trips & Options */}
                        <View style={styles.selectContainer}>
                            {/* Trips */}
                            <Pressable onPress={toggleTrips} style={styles.select}>
                                <Text style={styles.selectText}>Trips</Text>
                                <Ionicons name={showTrips ? "chevron-up" : "chevron-down"} size={20} color="white" />
                            </Pressable>
                            {showTrips && (
                                <View style={styles.dropdown}>
                                    <Pressable style={styles.dropdownItem}>
                                        <Text style={styles.dropdownItemText}>Active Trip</Text>
                                    </Pressable>
                                    <Pressable style={styles.dropdownItem}>
                                        <Text style={styles.dropdownItemText}>Upcoming Trips</Text>
                                    </Pressable>
                                    <Pressable style={styles.dropdownItemLast}>
                                        <Text style={styles.dropdownItemText}>Search Trips</Text>
                                    </Pressable>
                                </View>
                            )}
                            {/* Options */}
                            <Pressable onPress={toggleOptions} style={styles.select}>
                                <Text style={styles.selectText}>Options</Text>
                                <Ionicons name={showOptions ? "chevron-up" : "chevron-down"} size={20} color="white" />
                            </Pressable>
                            {showOptions && (
                                <View style={styles.dropdown}>
                                    <Pressable style={styles.dropdownItemLast} onPress={handleInitialScreen}>
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


    // --- Drawer setup con rutas: Main, Settings, Logout ---
export default function MainShipperLandingPage() {
    return (
        <Drawer.Navigator
            initialRouteName="Shipper"
        >
            <Drawer.Screen
                name="Shipper"
                component={MainShipperLandingPageContent}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="car" size={25} color={color} />
                    ),
                    drawerLabel: 'Shipper',
                }}
            />
            <Drawer.Screen
                name="Settings"
                component={() => <View style={styles.screen}><Text>Settings Page</Text></View>}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="settings" size={size} color={color} />
                    ),
                    drawerLabel: 'Settings',
                }}
            />
            <Drawer.Screen
                name="Account"
                component={() => <View style={styles.screen}><Text>Account Page</Text></View>}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="key-outline" size={size} color={color} />
                    ),
                    drawerLabel: 'Account',
                }}
            />
            <Drawer.Screen
                name="Logout"
                component={() => <View style={styles.screen}><Text>Logging out...</Text></View>}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="log-out" size={size} color={color} />
                    ),
                    drawerLabel: 'Logout',
                }}
            />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
        position: 'relative'
    },
    textBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Platform.OS === 'android' ? 0 : 8, 
        borderColor: '#ced4da',
        borderWidth: 0.5,
        marginBottom: 20,
        width: '100%',
        paddingHorizontal: 15,
        backgroundColor: '#dee2e6',
        borderRadius: 20
    },
    icon: {
        color: '#888',
        marginRight: 10,
    },
    searchBar: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },    
    title: {
        fontSize: 30,
        color: "#1b263b",
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: 'center'
    },
    specialBtn: {
        backgroundColor: "#1b263b",
        padding: 15,
        borderRadius: 20,
        marginBottom: 20,
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
        marginBottom: 0,
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
    dropdownItemLast: {
        paddingVertical: 12,
    },
    dropdownItemText: {
        fontSize: 16,
        color: "#1b263b",
        fontWeight: "500",
    },    
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
