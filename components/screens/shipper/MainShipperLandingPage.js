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
    const [showBanking, setShowBanking] = useState(false);
    const [search, setSearch] = useState("");

    const toggleTrips = () => setShowTrips(!showTrips);
    const toggleOptions = () => setShowOptions(!showOptions);
    const toggleBanking = () => setShowBanking(!showBanking)
    const handleInitialScreen = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "InitialScreen" }],
        });
    };
    const HandlerWorkorder = () => {
        navigation.navigate("TripForm");
    };

    const handleArrowPress = () => {
       navigation.navigate("Settings")
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                    {/* Header w/ Tabs */}
                    <View style={styles.headerRow}>
                        <View style={styles.tabsRow}>
                            {["Option 1", "Option 2"].map((tab) => (
                                <Pressable key={tab} style={styles.tabItem} onPress={() => setActiveTab(tab)}>
                                    <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                                        {tab}
                                    </Text>
                                    {activeTab === tab && <View style={styles.underline} />}
                                </Pressable>
                            ))}
                        </View>
                    </View>
                    <View style={styles.container}>
                        {/* Search */}
                       <View style={styles.searchContainer}>
                        <View style={styles.textBox}>
                           <Ionicons name="search-outline" size={20} style={styles.icon} />
                           <TextInput
                            style={styles.searchBar}
                            placeholder="AI Assistant will be soon..."
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


                        {/* Greeting & Dropdowns */}
                        <View style={styles.card}>
                            <Pressable onPress={handleArrowPress} style={styles.greetingContainer}>
                                <View>
                                    <Text style={styles.greeting}>Hello, User</Text>
                                    <Text style={styles.subtext}>Mini Description...</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="black" />
                            </Pressable>

                            <View style={styles.innerSeparator}></View>

                            {/* Trips Dropdown */}
                            <Pressable onPress={toggleTrips} style={styles.select}>
                                <View>
                                    <Text style={styles.selectText}>Trips</Text>
                                    <Text style={styles.subtext}>Mini Description...</Text>
                                </View>
                                <Ionicons name={showTrips ? "chevron-up" : "chevron-down"} size={20} color="black" />
                            </Pressable>
                            {showTrips && (
                                <View style={styles.dropdown}>
                                    <Pressable style={styles.dropdownItem}>
                                        <Ionicons name="navigate-outline" size={18} style={styles.dropdownIcon} />
                                        <Text style={styles.dropdownItemText}>Active Trip</Text>
                                    </Pressable>
                                    <Pressable style={styles.dropdownItem}>
                                        <Ionicons name="calendar-outline" size={18} style={styles.dropdownIcon} />
                                        <Text style={styles.dropdownItemText}>Upcoming Trips</Text>
                                    </Pressable>
                                    <Pressable style={styles.dropdownItem}>
                                        <Ionicons name="search-outline" size={18} style={styles.dropdownIcon} />
                                        <Text style={styles.dropdownItemText}>Search Trips</Text>
                                    </Pressable>
                                </View>
                            )}

                            <View style={styles.innerSeparator}></View>

                            {/* Options Dropdown */}
                            <Pressable onPress={toggleOptions} style={styles.select}>
                                <View>
                                    <Text style={styles.selectText}>Options</Text>
                                    <Text style={styles.subtext}>Mini Description...</Text>
                                </View>
                                <Ionicons name={showOptions ? "chevron-up" : "chevron-down"} size={20} color="black" />
                            </Pressable>
                            {showOptions && (
                                <View style={styles.dropdown}>
                                    <Pressable style={styles.dropdownItem} onPress={handleInitialScreen}>
                                        <Ionicons name="arrow-back-outline" size={18} style={styles.dropdownIcon} />
                                        <Text style={styles.dropdownItemText}>Back to Initial Screen</Text>
                                    </Pressable>
                                </View>
                            )}
                        </View>

                        {/* Create Work Order Card */}
                        <View style={styles.card}>
                            <View style={styles.cardWO}>
                                <Ionicons name='document-text-outline' size={20}/>
                                <Text style={styles.greetingWO}>Create Work Order</Text>
                            </View>

                            <View style={styles.innerSeparator}></View>

                            <Pressable style={styles.specialBtn} onPress={HandlerWorkorder}>
                                <Text style={styles.specialBtnText}>Add Workorder +</Text>
                            </Pressable>
                        </View>

                        <View style={styles.card}>
                            <View style={styles.orangeBar} />
                            <Pressable onPress={toggleBanking} style={styles.select}>
                                <View>
                                    <Text style={styles.selectText}>Title</Text>
                                    <Text style={styles.subtext}>Main Description</Text>
                                </View>
                                <Ionicons name={showBanking ? "chevron-up" : "chevron-down"} size={20} color="black" />
                            </Pressable>
                            {showBanking && (
                                <View style={styles.dropdown}>
                                    <Pressable style={styles.dropdownItem}>
                                        <Ionicons name="flash-outline" size={18} style={styles.dropdownIcon} />
                                        <Text style={styles.dropdownItemText}>Start Now</Text>
                                    </Pressable>
                                    <Pressable style={styles.dropdownItem}>
                                        <Ionicons name="bulb-outline" size={18} style={styles.dropdownIcon} />
                                        <Text style={styles.dropdownItemText}>Whats new</Text>
                                    </Pressable>
                                    <Pressable style={styles.dropdownItem}>
                                        <Ionicons name="search-circle-outline" size={18} style={styles.dropdownIcon} />
                                        <Text style={styles.dropdownItemText}>Search options</Text>
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
        <Drawer.Navigator
            initialRouteName="Shipper"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#ffffff',
                    borderBottomWidth: 0,
                    elevation: 0,
                    shadowColor: 'transparent',
                },
                headerRight: () => (
                    <View style={styles.headerIconsContainer}>
                        <TouchableOpacity
                            onPress={() => console.log("Notifications pressed")}
                            style={styles.iconButton}
                        >
                            <Ionicons name="notifications-outline" size={24} color="#000" />
                            <Text style={styles.iconLabel}>Notifications</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => console.log("Logout pressed")}
                            style={styles.iconButton}
                        >
                            <Ionicons name="log-out-outline" size={24} color="#000" />
                            <Text style={styles.iconLabel}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                ),
            }}
        >
            <Drawer.Screen
                name="Shipper"
                component={MainShipperLandingPageContent}
                options={{
                    drawerIcon: ({ color }) => <Ionicons name="car" size={24} color={color} />,
                    drawerLabel: "Shipper",
                }}
            />
            <Drawer.Screen
                name="Account"
                component={() => (
                    <View style={styles.screen}>
                        <Text>Account Page</Text>
                    </View>
                )}
                options={{
                    drawerIcon: ({ color }) => <Ionicons name="key-outline" size={24} color={color} />,
                }}
            />
            <Drawer.Screen
                name="Logout"
                component={() => (
                    <View style={styles.screen}>
                        <Text>Logging out...</Text>
                    </View>
                )}
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
        width: '100%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#ffffff',
        paddingVertical: 0,
        marginBottom: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 6,
        paddingTop: 20
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
        paddingBottom: 7
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
    searchContainer: {
        flexDirection: "row"
    },
    textBox: {
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#ced4da",
        borderWidth: 0.5,
        marginBottom: 20,
        paddingHorizontal: 15,
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
        marginRight: 10,
    },
    searchBar: {
        flex: 1,
        fontSize: 16,
        color: "#000",
        paddingHorizontal: 15,
    },
    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    cardWO: {
        flexDirection: 'row',
    },
    greetingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greeting: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1b263b",
    },
    greetingWO: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1b263b",
        marginLeft: 10
    },
    subtext: {
        fontSize: 14,
        color: Colors.fexoOrange,
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
    select: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 7,
    },
    selectText: {
        color: "#1b263b",
        fontSize: 18,
        fontWeight: "600",
    },    
    dropdown: {
        backgroundColor: "transparent",
        borderRadius: 15,
        marginTop: 0,
        paddingVertical: 10,
    },
    dropdownItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    dropdownIcon: {
        marginRight: 8,
        color: "#1b263b"
    },
    dropdownItemText: {
        fontSize: 16,
        color: "#1b263b",
        fontWeight: "500",
    },
    orangeBar: {
        height: 6,
        backgroundColor: Colors.fexoOrange,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginTop: -20,
        marginHorizontal: -20,
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
    headerIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center', 
        marginRight: 20,
    },
    iconButton: {
        alignItems: 'center',
        marginLeft: 25,
    },
    iconLabel: {
        fontSize: 10,
        color: '#000',
        marginTop: 2,
        textAlign: 'center',
    },
    iconRight: {
        marginLeft: 10, 
        color: "#1b263b", 
    },
});
