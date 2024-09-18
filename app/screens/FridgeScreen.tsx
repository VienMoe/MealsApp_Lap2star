import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

// Define the type for the ingredients data
const ingredientsData: string[] = [
  "Tomato",
  "Onion",
  "Garlic",
  "Chicken",
  "Carrot",
  "Milk",
  "Egg",
  "Cheese",
  "Broccoli",
  "Pasta",
  "Salt",
  "Pepper",
  "Butter",
  "Basil",
  "Oregano",
  "Mushroom",
  "Beef",
  "Salmon",
  "Lettuce",
  "Spinach",
  "Cucumber",
  "Potato",
  "Rice",
  "Olive Oil",
  "Bread",
  "Flour",
  "Sugar",
  "Lemon",
  "Orange",
  "Apple",
  "Banana",
  "Strawberry",
  "Blueberry",
  "Yogurt",
  "Honey",
  "Almonds",
  "Walnuts",
  "Chocolate",
  "Vanilla",
  "Shrimp",
  "Tuna",
  "Pork",
  "Zucchini",
  "Eggplant",
  "Bell Pepper",
  "Ginger",
  "Soy Sauce",
  "Vinegar",
  "Cinnamon",
  "Chili",
  "Coconut Milk",
  "Avocado",
  "Corn",
  "Cauliflower",
  "Peas",
  "Cabbage",
  "Mint",
  "Thyme",
  "Parsley",
  "Cilantro",
  "Cumin",
  "Turmeric",
  "Paprika",
  "Mozzarella",
  "Parmesan",
  "Feta Cheese",
  "Ground Beef",
  "Lamb",
  "Bacon",
  "Sausage",
  "Quinoa",
  "Lentils",
  "Chickpeas",
  "Black Beans",
  "Tofu",
  "Tempeh",
  "Green Beans",
  "Asparagus",
  "Celery",
  "Kale",
  "Radish",
  "Pineapple",
  "Mango",
  "Peach",
  "Watermelon",
  "Cantaloupe",
  "Grapes",
  "Kiwi",
  "Pomegranate",
  "Cloves",
  "Nutmeg",
  "Mustard",
  "Mayonnaise",
  "Ketchup",
  "BBQ Sauce",
  "Hot Sauce",
];

export default function FridgeScreen() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredIngredients, setFilteredIngredients] =
    useState<string[]>(ingredientsData);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  // Handle search input change
  const handleSearch = (text: string) => {
    // Allow only alphabetic characters and spaces
    const validText = text.replace(/[^a-zA-Z\s]/g, "");

    // If the input contains any invalid characters, show an alert
    if (text !== validText) {
      Alert.alert("Invalid Input", "Please enter only letters and spaces.");
    }

    setSearchTerm(validText);

    const filtered = ingredientsData.filter((ingredient) =>
      ingredient.toLowerCase().includes(validText.toLowerCase())
    );

    const sortedFilteredIngredients = filtered.sort((a, b) =>
      selectedIngredients.includes(b) ? 1 : -1
    );

    setFilteredIngredients(sortedFilteredIngredients);
  };

  // Handle ingredient selection
  const handleSelectIngredient = (ingredient: string) => {
    setSelectedIngredients((prevSelected) => {
      if (prevSelected.includes(ingredient)) {
        return prevSelected.filter((item) => item !== ingredient);
      } else {
        return [...prevSelected, ingredient];
      }
    });
  };

  const renderIngredientItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.ingredientItem}
      onPress={() => handleSelectIngredient(item)}
    >
      <View style={styles.ingredientContent}>
        {selectedIngredients.includes(item) && (
          <Ionicons
            name="checkmark"
            size={24}
            color="#00796b"
            style={styles.checkIcon}
          />
        )}
        <Text
          style={[
            styles.ingredientText,
            selectedIngredients.includes(item) && styles.selectedText,
          ]}
        >
          {item}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search ingredients"
        value={searchTerm}
        onChangeText={handleSearch}
      />
      {selectedIngredients.length > 0 && (
        <View style={styles.selectedIngredientsContainer}>
          <Text style={styles.selectedIngredientsLabel}>
            Tủ lạnh của bạn có:
          </Text>
          <FlatList
            data={selectedIngredients}
            keyExtractor={(item) => item}
            horizontal
            renderItem={({ item }) => (
              <View style={styles.selectedIngredientItem}>
                <Text style={styles.selectedIngredientText}>{item}</Text>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.noSelectedText}>
                No ingredients selected.
              </Text>
            }
          />
        </View>
      )}
      <FlatList
        data={filteredIngredients}
        keyExtractor={(item) => item}
        renderItem={renderIngredientItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No ingredients found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  selectedIngredientsContainer: {
    marginBottom: 20,
  },
  selectedIngredientsLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  selectedIngredientItem: {
    backgroundColor: "#e0f7fa",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedIngredientText: {
    fontSize: 16,
    color: "#00796b",
  },
  noSelectedText: {
    fontSize: 16,
    color: "#999",
  },
  ingredientItem: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
  },
  ingredientContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkIcon: {
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 18,
  },
  selectedText: {
    color: "#00796b",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
  },
});
