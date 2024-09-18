import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FavoritesProvider } from "./context/FavoritesContex";
import { ThemeProvider } from "./context/ThemeContext";
import FridgeScreen from "./screens/FridgeScreen";
import ThemeContext from "./context/ThemeContext";

import CategoriesScreen from "./screens/CategoriesScreen";
import MealsScreen from "./screens/MealsScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import SettingsScreen from "./screens/SettingsScreen";

// Định nghĩa kiểu cho các stack parameters
type MealsStackParamList = {
  Categories: undefined;
  Meals: { categoryId: string };
  MealDetail: { mealId: string };
  Favorites: undefined;
  Settings: undefined;
};

// Định nghĩa kiểu cho các tab parameters
type TabParamList = {
  Categories: undefined;
  Favorites: undefined;
  Settings: undefined;
  Fridge: undefined;
};

const Stack = createStackNavigator<MealsStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Hàm điều hướng Stack
function MealsStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Categories">
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="Meals" component={MealsScreen} />
      <Stack.Screen name="MealDetail" component={MealDetailScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
}

// Hàm điều hướng Tab với các icon và màu nền
function AppNavigator() {
  const { indexBackground } = useContext(ThemeContext) || {};

  if (!indexBackground) {
    return null; // Handle the case where context is not available
  }
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "Categories":
              iconName = focused ? "restaurant" : "restaurant-outline";
              break;
            case "Favorites":
              iconName = focused ? "heart" : "heart-circle";
              break;
            case "Settings":
              iconName = focused ? "settings" : "settings-outline";
              break;
            case "Fridge":
              iconName = focused ? "bag-add" : "bag-add-outline";
              break;
            default:
              iconName = "help-circle";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: indexBackground,
        },
      })}
    >
      <Tab.Screen name="Categories" component={MealsStackNavigator} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Fridge" component={FridgeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// Component chính của ứng dụng
export default function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <AppNavigator />
      </FavoritesProvider>
    </ThemeProvider>
  );
}
