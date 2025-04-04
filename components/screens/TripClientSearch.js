import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

const SelectionButton = ({ title, onPress }) => {
    return (
        <Pressable onPress={onPress} style={styles.selectionButton}>
            <Text>{title}</Text>
            <Ionicons name="chevron-down-outline" size={12} color={'black'} />
        </Pressable>
    );
};

export default function TripClientSearch({ route }) { 
    const [selectedClient, setSelectedClient] = useState("");
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const navigation = useNavigation(); 
    const { onClientSelect } = route.params; 

    const clients = ["Client 1", "Client 2", "Client 3", "Client 4", "Client 5"];

    const handleClientSelection = (client) => {
        setSelectedClient(client);
        setIsDropdownVisible(false);
        onClientSelect(client); 
        navigation.goBack(); 
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Search Client</Text>
            
            <View style={styles.selectionContainer}>
                <SelectionButton 
                    title={selectedClient || "Select a client"} 
                    onPress={() => setIsDropdownVisible(!isDropdownVisible)} 
                />
                
                {isDropdownVisible && (
                    <View style={styles.dropdown}>
                        {clients.map((client, index) => (
                            <Pressable 
                                key={index} 
                                style={styles.dropdownItem} 
                                onPress={() => handleClientSelection(client)}
                            >
                                <Text>{client}</Text>
                            </Pressable>
                        ))}
                    </View>
                )}
            </View>

            {selectedClient && (
                <Text style={styles.selectedText}>Selected Client: {selectedClient}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    selectionContainer: {
        width: "100%",
        marginBottom: 20,
        position: 'relative',
    },
    selectionButton: {
        backgroundColor: "white",
        borderColor: "#ced4da",
        borderWidth: 0.5,
        padding: 10,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 8,
    },
    dropdown: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderColor: '#ced4da',
        borderWidth: 0.5,
        borderRadius: 8,
        marginTop: 5,
        padding: 5,
        zIndex: 1000,
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ced4da',
    },
    selectedText: {
        marginTop: 20,
        fontSize: 18,
        color: "green",
    },
});
