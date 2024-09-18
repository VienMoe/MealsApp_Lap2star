// types.ts
export type MealsStackParamList = {
  CATEGORIES: undefined;
  MEALS: { categoryId: string };
  MEALSDETAIL: { mealId: string };
  FAVORITES: undefined;
};

export type RootStackParamList = {
  Categories: undefined;
  Meals: { categoryId: string };
  MealDetail: { mealId: string };
  Favorites: undefined;
  Settings: undefined;
};
