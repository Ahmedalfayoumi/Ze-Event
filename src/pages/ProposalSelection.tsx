"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const ProposalSelection = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl text-center">
        <CardHeader className="space-y-1">
          <Sparkles className="h-16 w-16 text-rose-400 mx-auto mb-4" />
          <CardTitle className="text-4xl font-bold text-primary">Almost There!</CardTitle>
          <CardDescription className="text-xl text-muted-foreground">
            Your personalized wedding journey is about to begin.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Your custom wedding package form will appear here—Ze Events is finalizing your dream proposal!
            We're meticulously crafting options tailored just for you. Please check back soon!
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            In the meantime, feel free to explore our <a href="/services" className="underline hover:text-primary">services</a> or <a href="/gallery" className="underline hover:text-primary">gallery</a>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProposalSelection;