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
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../globals/colors';


const SelectionButton = ({ titleDefault, titleSelected, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={{
                backgroundColor: "white",
                borderColor: "#ced4da",
                borderWidth: 0.2,
                // marginBottom: 10,
                padding: 10,
                flexDirection: 'row',
                justifyContent: "space-between",
                alignItems: 'center'
        }}
        >
        <Text>{titleSelected ? titleSelected : titleDefault}</Text>
        <Ionicons name="chevron-down-outline" size={12} color={'black'}/>
        </Pressable>
    );
    };

const TripForm = ({ navigation }) => {
    const [isTransitToCustom, setIsTransitToCustom] = useState(false);
    const [isIncludeReturnTrip, setIsIncludeReturnTrip] = useState(false);

    const [tripData, setTripData] = useState({
        reference: "",
        client_name: "",
        // Agregar aquí los estados para los otros botones de selección
    });

    const handleChangeReference = (text) => {
        setTripData({ ...tripData, reference: text });
    };

    const handleClientSelection = (selectedClient) => {
        setTripData({ ...tripData, client_name: selectedClient });
    };

    const handleSelection2 = (selectedValue) => {
        console.log(selectedValue);
    };

    const handleSelection3 = (selectedValue) => {
        console.log(selectedValue);
    };

    const handleSelection4 = (selectedValue) => {
        console.log(selectedValue);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
            style={{ flex: 1, padding: 20 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -500}
            >
            <ScrollView>
                {/* Contenido del formulario */}
                <TextInput
                    label="Reference (Optional)"
                    value={tripData.reference}
                    onChangeText={handleChangeReference}
                    style={{
                    borderColor: "#d3d3d3",
                    backgroundColor: "white",
                    borderWidth: 1,
                    marginBottom: 10,
                    padding: 20,
                    borderRadius: 35,
                    }}
                />
                <View style={{
                        marginBottom: 10,
                        borderRadius: 15, 
                        overflow: "hidden", 
                        borderWidth: 1, 
                        borderColor: "#ced4da", 
                    }}>
                    <SelectionButton
                        titleDefault="Select Client"
                        titleSelected={tripData.client_name}
                        onPress={() => handleClientSelection("Client A")}
                    />
                    <SelectionButton
                        titleDefault="Select Option 2"
                        titleSelected={tripData.option2}
                        onPress={() => handleSelection2("Option 2 Selected")}
                    />
                    <SelectionButton
                        titleDefault="Select Option 3"
                        titleSelected={tripData.option3}
                        onPress={() => handleSelection3("Option 3 Selected")}
                    />
                    <SelectionButton
                        titleDefault="Select Option 4"
                        titleSelected={tripData.option4}
                        onPress={() => handleSelection4("Option 4 Selected")}
                    />
                </View>
                <View>
                <View
                    style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                    }}
                >
                    <Switch
                    value={isTransitToCustom}
                    onValueChange={(value) => setIsTransitToCustom(value)}
                    />
                    <Text style={{ marginLeft: 10, color: "#000" }}>
                    Transit to Custom
                    </Text>
                </View>
                <View
                    style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                    }}
                >
                    <Switch
                    value={isIncludeReturnTrip}
                    onValueChange={(value) => setIsIncludeReturnTrip(value)}
                    />
                    <Text style={{ marginLeft: 10, color: "#000" }}>
                    Include Return Trip
                    </Text>
                </View>
                </View>
                <View
                style={{
                    marginTop: 25,
                    borderTopColor: "#adb5bd",
                    borderTopWidth: 1,
                    paddingTop: 15,
                }}
                >
                <TextInput
                    label="Reference (Optional)"
                    value={tripData.reference}
                    onChangeText={handleChangeReference}
                    style={{
                        borderColor: "#d3d3d3",
                        backgroundColor: "white",
                        borderWidth: 1,
                        marginBottom: 10,
                        padding: 20,
                        borderRadius: 35,
                    }}
                />
                <TextInput
                    label="Reference (Optional)"
                    value={tripData.reference}
                    onChangeText={handleChangeReference}
                    style={{
                        borderColor: "#d3d3d3",
                        backgroundColor: "white",
                        borderWidth: 1,
                        marginBottom: 10,
                        padding: 20,
                        borderRadius: 35,
                    }}
                />
                <TextInput
                    label="Reference (Optional)"
                    value={tripData.reference}
                    onChangeText={handleChangeReference}
                    style={{
                        borderColor: "#d3d3d3",
                        backgroundColor: "white",
                        borderWidth: 1,
                        marginBottom: 10,
                        padding: 20,
                        borderRadius: 35,
                    }}
                />
                </View>
                <View
                style={{
                    marginTop: 25,
                    borderTopColor: "#adb5bd",
                    borderTopWidth: 1,
                    paddingTop: 15,
                }}
                >
                <TextInput
                    label="Reference (Optional)"
                    value={tripData.reference}
                    onChangeText={handleChangeReference}
                    style={{
                        borderColor: "#d3d3d3",
                        backgroundColor: "white",
                        borderWidth: 1,
                        marginBottom: 10,
                        padding: 20,
                        borderRadius: 35,
                    }}
                />
                <TextInput
                    label="Reference (Optional)"
                    value={tripData.reference}
                    onChangeText={handleChangeReference}
                    style={{
                        borderColor: "#d3d3d3",
                        backgroundColor: "white",
                        borderWidth: 1,
                        marginBottom: 10,
                        padding: 20,
                        borderRadius: 35,
                    }}
                />
                <TextInput
                    label="Reference (Optional)"
                    value={tripData.reference}
                    onChangeText={handleChangeReference}
                    style={{
                        borderColor: "#d3d3d3",
                        backgroundColor: "white",
                        borderWidth: 1,
                        marginBottom: 10,
                        padding: 20,
                        borderRadius: 35,
                    }}
                />
                </View>
                <View>
                    <Pressable
                        style={{
                        borderRadius: 35,
                        backgroundColor: "#10B981",
                        padding: 15,
                        }}
                    >
                        <Text
                        style={{
                            color: "white",
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                        >
                        Add Return
                        </Text>
                    </Pressable>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
                    <View style={{flex: 0.3, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 20}}>Units ID: </Text>
                    </View>
                    <TextInput
                        label={`Unit Reference`}
                        style={{
                            flex: 0.7, 
                            marginLeft: 10, 
                            backgroundColor: 'white', 
                            marginBottom: 7, 
                            marginTop: 7, 
                            padding: 15, 
                            borderColor: '#d3d3d3', 
                            borderWidth: 1, 
                            borderRadius: 35,
                        }}
                    />
                </View>
                <TextInput
                    titleDefault= 'Notes'
                    style={{flex: 1, 
                        marginLeft: 10, 
                        backgroundColor: 'white', 
                        marginBottom: 7, 
                        marginTop: 7, 
                        padding: 30, 
                        borderColor: '#d3d3d3', 
                        borderWidth: 1, 
                        borderRadius: 35,
                    }}
                />
                <View style={styles.tripsButtonGroup}>
                    <Text style={styles.tripsLabel}>Number of Units</Text>
                    <Pressable>
                        <Ionicons name="remove" size={20} color={'black'} />
                    </Pressable>
                    <Text >1</Text>
                    <Pressable>
                        <Ionicons name="add" size={20} color={'black'}/>
                    </Pressable>
                </View>
                <View style={styles.costSection}>
                    <Text style={styles.costLabel}>Estimated Order Cost</Text>
                    <Text style={styles.costValue}>
                        $0.00
                    </Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Pressable
                        style={{
                            borderRadius: 35,
                            backgroundColor: Colors.fexoOrange,
                            padding: 15,
                            width: '40%',
                            marginRight: 15
                        }}
                    >
                        <Text
                        style={{
                            color: "white",
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                        >
                        Create Order
                        </Text>
                    </Pressable>
                    <Pressable
                        style={{
                        borderRadius: 35,
                        backgroundColor: Colors.fexoGrey,
                        padding: 15,
                        width: '40%'
                        }}
                    >
                        <Text
                        style={{
                            color: "white",
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                        >
                        Reset
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

// Estilos añadidos para el botón de volver
const styles = StyleSheet.create({
    tripsButtonGroup: {
        flex: 0.7,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginVertical: 25
    },
    tripsLabel: {
        // flex: 0.2,
        textAlign: "center",
        color: 'black',
    },
    costSection: {
        backgroundColor: "#f8f8f8", // Choose a subtle background color that fits your theme
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    costLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.fexoGrey,
    },
    costValue: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#10B981',
    },
});

export default TripForm;
