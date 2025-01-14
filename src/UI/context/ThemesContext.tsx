import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark" | "colorful";

interface ThemesContextProps {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  toggleTheme: () => void;
}

const ThemesContext = createContext<ThemesContextProps | undefined>(undefined);

export const ThemesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      switch (prevTheme) {
        case "dark":
          return "light";
        case "light":
          return "colorful";
        case "colorful":
          return "dark";
        default:
          return "dark";
      }
    });
  };

  return (
    <ThemesContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemesContext.Provider>
  );
};

export const useThemesContext = () => {
  const context = useContext(ThemesContext);
  if (!context) {
    throw new Error("useThemesContext must be used within a ThemesProvider");
  }
  return context;
};
