import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useLocalSearchParams, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { API_KEY, BASE_URL } from "@/constants/ApiConfig";

// 1. Mapeo de tus recetas locales
const RECETAS_LOCALES: any = {
  "Red velvet": {
    image: require("@/assets/images/pastel1.jpg"),
    ingredients: ["2 1/2 tazas de harina", "1 1/2 tazas de azúcar", "Colorante rojo", "Queso crema"],
    steps: "1. Mezclar secos. 2. Añadir líquidos. 3. Hornear a 180°C."
  },


  "Chocolate": {
    image: require("@/assets/images/pastel2.jpg"),
    ingredients: ["200g chocolate amargo", "3 huevos", "100g mantequilla"],
    steps: "1. Derretir chocolate. 2. Mezclar con huevos. 3. Hornear."
  },
  "Vainilla": {
    image: require("@/assets/images/pastel3jpg.jpg"),
    ingredients: ["2 tazas de harina", "1 1/2 tazas de azúcar", "1 taza de leche", "Esencia de vainilla"],
    steps: "1. Mezclar secos. 2. Añadir líquidos. 3. Hornear a 180°C."
  },
  "Fresa Crema": {
    image: require("@/assets/images/pastel4.jpg"),
    ingredients: ["2 tazas de harina", "1 1/2 tazas de azúcar", "1 taza de leche", "Fresas picadas"],
    steps: "1. Mezclar secos. 2. Añadir líquidos y fresas. 3. Hornear a 180°C."
  },
  "Pay de Queso": {
    image: require("@/assets/images/payQueso.jpg"),
    ingredients: ["Base de galleta", "Queso crema", "Leche condensada"],
    steps: "1. Preparar base. 2. Licuar relleno. 3. Hornear y enfriar."
  },
  "Pay de Limón": {
    image: require("@/assets/images/payLimon.jpg"),
    ingredients: ["Base de galleta", "Leche condensada", "Jugo de limón"],
    steps: "1. Preparar base. 2. Mezclar relleno. 3. Hornear y enfriar."
  },
  "Pay de Manzana": {
    image: require("@/assets/images/payManzana.jpg"),
    ingredients: ["Base de galleta", "Manzanas", "Canela", "Azúcar"],
    steps: "1. Preparar base. 2. Cocinar manzanas con canela. 3. Hornear y enfriar."
  },
  "Pay Frutal": {
    image: require("@/assets/images/payFrutal.jpg"),
    ingredients: ["Base de galleta", "Frutas mixtas", "Gelatina sin sabor"],
    steps: "1. Preparar base. 2. Mezclar frutas con gelatina. 3. Hornear y enfriar."
  },
  "Galleta de chocolate": {
    image: require("@/assets/images/galletaChoco.jpg"),
    ingredients: ["Harina", "Chispas de chocolate", "Mantequilla"],
    steps: "1. Hacer masa. 2. Formar bolitas. 3. Hornear 12 min."
  },
  "Galleta Red velvet": {
    image: require("@/assets/images/GalletaRed.jpg"),
    ingredients: ["Harina", "Azúcar", "Colorante rojo", "Mantequilla"],
    steps: "1. Hacer masa. 2. Formar bolitas. 3. Hornear 12 min."
  },
  "Galleta Biscoff": {
    image: require("@/assets/images/galletaBiscoff.jpg"),
    ingredients: ["Harina", "Azúcar morena", "Pasta de speculoos", "Mantequilla"],
    steps: "1. Hacer masa. 2. Formar bolitas. 3. Hornear 12 min."
  },
  "Galleta Pistacho Choco": {
    image: require("@/assets/images/galletaPistacho.jpg"),
    ingredients: ["Harina", "Pistachos picados", "Chispas de chocolate", "Mantequilla"],
    steps: "1. Hacer masa. 2. Formar bolitas. 3. Hornear 12 min."
  },
};

export default function RecetaScreen() {
  const { title } = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    const loadRecipeData = async () => {
      setLoading(true);
      const recipeTitle = Array.isArray(title) ? title[0] : title;

      if (RECETAS_LOCALES[recipeTitle]) {
        const local = RECETAS_LOCALES[recipeTitle];
        setRecipe({
          title: recipeTitle,
          image: local.image,
          ingredients: local.ingredients,
          instructions: local.steps,
          isApi: false
        });
        setLoading(false);
        return;
      }

      try {
        const searchRes = await fetch(`${BASE_URL}?apiKey=${API_KEY}&query=${recipeTitle}&number=1`);
        const searchData = await searchRes.json();

        if (searchData.results && searchData.results.length > 0) {
          const recipeId = searchData.results[0].id;
          const detailRes = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`);
          const detailData = await detailRes.json();

          setRecipe({
            title: detailData.title,
            image: detailData.image,
            ingredients: detailData.extendedIngredients.map((i: any) => i.original),
            instructions: detailData.instructions?.replace(/<[^>]*>?/gm, '') || "Instrucciones en proceso...",
            isApi: true
          });
        }
      } catch (error) {
        console.error("Error API:", error);
        Alert.alert("Error", "No se pudo conectar con el servidor.");
      } finally {
        setLoading(false);
      }
    };

    loadRecipeData();
  }, [title]);

  useEffect(() => {
    const checkStatus = async () => {
      const stored = await AsyncStorage.getItem("mis_favoritos");
      if (stored) {
        const favs = JSON.parse(stored);
        const exists = favs.some((item: any) => item.title === title);
        setIsFavorite(exists);
        animatedValue.value = exists ? 1 : 0;
      }
    };
    checkStatus();
  }, [title]);

  const toggleFavorite = async () => {
    try {
      const stored = await AsyncStorage.getItem("mis_favoritos");
      let favs = stored ? JSON.parse(stored) : [];

      if (isFavorite) {
        favs = favs.filter((item: any) => item.title !== title);
      } else {
        favs.push({ title, image: recipe?.image });
      }

      await AsyncStorage.setItem("mis_favoritos", JSON.stringify(favs));
      animatedValue.value = withSpring(isFavorite ? 0 : 1);
      setIsFavorite(!isFavorite);
    } catch (e) {
      Alert.alert("Error", "No se guardó el favorito");
    }
  }

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    color: interpolateColor(animatedValue.value, [0, 1], ["#555", "#ff4d4d"]),
  }));

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#D4A373" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageWrapper}>
        <Image
          source={recipe?.isApi ? { uri: recipe.image } : recipe?.image}
          style={styles.image}
          contentFit="cover"
        />

        {/* Botón de atrás (Estilo corregido) */}
        <Pressable
          onPress={() => router.back()}
          style={{ position: 'absolute', top: 50, left: 20, backgroundColor: 'rgba(255,255,255,0.8)', padding: 8, borderRadius: 20 }}
        >
          <Ionicons name="arrow-back" size={24} color="#573011" />
        </Pressable>

        {/* Contenedor del Botón de Favorito */}
        <View style={styles.favoriteButtonContainer}>
          <Pressable onPress={toggleFavorite} style={styles.favoriteButton}>
            <Animated.Text style={iconAnimatedStyle}>
              <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={28} color="inherit" />
            </Animated.Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{recipe?.title}</Text>

        <Text style={styles.subtitle}>Ingredientes</Text>
        {recipe?.ingredients?.map((ing: string, i: number) => (
          <Text key={i} style={styles.text}>• {ing}</Text>
        ))}

        <Text style={styles.subtitle}>Preparación</Text>
        <Text style={styles.text}>{recipe?.instructions}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  imageWrapper: {
    position: 'relative',
    backgroundColor: "#fff",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  image: { width: "100%", height: 350, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
  favoriteButtonContainer: { position: 'absolute', bottom: -25, right: 30, zIndex: 10 },
  favoriteButton: {
    backgroundColor: '#fff',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  content: { padding: 20, paddingTop: 40 },
  title: { fontSize: 28, fontWeight: "bold", color: "#573011", marginBottom: 5 },
  subtitle: { fontSize: 20, fontWeight: "600", color: "#D4A373", marginTop: 20, marginBottom: 10 },
  text: { fontSize: 16, lineHeight: 24, color: "#555", marginBottom: 5 },
});