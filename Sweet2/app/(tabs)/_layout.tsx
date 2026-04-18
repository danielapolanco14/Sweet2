import { Tabs } from "expo-router";
import React from "react";
import { View, Platform } from "react-native"; // Necesitamos View para el círculo
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        // Ajustamos el estilo de la barra para que el botón luzca mejor
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 65,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
        }
      }}
    >
      {/* 1. HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      {/* 2. CREAR (El botón central estilo Instagram) */}
      <Tabs.Screen
        name="crear" // Asegúrate de que el archivo se llame crear.tsx
        options={{
          title: "", // Sin texto para que no estorbe al círculo
          tabBarIcon: ({ focused }) => (
            <View style={{
              width: 55,
              height: 55,
              backgroundColor: "hsl(29, 49%, 59%)", // Tu color miel/café
              borderRadius: 28,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: Platform.OS === 'ios' ? 25 : 35, // Lo eleva sobre la barra
              elevation: 5, // Sombra en Android
              shadowColor: "#000", // Sombra en iOS
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
            }}>
              <IconSymbol size={32} name="plus" color="#fff" />
            </View>
          ),
        }}
      />

      {/* 3. FAVORITOS */}
      <Tabs.Screen
        name="favoritos"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name={focused ? "heart.fill" : "heart"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}