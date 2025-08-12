// NetworkListener.js
import React, { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, ActivityIndicator } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export default function NetworkListener() {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsConnected(state.isConnected);
        });
        return () => unsubscribe();
    }, []);

    return (
        <Modal
            visible={!isConnected}
            transparent
            animationType="fade"
        >
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>No Internet Connection</Text>
                    <Text style={styles.message}>
                        Retrying to connect...
                    </Text>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    message: {
        fontSize: 14,
        textAlign: "center",
    },
});
