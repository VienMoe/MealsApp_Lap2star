// screens/SettingsScreen.tsx

import React, { useContext } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import ThemeContext from "../context/ThemeContext";

// Define the param list for the stack navigator
type RootStackParamList = {
  Categories: undefined;
  Meals: { categoryId: string };
  MealDetail: { mealId: string };
  Favorites: undefined;
  Settings: undefined;
};

type SettingsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "Settings"
>;

const colors = {
  indexBackground: ["#ffffff", "#f0f0f0", "#e0e0e0"],
  categoriesBackground: ["#ffe0b2", "#ffccbc", "#ffab91"],
  mealsBackground: ["#c8e6c9", "#a5d6a7", "#81c784"],
};

export default function SettingsScreen() {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const {
    indexBackground,
    categoriesBackground,
    mealsBackground,
    setIndexBackground,
    setCategoriesBackground,
    setMealsBackground,
  } = useContext(ThemeContext) || {};

  if (!setIndexBackground || !setCategoriesBackground || !setMealsBackground) {
    return null; // handle the case where context is not available
  }

  const handleColorSelect = (section: string, color: string) => {
    switch (section) {
      case "index":
        setIndexBackground(color);
        break;
      case "categories":
        setCategoriesBackground(color);
        break;
      case "meals":
        setMealsBackground(color);
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings Screen</Text>

      <View style={styles.colorSection}>
        <Text style={styles.sectionTitle}>Index Background</Text>
        <View style={styles.colorPicker}>
          {colors.indexBackground.map((color) => (
            <TouchableOpacity
              key={color}
              style={[styles.colorOption, { backgroundColor: color }]}
              onPress={() => handleColorSelect("index", color)}
            >
              {indexBackground === color && (
                <Text style={styles.checkMark}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.colorSection}>
        <Text style={styles.sectionTitle}>Categories Background</Text>
        <View style={styles.colorPicker}>
          {colors.categoriesBackground.map((color) => (
            <TouchableOpacity
              key={color}
              style={[styles.colorOption, { backgroundColor: color }]}
              onPress={() => handleColorSelect("categories", color)}
            >
              {categoriesBackground === color && (
                <Text style={styles.checkMark}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.colorSection}>
        <Text style={styles.sectionTitle}>Meals Background</Text>
        <View style={styles.colorPicker}>
          {colors.mealsBackground.map((color) => (
            <TouchableOpacity
              key={color}
              style={[styles.colorOption, { backgroundColor: color }]}
              onPress={() => handleColorSelect("meals", color)}
            >
              {mealsBackground === color && (
                <Text style={styles.checkMark}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.previewContainer}>
        <Text style={styles.previewTitle}>Preview:</Text>
        <View style={[styles.previewBox, { backgroundColor: indexBackground }]}>
          <Text>Index Screen</Text>
        </View>
        <View
          style={[styles.previewBox, { backgroundColor: categoriesBackground }]}
        >
          <Text>Categories Screen</Text>
        </View>
        <View style={[styles.previewBox, { backgroundColor: mealsBackground }]}>
          <Text>Meals Screen</Text>
        </View>
      </View>

      <Button
        title="Save Settings"
        onPress={() => console.log("Settings saved")}
      />
      <Button
        title="Go to Favorites"
        onPress={() => navigation.navigate("Favorites")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  colorSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  colorPicker: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  colorOption: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000",
  },
  checkMark: {
    fontSize: 24,
    color: "#000",
  },
  previewContainer: {
    marginBottom: 20,
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  previewBox: {
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: "center",
  },
});
