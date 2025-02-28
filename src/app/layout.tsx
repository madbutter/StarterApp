import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppContainer from "@/layouts/AppContainer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js App with Shadcn UI",
  description: "A basic Next.js application with Shadcn UI and TailwindCSS",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContainer>{children}</AppContainer>
      </body>
    </html>
  );
};

export default RootLayout;
