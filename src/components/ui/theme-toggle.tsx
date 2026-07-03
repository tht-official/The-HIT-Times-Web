"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  ThemeAnimationType,
  useModeAnimation,
} from "react-theme-switch-animation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";

  const { ref, toggleSwitchTheme } = useModeAnimation({
    animationType: ThemeAnimationType.BLUR_CIRCLE,
    blurAmount: 0,
    duration: 700,
    isDarkMode: mounted ? isDark : false,
    onDarkModeChange: (nextIsDark) => setTheme(nextIsDark ? "dark" : "light"),
    globalClassName: "dark",
  });

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className={cn("h-9 w-9", className)} disabled>
        <span className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("h-9 w-9 text-muted-foreground hover:text-foreground", className)}
      onClick={toggleSwitchTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      suppressHydrationWarning
    >
      {isDark ? (
        <Sun className="h-4 w-4 transition-transform duration-200 hover:rotate-12" />
      ) : (
        <Moon className="h-4 w-4 transition-transform duration-200 hover:-rotate-12" />
      )}
    </Button>
  );
}
