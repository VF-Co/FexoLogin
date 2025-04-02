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

const SelectionButton = ({ titleDefault, titleSelected, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={{
                backgroundColor: "white",
                borderColor: "#d3d3d3",
                borderWidth: 1,
                marginBottom: 10,
                padding: 10,
                justifyContent: "center",
        }}
        >
        <Text>{titleSelected ? titleSelected : titleDefault}</Text>
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
                <View>
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
                    }}
                />
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
                    <Text style={{ marginRight: 10, color: "#0096c7" }}>
                    Transit to Custom
                    </Text>
                    <Switch
                    value={isTransitToCustom}
                    onValueChange={(value) => setIsTransitToCustom(value)}
                    />
                </View>
                <View
                    style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                    }}
                >
                    <Text style={{ marginRight: 10, color: "#0096c7" }}>
                    Include Return Trip
                    </Text>
                    <Switch
                    value={isIncludeReturnTrip}
                    onValueChange={(value) => setIsIncludeReturnTrip(value)}
                    />
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
                    backgroundColor: "#e5e5e5",
                    borderWidth: 1,
                    marginBottom: 10,
                    padding: 20,
                    }}
                />
                <TextInput
                    label="Reference (Optional)"
                    value={tripData.reference}
                    onChangeText={handleChangeReference}
                    style={{
                    borderColor: "#d3d3d3",
                    backgroundColor: "#e5e5e5",
                    borderWidth: 1,
                    marginBottom: 10,
                    padding: 20,
                    }}
                />
                <TextInput
                    label="Reference (Optional)"
                    value={tripData.reference}
                    onChangeText={handleChangeReference}
                    style={{
                    borderColor: "#d3d3d3",
                    backgroundColor: "#e5e5e5",
                    borderWidth: 1,
                    marginBottom: 10,
                    padding: 20,
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
                    backgroundColor: "#e5e5e5",
                    borderWidth: 1,
                    marginBottom: 10,
                    padding: 20,
                    }}
                />
                <TextInput
                    label="Reference (Optional)"
                    value={tripData.reference}
                    onChangeText={handleChangeReference}
                    style={{
                    borderColor: "#d3d3d3",
                    backgroundColor: "#e5e5e5",
                    borderWidth: 1,
                    marginBottom: 10,
                    padding: 20,
                    }}
                />
                <TextInput
                    label="Reference (Optional)"
                    value={tripData.reference}
                    onChangeText={handleChangeReference}
                    style={{
                    borderColor: "#d3d3d3",
                    backgroundColor: "#e5e5e5",
                    borderWidth: 1,
                    marginBottom: 10,
                    padding: 20,
                    }}
                />
                </View>
                <View>
                    <Pressable
                        style={{
                        borderRadius: 35,
                        backgroundColor: "#007200",
                        padding: 10,
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
                    <View style={{flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
                        <Text>Units ID: </Text>
                    </View>
                    <TextInput
                        label={`Unit Reference`}
                        style={{flex: 0.8, marginLeft: 10, backgroundColor: 'white', marginBottom: 7, marginTop: 7, padding: 15, borderColor: '#d3d3d3', borderWidth: 1,}}
                    />
                </View>
                <TextInput
                    titleDefault= 'Notes'
                    style={{flex: 1, marginLeft: 10, backgroundColor: 'white', marginBottom: 7, marginTop: 7, padding: 25, borderColor: '#d3d3d3', borderWidth: 1,}}
                />
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Pressable
                        style={{
                            borderRadius: 35,
                            backgroundColor: "#0096c7",
                            padding: 10,
                            width: '40%',
                            marginRight: 10
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
                        backgroundColor: "#6c757d",
                        padding: 10,
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
    
});

export default TripForm;
