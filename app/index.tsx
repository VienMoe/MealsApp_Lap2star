import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FavoritesProvider } from "./context/FavoritesContex";
import { ThemeProvider } from "./context/ThemeContext";

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

// Hàm điều hướng Tab với các icon
function AppNavigator() {
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
            default:
              iconName = "help-circle"; // Nếu route không được xác định
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Categories" component={MealsStackNavigator} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
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
