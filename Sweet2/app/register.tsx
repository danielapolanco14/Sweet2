// Esta pantalla es para el registro de nuevos usarios 
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RegisterScreen() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = () => {

        if (username.trim() === "") {
            alert("Por favor, ingresa un nombre de usuario.");
            return;
        }
        if (email.trim() === "") {
            alert("Por favor, ingresa un correo electrónico.");
            return;
        }
        if (password.trim() === "") {
            alert("Por favor, ingresa una contraseña.");
            return;
        }
        // Aquí podrías agregar lógica para registrar al usuario en tu backend
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        router.replace("/login"); // Redirige a la pantalla de login después del registro
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <View style={styles.iconBox}>
                    <Ionicons name="restaurant" size={50} color="white" />
                </View>
                <Text style={styles.title}>Sweet2</Text>
                <Text style={styles.subtitle}>REGISTRAR</Text>
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
                <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
                <TextInput
                    style={styles.input}
                    placeholder="dani_chef@gmail.com"
                    placeholderTextColor="#a09080"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
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
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.replace("/login")}>
                <Text style={styles.label}>¿Ya tienes una cuenta? Inicia sesión</Text>
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