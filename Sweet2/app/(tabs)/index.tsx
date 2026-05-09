import { API_KEY, BASE_URL } from "@/constants/ApiConfig";
import { styles } from "@/constants/StyleSheet";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { ThemedView } from "@/components/themed-view";

const { width } = Dimensions.get("window");
const GAP = 16;
const CARD_WIDTH = (width - 40 - GAP) / 2; // Ajuste para el padding horizontal
const PADDING_INTERNO_SCREEN = 20;

const CATEGORIAS_NUEVAS = [
  { id: "4", nombre: "Cupcakes", query: "cupcake" },
  { id: "5", nombre: "Brownies", query: "brownie" },
  { id: "6", nombre: "Donas", query: "donut" },
  { id: "7", nombre: "Macarons", query: "macaron" },
  { id: "8", nombre: "Muffins", query: "muffin" },
];

export default function HomeScreen() {
  const [apiPasteles, setApiPasteles] = useState<any[]>([]);
  const [apiPays, setApiPays] = useState<any[]>([]);
  const [apiGalletas, setApiGalletas] = useState<any[]>([]);
  const [recetasExtra, setRecetasExtra] = useState<any[]>([]);
  const [tituloExtra, setTituloExtra] = useState("");
  const [loadingExtra, setLoadingExtra] = useState(false);

  useEffect(() => {
    fetchRecpes("cake", setApiPasteles);
    fetchRecpes("pie", setApiPays);
    fetchRecpes("cookie", setApiGalletas);
  }, []);

  const fetchRecpes = async (query: string, setter: Function) => {
    try {
      const response = await fetch(`${BASE_URL}?apiKey=${API_KEY}&query=${query}&type=dessert&number=4`);
      const data = await response.json();
      setter(data.results || []);
    } catch (e) {
      console.error("Error al obtener recetas:", e);
    }
  };

  const cargarCategoriaExtra = async (categoria: { nombre: string; query: string }) => {
    if (tituloExtra === categoria.nombre) return; // Evita recargar si ya está seleccionada
    setLoadingExtra(true);
    setTituloExtra(categoria.nombre);
    try {
      const response = await fetch(`${BASE_URL}?apiKey=${API_KEY}&query=${categoria.query}&number=12`);
      const data = await response.json();
      setRecetasExtra(data.results || []);
    } catch (e) {
      console.error("Error al cargar categoría extra:", e);
    } finally {
      setLoadingExtra(false);
    }
  };

  // Se eliminó Math.random() de la key para evitar renders innecesarios
  const renderCard = (title: string, imageSource: any, isApi: boolean = false, id?: string) => (
    <TouchableOpacity
      key={id || title}
      onPress={() => router.push({ pathname: "/receta", params: { title } })}
    >
      <View style={[styles.card, { width: CARD_WIDTH }]}>
        <Image
          source={isApi ? { uri: imageSource } : imageSource}
          style={styles.cardImage}
          contentFit="cover"
        />
        <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={{ flex: 1, paddingTop: 50 }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* --- SECCIÓN EXPLORAR --- */}
        <View style={{ marginTop: 10, marginBottom: 20, paddingHorizontal: PADDING_INTERNO_SCREEN }}>
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "hsl(29, 49%, 59%)", marginBottom: 15 }}>
            Explorar categorías
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: -PADDING_INTERNO_SCREEN }}
            contentContainerStyle={{ paddingHorizontal: PADDING_INTERNO_SCREEN, gap: 10 }}
          >
            {CATEGORIAS_NUEVAS.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => cargarCategoriaExtra(cat)}
                style={{
                  backgroundColor: tituloExtra === cat.nombre ? "hsl(29, 49%, 59%)" : "#f0e6dd",
                  paddingVertical: 10,
                  paddingHorizontal: 25,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: tituloExtra === cat.nombre ? "#fff" : "hsl(29, 49%, 59%)", fontWeight: "bold", fontSize: 14 }}>
                  {cat.nombre}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {loadingExtra ? (
            <ActivityIndicator size="large" color="hsl(29, 49%, 59%)" style={{ marginTop: 20 }} />
          ) : (
            recetasExtra.length > 0 && (
              <View style={{ marginTop: 15 }}>
                <Text style={{ fontSize: 18, fontWeight: "600", color: "#8b5e3c", marginBottom: 10 }}>Resultados de {tituloExtra}</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ marginHorizontal: -PADDING_INTERNO_SCREEN }}
                  contentContainerStyle={{ paddingHorizontal: PADDING_INTERNO_SCREEN, gap: GAP }}
                >
                  {recetasExtra.map((item) => renderCard(item.title, item.image, true, item.id.toString()))}
                </ScrollView>
              </View>
            )
          )}
        </View>

        {/* --- SECCIÓN PASTELES --- */}
        <View style={{ paddingHorizontal: PADDING_INTERNO_SCREEN }}>
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "hsl(29, 49%, 59%)" }}>Pasteles</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: 10, marginHorizontal: -PADDING_INTERNO_SCREEN }}
            contentContainerStyle={{ paddingHorizontal: PADDING_INTERNO_SCREEN, gap: GAP }}
          >
            {renderCard("Red velvet", require("@/assets/images/pastel1.jpg"), false, "local-1")}
            {renderCard("Chocolate", require("@/assets/images/pastel2.jpg"), false, "local-2")}
            {renderCard("Vainilla", require("@/assets/images/pastel3jpg.jpg"), false, "local-3")}
            {apiPasteles.map((item) => renderCard(item.title, item.image, true, item.id.toString()))}
          </ScrollView>
          <TouchableOpacity
            onPress={() => router.push({ pathname: "/categoria/cake", params: { nombre: "Pasteles" } })}
            style={{ alignSelf: "center", backgroundColor: "hsl(29, 49%, 59%)", paddingVertical: 10, paddingHorizontal: 48, borderRadius: 8, marginBottom: 25 }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Ver más</Text>
          </TouchableOpacity>
        </View>

        {/* --- SECCIÓN PAYS --- */}
        <View style={{ paddingHorizontal: PADDING_INTERNO_SCREEN }}>
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "hsl(29, 49%, 59%)" }}>Pays</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: 10, marginHorizontal: -PADDING_INTERNO_SCREEN }}
            contentContainerStyle={{ paddingHorizontal: PADDING_INTERNO_SCREEN, gap: GAP }}
          >
            {renderCard("Pay de Queso", require("@/assets/images/payQueso.jpg"), false, "local-pay1")}
            {apiPays.map((item) => renderCard(item.title, item.image, true, item.id.toString()))}
          </ScrollView>
          <TouchableOpacity
            onPress={() => router.push({ pathname: "/categoria/pie", params: { nombre: "Pays" } })}
            style={{ alignSelf: "center", backgroundColor: "hsl(29, 49%, 59%)", paddingVertical: 10, paddingHorizontal: 48, borderRadius: 8, marginBottom: 25 }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Ver más</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </ThemedView>
  );
}