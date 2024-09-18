import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RootStackParamList } from "../types";
import { useFavorites } from "../context/FavoritesContex";

type FavoritesScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "Favorites"
>;

export default function FavoritesScreen() {
  const navigation = useNavigation<FavoritesScreenNavigationProp>();
  const { favorites } = useFavorites(); // Retrieve favorites from context

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {favorites.length > 0 ? (
        favorites.map((meal) => (
          <View key={meal.id} style={styles.item}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MealDetail", { mealId: meal.id })
              }
            >
              <View style={styles.imageContainer}>
                <Image
                  source={
                    meal.image ? meal.image : require("../assets/spaghetti.jpg")
                  }
                  style={styles.image}
                  resizeMode="cover" // Ensure image scales correctly
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.title}>{meal.title}</Text>
            <TouchableOpacity style={styles.favoriteButton}>
              <Ionicons name="heart" size={30} color="red" />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.noFavoritesText}>No favorites added yet!</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1, // Ensures the container takes up available space
  },
  item: {
    marginVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    position: "relative", // Make sure the button is positioned relative to this container
  },
  imageContainer: {
    width: 400, // Set a fixed width to ensure consistent image size
    height: 200, // Set a fixed height
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Optional: give a background color for consistency
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  noFavoritesText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
});
