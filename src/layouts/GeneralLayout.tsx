import React, { useEffect } from "react";
import Link from "next/link";
import GeneralNavbar from "./GeneralNavbar";
import { Themes } from "@/interfaces/theme";
import { useAppSelector } from "@/redux/hooks";

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  const { selectedTheme } = useAppSelector((state: any) => state.theme);

  useEffect(() => {
    // Apply theme class to document element
    if (selectedTheme === Themes.dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [selectedTheme]);

  return (
    <div className="flex min-h-screen flex-col">
      <GeneralNavbar />
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} ShadcnApp. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GeneralLayout;
