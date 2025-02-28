import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changeTheme } from "@/redux/themeSlice";
import { Themes } from "@/interfaces/theme";
import { MoonIcon, SunIcon } from "lucide-react";

const GeneralNavbar = () => {
  const dispatch = useAppDispatch();
  const { selectedTheme } = useAppSelector((state: any) => state.theme);

  const toggleTheme = () => {
    const newTheme = selectedTheme === Themes.dark ? Themes.light : Themes.dark;
    dispatch(changeTheme({ selectedTheme: newTheme }));
  };

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl">
            ShadcnApp
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              About
            </Link>
            <Link
              href="/features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="/docs"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Documentation
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            title={selectedTheme === Themes.dark ? "Switch to light mode" : "Switch to dark mode"}
            className="mr-2"
          >
            {selectedTheme === Themes.dark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
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
