import { Moon, Sun } from "lucide-react";
import useTheme from "../../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 border-none bg-transparent cursor-pointer"
    >
      {theme === "light" ? (
        <Moon className="text-[var(--text)]" size={20} />
      ) : (
        <Sun className="text-[var(--text)]" size={20} />
      )}
    </button>
  );
};

export default ThemeToggle;
