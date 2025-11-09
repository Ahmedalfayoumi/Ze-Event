"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Chrome, Apple } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Added Link import
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();

  const handleOAuthLogin = (provider: string) => {
    // In a real application, this would initiate the OAuth flow.
    // For this MVP, we'll simulate a successful login.
    toast.success(`Logged in successfully with ${provider}!`);
    console.log(`Simulating login with ${provider}`);
    navigate("/client-info"); // Redirect to client info form after simulated login
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-primary">Welcome to Ze Events</CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign in or create an account to get your personalized wedding proposal.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            variant="outline"
            className="w-full py-6 text-lg flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition-shadow"
            onClick={() => handleOAuthLogin("Google")}
          >
            <Chrome className="h-6 w-6" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full py-6 text-lg flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition-shadow"
            onClick={() => handleOAuthLogin("Apple")}
          >
            <Apple className="h-6 w-6" />
            Continue with Apple
          </Button>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            By continuing, you agree to our <Link to="#" className="underline hover:text-primary">Privacy Policy</Link>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;