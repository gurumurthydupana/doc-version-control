import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { dark, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      className={`rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
      aria-label="Toggle dark mode"
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
