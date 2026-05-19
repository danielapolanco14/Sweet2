// Pantalla de Perfil - React Native + TypeScript

import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";


export default function Perfil() {
  // Datos de ejemplo 
  const usuario = {
    nombre: "Daniela Piñón",
    username: "@danieladev",
    correo: "daniela@email.com",
    miembroDesde: "Mayo 2026",
    avatar:
      " https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image source={{ uri: usuario.avatar }} style={styles.avatar} />

        <Text style={styles.username}>{usuario.username}</Text>

        <Text style={styles.email}>{usuario.correo}</Text>
      </View>

      {/* CARD INFO */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Información de la Cuenta</Text>

        <InfoItem label="Nombre" value={usuario.nombre} />
        <InfoItem label="Correo" value={usuario.correo} />
        <InfoItem
          label="Miembro desde"
          value={usuario.miembroDesde}
        />
      </View>

      {/* BOTONES */}
      <View style={styles.buttonsContainer}>


        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
        >
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// COMPONENTE REUTILIZABLE
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

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

  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },

  email: {
    marginTop: 5,
    color: "#FFF",
    fontSize: 14,
  },

  card: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 20,
    padding: 20,
    elevation: 4,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#61401b",
  },

  infoItem: {
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingBottom: 10,
  },

  label: {
    fontSize: 13,
    color: "#888",
    marginBottom: 3,
  },

  value: {
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
  },

  buttonsContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  button: {
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,

    // BORDE
    borderWidth: 2,
    borderColor: "#855621",

    // SIN FONDO
    backgroundColor: "transparent",
  },

  buttonText: {
    color: "#5a330f",
    fontSize: 16,
    fontWeight: "bold",
  },

  logoutButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#5a330f",
  },

  logoutText: {
    color: "#5a330f",
    fontSize: 16,
    fontWeight: "bold",
  },
});
