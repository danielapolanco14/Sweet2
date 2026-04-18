import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Alert
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Necesitas instalar: npx expo install @react-native-picker/picker  por eso no me jalaba ya no lo instales tu ya viene en el proyecto no borrar este comentario
import * as ImagePicker from "expo-image-picker"; // Necesitas instalar: npx expo install expo-image-picker
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function CrearRecetaScreen() {
    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("Pasteles");
    const [ingredientes, setIngredientes] = useState("");
    const [preparacion, setPreparacion] = useState("");
    const [imagen, setImagen] = useState<string | null>(null);

    const categoriasApp = [
        "Pasteles", "Pays", "Galletas", "Cupcakes",
        "Brownies", "Panadería", "Postres Fríos"
    ];

    const seleccionarImagen = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImagen(result.assets[0].uri);
        }
    };

    const guardarReceta = () => {
        if (!nombre || !ingredientes || !preparacion) {
            Alert.alert("¡Ups!", "Por favor llena todos los campos antes de hornear.");
            return;
        }
        //  logica para guardar en PostgreSQL o local
        console.log({ nombre, categoria, ingredientes, preparacion, imagen });
        Alert.alert("¡Éxito!", "Tu receta se ha guardado correctamente.");
        router.back();
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <Text style={styles.header}>Nueva Creación</Text>

            <View style={styles.form}>
                {/* Nombre de la Receta */}
                <Text style={styles.label}>Nombre de la receta:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej. Pastel de Elote"
                    value={nombre}
                    onChangeText={setNombre}
                />

                {/* Catego (Picker) */}
                <Text style={styles.label}>Categoría:</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={categoria}
                        onValueChange={(itemValue) => setCategoria(itemValue)}
                        style={styles.picker}
                    >
                        {categoriasApp.map((cat) => (
                            <Picker.Item key={cat} label={cat} value={cat} />
                        ))}
                    </Picker>
                </View>

                {/* Ingredientes */}
                <Text style={styles.label}>Ingredientes:</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Escribe cada ingrediente..."
                    multiline
                    numberOfLines={4}
                    value={ingredientes}
                    onChangeText={setIngredientes}
                />

                {/* Preparacion */}
                <Text style={styles.label}>Preparación:</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="¿Cómo se hace la magia?..."
                    multiline
                    numberOfLines={6}
                    value={preparacion}
                    onChangeText={setPreparacion}
                />

                {/* Subir Foto aqui */}
                <Text style={styles.label}>Foto de la receta:</Text>
                <TouchableOpacity style={styles.imagePickerBtn} onPress={seleccionarImagen}>
                    {imagen ? (
                        <Image source={{ uri: imagen }} style={styles.previewImage} />
                    ) : (
                        <View style={styles.placeholder}>
                            <Ionicons name="camera-outline" size={40} color="#D4A373" />
                            <Text style={{ color: "#D4A373" }}>Toca para subir foto</Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* es el boton guardar */}
                <TouchableOpacity style={styles.saveBtn} onPress={guardarReceta}>
                    <Text style={styles.saveBtnText}>Guardar Receta</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
// estilos

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#573011",
        marginTop: 60,
        textAlign: "center"
    },
    form: { padding: 25 },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#D4A373",
        marginBottom: 8,
        marginTop: 15
    },
    input: {
        backgroundColor: "#F9F9F9",
        borderRadius: 12,
        padding: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#EEE",
        color: "#333",
    },
    textArea: { textAlignVertical: "top", minHeight: 100 },
    pickerContainer: {
        backgroundColor: "#F9F9F9",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#EEE",
        overflow: "hidden",
    },
    picker: { height: 50, width: "100%" },
    imagePickerBtn: {
        marginTop: 10,
        height: 200,
        borderRadius: 20, // Igual que tus cards
        backgroundColor: "#FDFBF7",
        borderWidth: 2,
        borderColor: "#D4A373",
        borderStyle: "dashed",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    previewImage: { width: "100%", height: "100%" },
    placeholder: { alignItems: "center" },
    saveBtn: {
        backgroundColor: "hsl(29, 49%, 59%)",
        borderRadius: 12,
        padding: 18,
        marginTop: 30,
        alignItems: "center",
        elevation: 4,
    },
    saveBtnText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});