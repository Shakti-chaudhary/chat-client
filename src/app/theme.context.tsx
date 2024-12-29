import { createContext, useContext, useState } from "react";
import { ThemeType } from "../types/types";
import toast from "react-hot-toast";

type ThemeContextType = {
  theme: ThemeType;
  changeTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else setTheme("dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    toast.error("Use context properly.. ");
    throw new Error("UseTheme must undifined behavior occurs...");
  }
  return context;
};
