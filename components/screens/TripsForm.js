import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Pressable,
    Switch,
    SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../globals/colors";
import { useNavigation } from "@react-navigation/native";

const SelectionButton = ({ titleDefault, titleSelected, onPress }) => {
    return (
        <Pressable onPress={onPress} style={styles.selectionButton}>
            <Text style={styles.selectionButtonText}>
                {titleSelected ? titleSelected : titleDefault}
            </Text>
            <Ionicons name="chevron-down-outline" size={16} color="#1b263b" />
        </Pressable>
    );
};

const TripForm = () => {
    const navigation = useNavigation();
    const [isTransitToCustom, setIsTransitToCustom] = useState(false);
    const [isIncludeReturnTrip, setIsIncludeReturnTrip] = useState(false);
    const [unitCount, setUnitCount] = useState(1);

    const [tripData, setTripData] = useState({
        reference: "",
        client_name: "",
        option2: "",
        option3: "",
        option4: "",
        unitReference: "",
        notes: "",
    });

    const handleChangeReference = (text) => {
        setTripData({ ...tripData, reference: text });
    };

    const handleClientSelection = () => {
        navigation.navigate("ClientSearch", {
            onClientSelect: handleClientSelect,
        });
    };

    const handleClientSelect = (client) => {
        if (client) {
            setTripData((prev) => ({ ...prev, client_name: client }));
        }
    };

    const handleSelection2 = (selectedValue) => {
        setTripData((prev) => ({ ...prev, option2: selectedValue }));
    };

    const handleSelection3 = (selectedValue) => {
        setTripData((prev) => ({ ...prev, option3: selectedValue }));
    };

    const handleSelection4 = (selectedValue) => {
        setTripData((prev) => ({ ...prev, option4: selectedValue }));
    };

    const handleUnitReferenceChange = (text) => {
        setTripData({ ...tripData, unitReference: text });
    };

    const handleNotesChange = (text) => {
        setTripData({ ...tripData, notes: text });
    };

    const handleCreateOrder = async () => {
        try {
            const url =
                "http://localhost:8080/?api_key=Z1Y5yvAIwxfVOzHn444W4BO2bf8YIqmM-rsZUXGuCV8=";
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Accept: "text/plain",
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            const result = await response.text();
            console.log("Respuesta del servidor:", result);
            alert(result);
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    };

    const handleReset = () => {
        setTripData({
            reference: "",
            client_name: "",
            option2: "",
            option3: "",
            option4: "",
            unitReference: "",
            notes: "",
        });
        setUnitCount(1);
        setIsTransitToCustom(false);
        setIsIncludeReturnTrip(false);
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -500}
            >
                <ScrollView style={styles.container}>
                    {/* Trip Details Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Trip Details</Text>
                        <View style={styles.card}>
                            <TextInput
                                placeholder="Reference (Optional)"
                                value={tripData.reference}
                                onChangeText={handleChangeReference}
                                style={styles.textInput}
                            />
                            <SelectionButton
                                titleDefault="Select Client"
                                titleSelected={tripData.client_name}
                                onPress={handleClientSelection}
                            />
                            <SelectionButton
                                titleDefault="Select Cargo"
                                titleSelected={tripData.option2}
                                onPress={() => handleSelection2("Cargo A")}
                            />
                            <SelectionButton
                                titleDefault="Select Container"
                                titleSelected={tripData.option3}
                                onPress={() => handleSelection3("Container B")}
                            />
                            <SelectionButton
                                titleDefault="Select Vehicle Type"
                                titleSelected={tripData.option4}
                                onPress={() => handleSelection4("Truck")}
                            />
                            <View style={styles.switchRow}>
                                <Switch
                                    value={isTransitToCustom}
                                    onValueChange={(value) => setIsTransitToCustom(value)}
                                    trackColor={{ false: "#d3d3d3", true: Colors.fexoOrange }}
                                    thumbColor="#ffffff"
                                />
                                <Text style={styles.switchLabel}>Transit to Custom</Text>
                            </View>
                            <View style={styles.switchRow}>
                                <Switch
                                    value={isIncludeReturnTrip}
                                    onValueChange={(value) => setIsIncludeReturnTrip(value)}
                                    trackColor={{ false: "#d3d3d3", true: Colors.fexoOrange }}
                                    thumbColor="#ffffff"
                                />
                                <Text style={styles.switchLabel}>Include Return Trip</Text>
                            </View>
                        </View>
                    </View>

                    {/* Pickup Details Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Pickup Details</Text>
                        <View style={styles.card}>
                            <View style={styles.textInput}>
                                <Text style={styles.inputLabel}>Pickup Location</Text>
                            </View>
                            <View style={styles.textInput}>
                                <Text style={styles.inputSubLabel}>Pickup Expiration Date</Text>
                                <Text style={styles.inputText}>4/1/2025</Text>
                            </View>
                            <View style={styles.textInput}>
                                <Text style={styles.inputSubLabel}>Pickup Expiration Time</Text>
                                <Text style={styles.inputText}>16:40</Text>
                            </View>
                        </View>
                    </View>

                    {/* Dropoff Details Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Dropoff Details</Text>
                        <View style={styles.card}>
                            <View style={styles.textInput}>
                                <Text style={styles.inputLabel}>Dropoff Location</Text>
                            </View>
                            <View style={styles.textInput}>
                                <Text style={styles.inputSubLabel}>Dropoff Expiration Date</Text>
                                <Text style={styles.inputText}>4/1/2025</Text>
                            </View>
                            <View style={styles.textInput}>
                                <Text style={styles.inputSubLabel}>Dropoff Expiration Time</Text>
                                <Text style={styles.inputText}>16:40</Text>
                            </View>
                        </View>
                    </View>

                    {/* Add Return Button */}
                    <View style={styles.section}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.actionButton,
                                { backgroundColor: "#10B981" },
                                pressed && styles.buttonPressed,
                            ]}
                        >
                            <Text style={styles.buttonText}>Add Return</Text>
                        </Pressable>
                    </View>

                    {/* Units Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Units</Text>
                        <View style={styles.card}>
                            <View style={styles.unitRow}>
                                <Text style={styles.unitLabel}>Units ID:</Text>
                                <TextInput
                                    placeholder="Unit Reference"
                                    value={tripData.unitReference}
                                    onChangeText={handleUnitReferenceChange}
                                    style={styles.unitInput}
                                />
                            </View>
                            <View style={styles.tripsButtonGroup}>
                                <Text style={styles.tripsLabel}>Number of Units</Text>
                                <Pressable onPress={() => setUnitCount(Math.max(1, unitCount - 1))}>
                                    <Ionicons name="remove" size={20} color="#1b263b" />
                                </Pressable>
                                <Text style={styles.unitCount}>{unitCount}</Text>
                                <Pressable onPress={() => setUnitCount(unitCount + 1)}>
                                    <Ionicons name="add" size={20} color="#1b263b" />
                                </Pressable>
                            </View>
                        </View>
                    </View>

                    {/* Notes Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Notes</Text>
                        <View style={styles.card}>
                            <TextInput
                                placeholder="Text..."
                                value={tripData.notes}
                                onChangeText={handleNotesChange}
                                style={[styles.textInput, { height: 100 }]}
                                multiline
                            />
                        </View>
                    </View>

                    {/* Estimated Order Cost */}
                    <View style={styles.section}>
                        <View style={styles.costSection}>
                            <Text style={styles.costLabel}>Estimated Order Cost</Text>
                            <Text style={styles.costValue}>$0.00</Text>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.buttonGroup}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.actionButton,
                                pressed && styles.buttonPressed,
                            ]}
                            onPress={handleCreateOrder}
                        >
                            <Text style={styles.buttonText}>Create Order</Text>
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [
                                styles.actionButton,
                                { backgroundColor: Colors.fexoGrey },
                                pressed && styles.buttonPressed,
                            ]}
                            onPress={handleReset}
                        >
                            <Text style={styles.buttonText}>Reset</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "#f5f7fa", 
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1b263b",
        marginLeft: 10,
    },
   
    section: {
        marginBottom: 20,
        marginTop: 20
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1b263b",
        marginBottom: 15,
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    // Input Styles
    textInput: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#d3d3d3",
        padding: 15,
        marginBottom: 10,
        fontSize: 16,
        color: "#1b263b",
    },
    inputLabel: {
        fontSize: 16,
        color: "#1b263b",
    },
    inputSubLabel: {
        fontSize: 12,
        color: "#666",
        marginBottom: 5,
    },
    inputText: {
        fontSize: 16,
        color: "#1b263b",
    },

    selectionButton: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#d3d3d3",
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    selectionButtonText: {
        fontSize: 16,
        color: "#1b263b",
    },
   
    switchRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    switchLabel: {
        fontSize: 16,
        color: "#1b263b",
        marginLeft: 10,
    },
    
    unitRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    unitLabel: {
        fontSize: 16,
        fontWeight: "500",
        color: "#1b263b",
        marginRight: 10,
    },
    unitInput: {
        flex: 1,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#d3d3d3",
        padding: 15,
        fontSize: 16,
        color: "#1b263b",
    },
    tripsButtonGroup: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
    },
    tripsLabel: {
        fontSize: 16,
        fontWeight: "500",
        color: "#1b263b",
    },
    unitCount: {
        fontSize: 16,
        color: "#1b263b",
    },
    
    costSection: {
        backgroundColor: "#ffffff",
        borderRadius: 15,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    costLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1b263b",
    },
    costValue: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#10B981",
    },
    
    actionButton: {
        backgroundColor: Colors.fexoOrange,
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: "center",
        flex: 1,
        marginHorizontal: 5,
    },
    buttonPressed: {
        backgroundColor: "#e07b39", 
        opacity: 0.9,
    },
    buttonText: {
        color: Colors.fexoWhite,
        fontSize: 16,
        fontWeight: "600",
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
});

export default TripForm;