import React from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";

// Define the type for each category item
interface Category {
  id: string;
  title: string;
  image: ImageSourcePropType;
}

const CATEGORIES: Category[] = [
  { id: "1", title: "Ý", image: require("../assets/italianfood.jpg") },
  { id: "2", title: "Việt Nam", image: require("../assets/vietnamfood.jpg") },
  { id: "3", title: "Nhật Bản", image: require("../assets/japanfood.jpg") },
  { id: "4", title: "Pháp", image: require("../assets/francefood.jpg") },
  // Add more categories...
];

// Define the param list for navigation
type RootStackParamList = {
  Categories: undefined;
  Meals: { categoryId: string };
};

// Define the props for the category item
interface CategoryItemProps {
  title: string;
  image: ImageSourcePropType;
  onSelect: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  title,
  image,
  onSelect,
}) => (
  <TouchableOpacity style={styles.gridItem} onPress={onSelect}>
    <View>
      <Image source={image} style={styles.image} />
      <Text
        style={{
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function CategoriesScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const renderGridItem = ({ item }: { item: Category }) => {
    return (
      <CategoryItem
        title={item.title}
        image={item.image}
        onSelect={() => navigation.navigate("Meals", { categoryId: item.id })}
      />
    );
  };

  return (
    <FlatList
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    backgroundColor: "orange",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "80%",
  },
  hiddenText: {
    display: "none",
  },
});
