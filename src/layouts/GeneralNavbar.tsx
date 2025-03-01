"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changeTheme } from "@/redux/themeSlice";
import { Themes } from "@/interfaces/theme";
import { MoonIcon, SunIcon } from "lucide-react";
import { useState, useEffect } from "react";

const GeneralNavbar = () => {
  const dispatch = useAppDispatch();
  const { selectedTheme } = useAppSelector((state: any) => state.theme);

  // Add client-side only rendering for the theme toggle
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = selectedTheme === Themes.dark ? Themes.light : Themes.dark;
    dispatch(changeTheme({ selectedTheme: newTheme }));
  };

  // Prevent hydration mismatch by rendering icon only after mount
  const ThemeIcon = mounted ? (selectedTheme === Themes.dark ? SunIcon : MoonIcon) : null;
  const themeTitle = mounted ? (selectedTheme === Themes.dark ? "Switch to light mode" : "Switch to dark mode") : "";

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl flex items-center gap-2">
          <Image
            src="/images/logo.jpg"
            alt="AiArtToday Logo"
            width={32}
            height={32}
            className="rounded-sm"
            priority={true}
            loading="eager"
            style={{ border: "1px solid #cecece", borderRadius: "50%" }}
          />
          AiArtToday
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link
              href="/artists"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Artists
            </Link>
            <Link
              href="/spaces"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Spaces
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              About
            </Link>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleTheme} title={themeTitle} className="mr-2">
            {ThemeIcon && <ThemeIcon className="h-5 w-5" />}
          </Button>
          <Button variant="outline" className="hidden md:flex">
            Log In
          </Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </nav>
  );
};

export default GeneralNavbar;
