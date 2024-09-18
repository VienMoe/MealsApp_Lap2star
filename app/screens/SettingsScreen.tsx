// screens/SettingsScreen.tsx

import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

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

export default function SettingsScreen() {
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      {/* Add settings options here */}
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
});
