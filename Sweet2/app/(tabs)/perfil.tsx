import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";

// Definimos el tipado de los datos que vienen de la Base de Datos
interface PerfilUsuario {
  full_name: string;
  username: string;
  email: string;
  miembroDesde: string;
  avatar_url: string;
}

export default function Perfil() {
  const [usuario, setUsuario] = useState<PerfilUsuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cargarPerfilDesdeAPI = async () => {
      try {
        setLoading(true);
        // Reemplaza con la URL real de tu servidor local o producción
        const response = await fetch("http://192.168.1.XX:3000/api/profile?userId=1");
        const data = await response.json();

        setUsuario(data);
      } catch (error) {
        console.error("Error al obtener perfil:", error);
        Alert.alert("Error", "No se pudieron obtener los datos del perfil.");
      } finally {
        setLoading(false);
      }
    };

    cargarPerfilDesdeAPI();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#96552a" />
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text>No se pudo cargar la información de la cuenta.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        {/* Cambiado para usar el campo mapeado de la BD */}
        <Image source={{ uri: usuario.avatar_url }} style={styles.avatar} />
        <Text style={styles.username}>{usuario.username}</Text>
        <Text style={styles.email}>{usuario.email}</Text>
      </View>

      {/* CARD INFO */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Información de la Cuenta</Text>

        <InfoItem label="Nombre" value={usuario.full_name} />
        <InfoItem label="Correo" value={usuario.email} />
        <InfoItem label="Miembro desde" value={usuario.miembroDesde} />
      </View>

      {/* BOTONES */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, styles.logoutButton]}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// COMPONENTE REUTILIZABLE MANTENIDO IGUAL
type InfoItemProps = {
  label: string;
  value: string;
};

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { justifyContent: "center", alignItems: "center" },
  header: {
    backgroundColor: "#96552a",
    paddingTop: 70,
    paddingBottom: 40,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: "#FFF",
    marginBottom: 15,
  },
  username: { fontSize: 24, fontWeight: "bold", color: "#FFF" },
  email: { marginTop: 5, color: "#FFF", fontSize: 14 },
  card: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 20,
    padding: 20,
    elevation: 4,
  },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20, color: "#61401b" },
  infoItem: { marginBottom: 18, borderBottomWidth: 1, borderBottomColor: "#EEE", paddingBottom: 10 },
  label: { fontSize: 13, color: "#888", marginBottom: 3 },
  value: { fontSize: 16, color: "#222", fontWeight: "500" },
  buttonsContainer: { marginTop: 30, paddingHorizontal: 20, paddingBottom: 40 },
  button: {
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#855621",
    backgroundColor: "transparent",
  },
  logoutButton: { backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#5a330f" },
  logoutText: { color: "#5a330f", fontSize: 16, fontWeight: "bold" },
});