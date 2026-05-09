import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// Definimos el ancho de la barra (ej: 90% de la pantalla para que flote)
const BAR_WIDTH = width * 0.9;
const TAB_COUNT = 4;
const TAB_WIDTH = BAR_WIDTH / TAB_COUNT;

export function CustomTabBar({ state, descriptors, navigation }: any) {
    const translateX = useSharedValue(0);

    useEffect(() => {
        // Calculamos la posición centrada para el círculo
        translateX.value = withSpring(state.index * TAB_WIDTH, {
            damping: 15,
            stiffness: 90,
        });
    }, [state.index]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <View style={styles.outerContainer}>
            <View style={styles.barContainer}>
                {/* Indicador redondeado animado (el fondo que se mueve) */}
                <Animated.View style={[styles.indicator, { width: TAB_WIDTH }, animatedStyle]}>
                    <View style={styles.circle} />
                </Animated.View>

                {/* Renderizado de los iconos */}
                <View style={styles.content}>
                    {state.routes.map((route: any, index: number) => {
                        const { options } = descriptors[route.key];
                        const isFocused = state.index === index;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        return (
                            <Pressable
                                key={route.key}
                                onPress={onPress}
                                style={styles.tabItem}
                            >
                                <View style={styles.iconWrapper}>
                                    {options.tabBarIcon && options.tabBarIcon({
                                        color: isFocused ? '#FFFFFF' : '#888888',
                                        focused: isFocused
                                    })}
                                </View>
                            </Pressable>
                        );
                    })}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        position: 'absolute',
        bottom: 30, // Eleva la barra para que flote
        width: '100%',
        alignItems: 'center',
    },
    barContainer: {
        width: BAR_WIDTH,
        height: 70,
        backgroundColor: '#1A1A1A', // Color de fondo de la barra (oscuro como en tu imagen)
        borderRadius: 35, // Bordes muy redondeados tipo cápsula
        flexDirection: 'row',
        overflow: 'hidden', // Mantiene el indicador dentro de la barra
        // Sombra para que resalte del fondo
        elevation: 5,
        shadowColor: '#e6aa82',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    content: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
    },
    indicator: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#d6834c', // Color del círculo activo (verde como en tu imagen)
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconWrapper: {
        zIndex: 10, // Asegura que el icono esté por encima del círculo verde
    }
});