"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ControlPanel = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl text-center">
        <CardHeader className="space-y-1">
          <Settings className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-4xl font-bold text-primary">Admin Control Panel</CardTitle>
          <CardDescription className="text-xl text-muted-foreground">
            Welcome, Administrator! This is your central hub.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Here you will be able to manage various aspects of the website.
            Further features will be added here to allow for full control over content and settings.
          </p>
          <Button asChild className="w-fit mx-auto bg-gradient-to-r from-rose-300 to-amber-200 text-primary-foreground hover:from-rose-400 hover:to-amber-300 shadow-lg text-lg px-8 py-6">
            <Link to="/">Go to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ControlPanel;