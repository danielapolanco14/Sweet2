import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert
} from "react-native";
import { useFocusEffect } from "expo-router";
import { Image } from "expo-image";

// Definimos la estructura exacta que mandará tu API
interface RecetaFavorita {
  id: number;
  title: string;
  image_url: string;
}

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<RecetaFavorita[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // useFocusEffect recarga los favoritos cada vez que el usuario navega a esta pestaña
  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      const obtenerFavoritosAPI = async () => {
        try {
          setLoading(true);

          // Reemplaza con tu IP local o URL de producción de tu API
          // Ejemplo usando fetch:
          const response = await fetch("http://192.168.1.XX:3000/api/favorites?userId=1");
          const data = await response.json();

          if (isMounted) {
            setFavorites(data);
          }
        } catch (error) {
          console.error("Error al traer favoritos:", error);
          Alert.alert("Error de Conexión", "No pudimos conectar con el horno de recetas.");
        } finally {
          if (isMounted) setLoading(false);
        }
      };

      obtenerFavoritosAPI();

      return () => {
        isMounted = false; // Evita fugas de memoria si el usuario cambia de pantalla rápido
      };
    }, [])
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#D4A373" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis Favoritos</Text>

      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Aún no tienes recetas favoritas guardadas.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()} // Usamos el ID único numérico de la BD
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* Renderizado dinámico desde Internet / Servidor local */}
              <Image
                source={{ uri: item.image_url }}
                style={styles.image}
                contentFit="cover"
                transition={300} // Transición suave (fade-in) al cargar la imagen de la red
              />
              <View style={styles.info}>
                <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F8F9FA" },
  center: { justifyContent: "center", alignItems: "center" },
  header: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#573011", marginTop: 30 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 16,
    width: '48%',
    shadowColor: "#a85c30",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden'
  },
  image: { width: "100%", height: 120 },
  info: { padding: 10 },
  title: { fontSize: 14, fontWeight: "700", color: "#6e3c13", textAlign: 'center' },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#999', fontSize: 16 }
});