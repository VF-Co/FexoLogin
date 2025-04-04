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
import { useNavigation } from "@react-navigation/native";


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
        option2: "",
        option3: "",
        option4: "",
    });

    const handleChangeReference = (text) => {
        setTripData({ ...tripData, reference: text });
    };

    const handleClientSelection = () => {
        navigation.navigate('ClientSearch', {
            onClientSelect: handleClientSelect
        });
    };

    const handleClientSelect = (client) => {
        if (client) { 
            setTripData(prev => ({ ...prev, client_name: client }));
        }
    };

    const handleSelection2 = (selectedValue) => {
        setTripData(prev => ({ ...prev, option2: selectedValue }));
    };

    const handleSelection3 = (selectedValue) => {
        setTripData(prev => ({ ...prev, option3: selectedValue }));
    };

    const handleSelection4 = (selectedValue) => {
        setTripData(prev => ({ ...prev, option4: selectedValue }));
    };

    const handleCreateOrder = async () => {
        try {
            const url = 'http://192.168.0.13:8080/?api_key=2ykXL4kVlh-Na74_I0paex5BIJ3ZJLeGpJOSp4J4q60=';
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'text/plain', // Ajustamos para texto plano
                },
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
    
            const result = await response.text(); // Usamos text() porque es texto plano
            console.log('Respuesta del servidor:', result);
            alert(result); // Mostrará "Hello, World!" si todo está bien
        } catch (error) {
            console.error('Error:', error);
            alert(error.message); // Mostrará el error, como "Error 401: Unauthorized..."
        }
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
                    placeholder='Reference (Optional)'
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
                    <View style={{
                            borderColor: "#d3d3d3",
                            backgroundColor: "white",
                            borderWidth: 1,
                            marginBottom: 10,
                            padding: 20,
                            borderRadius: 35,
                        }}
                    >
                        <Text>Pickup Location</Text>
                    </View>
                    <View style={{
                            borderColor: "#d3d3d3",
                            backgroundColor: "white",
                            borderWidth: 1,
                            marginBottom: 10,
                            padding: 15,
                            borderRadius: 35,
                        }}
                    >
                        <Text style={{fontSize: 10, marginBottom: 2}}>Pickup Expiration Date</Text>
                        <Text>4/1/2025</Text>
                    </View>
                    <View style={{
                            borderColor: "#d3d3d3",
                            backgroundColor: "white",
                            borderWidth: 1,
                            marginBottom: 10,
                            padding: 15,
                            borderRadius: 35,
                        }}
                    >
                        <Text style={{fontSize: 10, marginBottom: 2}}>Pickup Expiration Time</Text>
                        <Text>16:40</Text>
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
                    <View style={{
                            borderColor: "#d3d3d3",
                            backgroundColor: "white",
                            borderWidth: 1,
                            marginBottom: 10,
                            padding: 20,
                            borderRadius: 35,
                        }}
                    >
                        <Text>Dropoff Location</Text>
                    </View>
                    <View style={{
                            borderColor: "#d3d3d3",
                            backgroundColor: "white",
                            borderWidth: 1,
                            marginBottom: 10,
                            padding: 15,
                            borderRadius: 35,
                        }}
                    >
                        <Text style={{fontSize: 10, marginBottom: 2}}>Dropoff Expiration Date</Text>
                        <Text>4/1/2025</Text>
                    </View>
                    <View style={{
                            borderColor: "#d3d3d3",
                            backgroundColor: "white",
                            borderWidth: 1,
                            marginBottom: 10,
                            padding: 15,
                            borderRadius: 35,
                        }}
                    >
                        <Text style={{fontSize: 10, marginBottom: 2}}>Pickup Expiration Time</Text>
                        <Text>16:40</Text>
                    </View>
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
                        onPress={handleCreateOrder}
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
