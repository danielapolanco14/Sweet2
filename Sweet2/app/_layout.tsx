import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect, useState, createContext, useContext } from "react";

interface AuthContextType { // es para definir el tipo del contexto de autenticación, q incluye el usuario actual, función para iniciar sesión y una función para cerrar sesió
  user: string | null;
  login: (u: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({ //esto es para compartir el estado de autenticación en toda la app
  user: null,
  login: () => { },
  logout: () => { },
});

export function useAuth() { // esta funcion sirve para acceder al contexto de autenticación desde cualquier componente de la app
  return useContext(AuthContext);
}

export default function RootLayout() {
  const [user, setUser] = useState<string | null>(null); // estado para almacenar el usuario autenticado
  const [mounted, setMounted] = useState(false);// estado para controlar si el componente ya esta 

  const router = useRouter(); // hook para controlar la navegación entre pantallas
  const segments = useSegments();//

  useEffect(() => { //
    setMounted(true); //
  }, []);

  useEffect(() => {
    if (!mounted) return; // si el componente no esta montado, no hacemos nada

    const inLogin = segments[0] === "login"; // verificamos si estamos en la pantalla de login

    if (!user && !inLogin) { // si no hay usuario autenticado y no estamos en la pantalla de login, redirigimos a login
      router.replace("/login");
    }

    if (user && inLogin) {
      router.replace("/(tabs)");
    }
  }, [user, segments, mounted]);

  if (!mounted) return null;

  return (
    <AuthContext.Provider // proporcionamos el contexto de autenticación a toda la app
      value={{
        user,
        login: (u) => setUser(u),
        logout: () => setUser(null),
      }}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AuthContext.Provider>
  );
}