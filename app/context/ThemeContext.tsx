// context/ThemeContext.tsx

import React, { createContext, useState, ReactNode } from "react";
import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

interface ThemeContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  indexBackground: string;
  categoriesBackground: string;
  mealsBackground: string;
  setIndexBackground: (color: string) => void;
  setCategoriesBackground: (color: string) => void;
  setMealsBackground: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [indexBackground, setIndexBackground] = useState("#ffffff");
  const [categoriesBackground, setCategoriesBackground] = useState("#ffe0b2");
  const [mealsBackground, setMealsBackground] = useState("#c8e6c9");

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = isDarkMode ? MD3DarkTheme : MD3LightTheme;

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        indexBackground,
        categoriesBackground,
        mealsBackground,
        setIndexBackground,
        setCategoriesBackground,
        setMealsBackground,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
