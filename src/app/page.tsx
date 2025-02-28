"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import GeneralLayout from "@/layouts/GeneralLayout";

const Home: React.FC = () => {
  return (
    <GeneralLayout>
      <div className="container py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Next.js with Shadcn UI</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Next.js</CardTitle>
                <CardDescription>The React Framework for the Web</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Next.js by Vercel is a React framework for building full-stack web applications. You use React
                  Components to build user interfaces, and Next.js for additional features and optimizations.
                </p>
              </CardContent>
              <CardFooter>
                <Button>Learn More</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shadcn UI</CardTitle>
                <CardDescription>Beautiful UI components built with Radix UI and Tailwind CSS</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Shadcn UI provides accessible and customizable components that you can copy and paste into your apps.
                  Free. Open Source. Use this as your UI foundation.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Explore Components</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default Home;
