import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "./_layout";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();

    const handleLogin = () => {
        if (username.trim() === "") {
            alert("Por favor, ingresa un nombre de usuario.");
            return;
        }
        // Llama a la función login de nuestro AuthContext -- en un caso real, aquí valido  las credenciales el  backend
        login(username);
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <View style={styles.iconBox}>
                    <Ionicons name="restaurant" size={50} color="white" />
                </View>
                <Text style={styles.title}>Sweet2</Text>
                <Text style={styles.subtitle}>REPOSTERÍA ARTESANAL</Text>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>NOMBRE DE USUARIO</Text>
                <TextInput
                    style={styles.input}
                    placeholder="dani_chef"
                    placeholderTextColor="#a09080"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>CONTRASEÑA</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={[styles.input, { flex: 1, backgroundColor: "transparent" }]}
                        placeholder="********"
                        placeholderTextColor="#a09080"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Ionicons name="eye-outline" size={20} color="#888" style={{ marginRight: 15 }} />
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.label}>Registrarte</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fdfaf6", // Color crema claro de fondo para que no quede blanco plano
        padding: 30,
        justifyContent: "center"
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 50
    },
    iconBox: {
        backgroundColor: "#d6834c",
        padding: 20,
        borderRadius: 25,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 42,
        fontWeight: "bold",
        color: "#b58d63",
    },
    subtitle: {
        fontSize: 12,
        color: "#888",
        letterSpacing: 2,
        marginTop: 5,
    },
    inputGroup: {
        marginBottom: 25
    },
    label: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#8b5e3c",
        marginBottom: 8,
        letterSpacing: 1
    },
    input: {
        backgroundColor: "#f5f0eb",
        padding: 15,
        borderRadius: 12,
        fontSize: 16,
        color: "#333",
    },
    passwordContainer: {
        backgroundColor: "#f5f0eb",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center"
    },
    button: {
        backgroundColor: "#d6834c",
        padding: 18,
        borderRadius: 15,
        alignItems: "center",
        marginTop: 20,
        shadowColor: "#d6834c",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    }
});