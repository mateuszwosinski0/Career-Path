import { createContext, useContext, useEffect, useState,} from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "system";
  });

  useEffect(() => {
    const root = document.documentElement;
    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    function applyTheme() {
      const shouldUseDark =
        theme === "dark" ||
        (theme === "system" && systemTheme.matches);
        
      root.classList.toggle("dark", shouldUseDark);
    }

    applyTheme();
    localStorage.setItem("theme", theme);

    if (theme === "system") {
      systemTheme.addEventListener("change", applyTheme);
    }

    return () => {
      systemTheme.removeEventListener("change", applyTheme);
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
    
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

export { ThemeProvider, useTheme };

