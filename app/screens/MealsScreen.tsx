import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";

// Define the param list for the stack navigator
type RootStackParamList = {
  Categories: undefined;
  Meals: { categoryId: string };
  MealDetail: { mealId: string };
};

// Get the route prop type for Meals screen
type MealsScreenRouteProp = RouteProp<RootStackParamList, "Meals">;
type MealsScreenNavigationProp = NavigationProp<
  RootStackParamList,
  "MealDetail"
>;

export default function MealsScreen() {
  const route = useRoute<MealsScreenRouteProp>();
  const navigation = useNavigation<MealsScreenNavigationProp>();
  const { categoryId } = route.params;

  // Fake data for meals
  const MEALS = [
    {
      id: "1",
      title: "Spaghetti",
      categoryId: "1",
      image: require("../assets/spaghetti.jpg"),
    },
    {
      id: "2",
      title: "Pizza",
      categoryId: "1",
      image: require("../assets/pizza.jpg"),
    },
    {
      id: "3",
      title: "Phở bò",
      categoryId: "2",
      image: require("../assets/phobo.jpg"),
    },
    {
      id: "4",
      title: "Nem nướng",
      categoryId: "2",
      image: require("../assets/nemnuong.jpg"),
    },
    {
      id: "5",
      title: "Sushi",
      categoryId: "3",
      image: require("../assets/sushi.jpg"),
    },
    {
      id: "6",
      title: "Mỳ Ramen",
      categoryId: "3",
      image: require("../assets/ramen.jpg"),
    },
    {
      id: "7",
      title: "Sườn cừu nướng",
      categoryId: "4",
      image: require("../assets/suoncuu.jpg"),
    },
    {
      id: "8",
      title: "Bánh ngọt Macaron",
      categoryId: "4",
      image: require("../assets/macaroncake.jpg"),
    },
  ];

  const mealsToShow = MEALS.filter((meal) => meal.categoryId === categoryId);

  return (
    <View style={styles.container}>
      {mealsToShow.map((meal) => (
        <View key={meal.id} style={styles.mealItem}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MealDetail", { mealId: meal.id })
            }
          >
            <Image source={meal.image} style={styles.image} />
          </TouchableOpacity>
          <Text style={styles.title}>{meal.title}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  mealItem: {
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "orange",
  },
  image: {
    width: 400,
    height: 200,
    resizeMode: "cover",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
});
