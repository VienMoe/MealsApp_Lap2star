import React, { useLayoutEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RootStackParamList } from "../types"; // Ensure correct path
import { useFavorites } from "../context/FavoritesContex";

type MealDetailRouteProp = RouteProp<RootStackParamList, "MealDetail">;
type MealDetailNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MealDetail"
>;

const Meals = [
  {
    id: "1",
    title: "Spaghetti",
    description: "Delicious Italian pasta.",
    image: require("../assets/spaghetti.jpg"),
  },
  {
    id: "2",
    title: "Pizza",
    description: "Tasty cheesy pizza.",
    image: require("../assets/pizza.jpg"),
  },
  {
    id: "3",
    title: "Phở bò",
    description:
      "Là một món ăn truyền thống của Việt Nam, được xem là một trong những món ăn tiêu biểu cho nền ẩm thực Việt Nam.",
    image: require("../assets/phobo.jpg"),
  },
  {
    id: "4",
    title: "Nem Nướng",
    description:
      "Là món thịt heo nướng hoặc thịt viên nướng của Việt Nam,[1] và là một món ăn phổ biến ở quốc gia này, đôi khi được dùng như một món khai vị hoặc món ăn nhẹ riêng lẻ, hoặc ăn kèm bún (hoặc cơm) như một món chính.",
    image: require("../assets/nemnuong.jpg"),
  },
  {
    id: "5",
    title: "Sushi",
    description:
      "Là một món ăn Nhật Bản gồm cơm trộn giấm (shari) kết hợp với các nguyên liệu khác (neta). Neta và hình thức trình bày sushi rất đa dạng, nhưng nguyên liệu chính mà tất cả các loại sushi đều có là shari. Neta phổ biến nhất là hải sản.",
    image: require("../assets/sushi.jpg"),
  },
  {
    id: "6",
    title: "Mỳ Ramen",
    description:
      "Là một món mì của Nhật Bản. Món này làm từ mì sợi Trung Quốc kèm với thịt hoặc (thỉnh thoảng) nước dùng làm từ cá, thường có hương vị với nước tương hoặc miso, và sử dụng các lớp phủ như thịt lợn thái mỏng (叉焼, xá xíu), nori (rong biển sấy khô), menma, và hành lá.",
    image: require("../assets/ramen.jpg"),
  },
  {
    id: "7",
    title: "Sườn cừu nướng",
    description:
      "Trong ẩm thực chỉ về nguyên liệu và những món ăn được làm từ xương sườn của các loài động vật, phổ biến là lợn (sườn lợn), bò (sườn bò), cừu (sườn cừu) và các động vật khác. Về mặt ẩm thực, sườn được xem là một trong các phần thịt (khúc thịt). Thuật ngữ sườn thường đề cập đến phần ít thịt của xương sườn, thường được nấu chín dưới dạng nguyên tảng (ít khi được cắt thành các sườn riêng biệt) hoặc chặt nhỏ để nấu những món khác. Sườn có thể được quay, rang, nướng, chiên, nướng, om hoặc hun khói, ninh như, hầm và cho ra nhiều món ăn đa dạng.",
    image: require("../assets/suoncuu.jpg"),
  },
  {
    id: "8",
    title: "Bánh ngọt Macaron",
    description:
      " Là một loại bánh ngọt dựa trên bánh trứng đường. Macaron được làm từ lòng trắng trứng, đường bột, đường hạt, bột hạnh nhân, và màu thực phẩm.",
    image: require("../assets/macaroncake.jpg"),
  },
];

export default function MealDetailScreen() {
  const route = useRoute<MealDetailRouteProp>();
  const navigation = useNavigation<MealDetailNavigationProp>();
  const { mealId } = route.params;
  const { favorites, addFavorite } = useFavorites();
  const selectedMeal = Meals.find((meal) => meal.id === mealId);
  const isFavorited = favorites.some((meal) => meal.id === mealId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedMeal ? selectedMeal.title : "Meal Detail",
    });
  }, [navigation, selectedMeal]);

  const handleFavoritePress = () => {
    if (selectedMeal) {
      if (!isFavorited) {
        addFavorite(selectedMeal);
      }
    }
  };

  return (
    <View style={styles.container}>
      {selectedMeal ? (
        <>
          <Image
            source={selectedMeal.image}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.title}>{selectedMeal.title}</Text>
          <Text style={styles.description}>{selectedMeal.description}</Text>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoritePress}
          >
            <Ionicons
              name={isFavorited ? "heart" : "heart-outline"}
              size={30}
              color="red"
            />
          </TouchableOpacity>
        </>
      ) : (
        <Text>Meal not found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
