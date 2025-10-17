import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { Switch } from "@heroui/react";
import { useTheme } from "@heroui/use-theme";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className="flex items-center">
      <Switch
        isSelected={isDark}
        onChange={toggleTheme}
        color="primary"
        size={"lg"}
        endContent={<MoonIcon className="size-6" />}
        startContent={<SunIcon className="size-6" />}
      />
    </div>
  );
};
