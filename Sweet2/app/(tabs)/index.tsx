import { API_KEY, BASE_URL } from "@/constants/ApiConfig";
import NavBar from "@/components/navBar";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { imageStyles } from "@/constants/imageStyles";
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

const { width } = Dimensions.get("window");
const GAP = 16;
const CARD_WIDTH = (width - GAP) / 2;
const PADDING_INTERNO_SCREEN = 20;

// Categorías para la sección Explorar
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
    setLoadingExtra(true);
    setTituloExtra(categoria.nombre);
    try {
      const response = await fetch(`${BASE_URL}?apiKey=${API_KEY}&query=${categoria.query}&language=es&number=12`); const data = await response.json();
      setRecetasExtra(data.results || []);
    } catch (e) {
      console.error("Error al cargar categoría extra:", e);
    } finally {
      setLoadingExtra(false);
    }
  };

  const renderCard = (title: string, imageSource: any, isApi: boolean = false) => (
    <TouchableOpacity
      key={title + Math.random()}
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
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#f8d6af", dark: "#d8c3a3" }}
      headerImage={
        <View style={imageStyles.headerImageContainer}>
          <Image source={require("@/assets/images/homepastel.jpg")} style={imageStyles.headerImage} />
          <NavBar />
        </View>
      }
    >
      {/* Sección Pasteles */}
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "hsl(29, 49%, 59%)" }}>Pasteles</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 10, marginHorizontal: -PADDING_INTERNO_SCREEN }}
          contentContainerStyle={{ paddingHorizontal: PADDING_INTERNO_SCREEN, gap: GAP }}
        >
          {renderCard("Red velvet", require("@/assets/images/pastel1.jpg"))}
          {renderCard("Chocolate", require("@/assets/images/pastel2.jpg"))}
          {renderCard("Vainilla", require("@/assets/images/pastel3jpg.jpg"))}
          {renderCard("Fresa Crema", require("@/assets/images/pastel4.jpg"))}

          {apiPasteles.map((item) => renderCard(item.title, item.image, true))}
        </ScrollView>
        <TouchableOpacity
          onPress={() => router.push({ pathname: "/categoria/cake", params: { nombre: "Pasteles" } })}
          style={{ alignSelf: "center", backgroundColor: "hsl(29, 49%, 59%)", paddingVertical: 10, paddingHorizontal: 48, borderRadius: 8 }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Ver más</Text>
        </TouchableOpacity>
      </View>

      {/* Sección Pays */}
      <View style={{ marginTop: 25 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "hsl(29, 49%, 59%)" }}>Pays</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 10, marginHorizontal: -PADDING_INTERNO_SCREEN }}
          contentContainerStyle={{ paddingHorizontal: PADDING_INTERNO_SCREEN, gap: GAP }}
        >
          {renderCard("Pay de Queso", require("@/assets/images/payQueso.jpg"))}
          {renderCard("Pay de Limón", require("@/assets/images/payLimon.jpg"))}
          {renderCard("Pay de Manzana", require("@/assets/images/payManzana.jpg"))}
          {renderCard("Pay Frutal", require("@/assets/images/payFrutal.jpg"))}
          {apiPays.map((item) => renderCard(item.title, item.image, true))}
        </ScrollView>
        <TouchableOpacity
          onPress={() => router.push({ pathname: "/categoria/pie", params: { nombre: "Pays" } })}
          style={{ alignSelf: "center", backgroundColor: "hsl(29, 49%, 59%)", paddingVertical: 10, paddingHorizontal: 48, borderRadius: 8 }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Ver más</Text>
        </TouchableOpacity>
      </View>

      {/* Sección Galletas */}
      <View style={{ marginTop: 25 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "hsl(29, 49%, 59%)" }}>Galletas</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 10, marginHorizontal: -PADDING_INTERNO_SCREEN }}
          contentContainerStyle={{ paddingHorizontal: PADDING_INTERNO_SCREEN, gap: GAP }}
        >
          {renderCard("Galleta de chocolate", require("@/assets/images/galletaChoco.jpg"))}
          {renderCard("Galleta Red velvet", require("@/assets/images/GalletaRed.jpg"))}
          {renderCard("Galleta Biscoff", require("@/assets/images/galletaBiscoff.jpg"))}
          {renderCard("Galleta Pistacho Choco", require("@/assets/images/galletaPistacho.jpg"))}
          {apiGalletas.map((item) => renderCard(item.title, item.image, true))}
        </ScrollView>
        <TouchableOpacity
          onPress={() => router.push({ pathname: "/categoria/cookies", params: { nombre: "Galletas" } })}
          style={{ alignSelf: "center", backgroundColor: "hsl(29, 49%, 59%)", paddingVertical: 10, paddingHorizontal: 48, borderRadius: 8 }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Ver más</Text>
        </TouchableOpacity>
      </View>

      {/* SECCIÓN EXPLORAR MÁS */}
      <View style={{ marginTop: 25, marginBottom: 30 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "hsl(29, 49%, 59%)", marginBottom: 15 }}>
          Explorar más categorías
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: -PADDING_INTERNO_SCREEN }}
          contentContainerStyle={{ paddingHorizontal: PADDING_INTERNO_SCREEN, gap: 10, paddingBottom: 15 }}
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
              <Text style={{ color: tituloExtra === cat.nombre ? "#fff" : "hsl(29, 49%, 59%)", fontWeight: "bold", fontSize: 16 }}>
                {cat.nombre}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {loadingExtra ? (
          <ActivityIndicator size="large" color="hsl(29, 49%, 59%)" style={{ marginTop: 20 }} />
        ) : (
          recetasExtra.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginVertical: 10, marginHorizontal: -PADDING_INTERNO_SCREEN }}
              contentContainerStyle={{ paddingHorizontal: PADDING_INTERNO_SCREEN, gap: GAP }}
            >
              {recetasExtra.map((item) => renderCard(item.title, item.image, true))}
            </ScrollView>
          )
        )}
      </View>
    </ParallaxScrollView>
  );
}