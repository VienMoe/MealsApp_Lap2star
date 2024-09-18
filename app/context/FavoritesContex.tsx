// context/FavoritesContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";

type Meal = {
  id: string;
  title: string;
  image: any;
};

type FavoritesContextType = {
  favorites: Meal[];
  addFavorite: (meal: Meal) => void;
  removeFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Meal[]>([]);

  const image = {
    id: "1",
    title: "Spaghetti",
    image: require("../assets/spaghetti.jpg"),
  };

  const addFavorite = (meal: Meal) => {
    setFavorites((prevFavorites) => [...prevFavorites, meal]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((meal) => meal.id !== id)
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
