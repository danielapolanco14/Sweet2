import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router"; // Unificado en una sola línea
import { API_KEY, BASE_URL } from "@/constants/ApiConfig";
import { styles } from "@/constants/StyleSheet";
import { Image } from "expo-image";

const { width } = Dimensions.get("window");
const GAP = 16;
const CARD_WIDTH = (width - 40 - GAP) / 2;

export default function CategoriaScreen() {
    const { tipo, nombre } = useLocalSearchParams();
    // aqui puse   que es un array de cualquier tipo para evitar el error 'never[]' -->por eso no me funcionaba
    const [recetas, setRecetas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    //  'any' al objeto para que acepte buscar por [tipo] sin errores
    const recetasLocales: any = {
        cake: [
            { id: 'l1', title: "Red velvet", image: require("@/assets/images/pastel1.jpg") },
            { id: 'l2', title: "Chocolate", image: require("@/assets/images/pastel2.jpg") },
            { id: 'l3', title: "Vainilla", image: require("@/assets/images/pastel3jpg.jpg") },
            { id: 'l4', title: "Fresa Crema", image: require("@/assets/images/pastel4.jpg") },
        ],
        pie: [
            { id: 'p1', title: "Pay de Queso", image: require("@/assets/images/payQueso.jpg") },
            { id: 'p2', title: "Pay de Limón", image: require("@/assets/images/payLimon.jpg") },
            { id: 'p3', title: "Pay de Manzana", image: require("@/assets/images/payManzana.jpg") },
            { id: 'p4', title: "Pay Frutal", image: require("@/assets/images/payFrutal.jpg") },
        ],
        cookies: [
            { id: 'g1', title: "Galleta de chocolate", image: require("@/assets/images/galletaChoco.jpg") },
            { id: 'g2', title: "Galleta Red velvet", image: require("@/assets/images/GalletaRed.jpg") },
            { id: 'g3', title: "Galleta Biscoff", image: require("@/assets/images/galletaBiscoff.jpg") },
            { id: 'g4', title: "Galleta Pistacho Choco", image: require("@/assets/images/galletaPistacho.jpg") },
        ],
    };

    const fetchData = async () => {
        try {
            const response = await fetch(`${BASE_URL}?apiKey=${API_KEY}&query=${tipo}&type=dessert&number=16`);
            const data = await response.json();

            // Buscamos las locales. Si no hay, array vacío.
            const locales = recetasLocales[tipo as string] || [];

            // CORRECCIÓN: Verificamos que data.results exista antes de unir
            setRecetas([...locales, ...(data.results || [])]);
        } catch (e) {
            console.error("Error en fetch:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [tipo]);

    const renderItem = ({ item }: { item: any }) => {
        // Estilos de las imagenes: Lógica de imagen más robusta para evitar errores de undefined
        const imageSource = item.image?.uri
            ? { uri: item.image.uri }
            : (typeof item.image === 'string' ? { uri: item.image } : item.image);

        return (
            <TouchableOpacity
                style={[styles.card, { width: CARD_WIDTH, marginBottom: GAP }]}
                onPress={() => router.push({ pathname: "/receta", params: { title: item.title } })}
            >
                <Image
                    source={imageSource}
                    style={styles.cardImage}
                />
                <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 }}>
            <Stack.Screen
                options={{
                    headerTitle: "",           // Esto quita el texto "categoria/[tipo]"
                    headerShadowVisible: false,    // Opcional: quita la línea gris de arriba
                    headerTransparent: true,       // Opcional: hace que el fondo sea transparente
                }}
            />
            <Text style={{ fontSize: 28, fontWeight: "bold", marginTop: 50, marginBottom: 20, color: "hsl(29, 49%, 59%)" }}>
                {nombre}
            </Text>

            {loading ? (
                <ActivityIndicator size="large" color="hsl(29, 49%, 59%)" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={recetas}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 30 }}
                />
            )}
        </View>
    );
}