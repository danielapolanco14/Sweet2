import { Tabs } from "expo-router";
import React from "react";
import { CustomTabBar } from "@/components/CustomTabBar";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          elevation: 0,
          borderTopWidth: 0,
        }
      }}
    >


      <Tabs.Screen
        name="index" // index.tsx
        options={{
          title: "Inicio",

          //tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}

      />

      <Tabs.Screen
        name="crear" // crear.tsx
        options={{
          title: "Añadir",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus" color={color} />,
        }}
      />

      <Tabs.Screen
        name="favoritos" // favoritos.tsx
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="heart.fill" color={color} />,
        }}
      />


    </Tabs>
  );
}