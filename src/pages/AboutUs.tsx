"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutUs = () => {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-primary">About Ze Events</h1>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            At Ze Events, we believe every love story is unique and deserves a celebration that reflects its distinct charm. Founded with a passion for perfection and an eye for exquisite detail, we specialize in transforming wedding dreams into breathtaking realities. Our journey began with a simple vision: to create seamless, stress-free, and utterly unforgettable wedding experiences for couples.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our dedicated team of experienced planners works tirelessly to understand your desires, bringing a personalized touch to every aspect of your special day. From intimate gatherings to grand celebrations, we handle everything with precision, creativity, and a client-centered approach. We pride ourselves on building trust, fostering open communication, and ensuring that your wedding planning journey is as joyful as the day itself.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            With Ze Events, you're not just planning a wedding; you're crafting the first chapter of your forever. Let us weave magic into your moments, creating memories that will last a lifetime.
          </p>
        </div>
        <div className="flex justify-center">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-primary">Our Passionate Team</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src="/placeholder.svg" // Placeholder for a high-quality team or founder photo
                alt="Ze Events Team"
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <p className="text-sm text-muted-foreground text-center">
                Meet the dedicated professionals behind Ze Events, committed to making your day perfect.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;