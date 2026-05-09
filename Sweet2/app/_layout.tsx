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
    if (!mounted) return;

    // Revisamos si el usuario está en 'login' O en 'register'
    const inAuthGroup = segments[0] === "login" || segments[0] === "register";

    if (!user && !inAuthGroup) {
      // Si no hay usuario y NO está en login ni en registro, mandamos a login
      router.replace("/login");
    }

    if (user && inAuthGroup) {
      // Si ya inició sesión y trata de entrar a login o registro, lo mandamos al home
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
        <Stack.Screen name="register" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AuthContext.Provider>
  );
}