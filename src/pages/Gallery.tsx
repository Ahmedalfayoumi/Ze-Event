"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const galleryImages = [
  { src: "/placeholder.svg", alt: "Ze Events – Real Weddings 1" },
  { src: "/placeholder.svg", alt: "Ze Events – Real Weddings 2" },
  { src: "/placeholder.svg", alt: "Ze Events – Real Weddings 3" },
  { src: "/placeholder.svg", alt: "Ze Events – Real Weddings 4" },
  { src: "/placeholder.svg", alt: "Ze Events – Real Weddings 5" },
  { src: "/placeholder.svg", alt: "Ze Events – Real Weddings 6" },
  { src: "/placeholder.svg", alt: "Ze Events – Real Weddings 7" },
  { src: "/placeholder.svg", alt: "Ze Events – Real Weddings 8" },
  { src: "/placeholder.svg", alt: "Ze Events – Real Weddings 9" },
];

const Gallery = () => {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-primary">Our Gallery</h1>
      <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Explore some of the beautiful moments we've had the honor of creating. Each image tells a story of love, joy, and meticulous planning.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {galleryImages.map((image, index) => (
          <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-0">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="p-4">
                <p className="text-sm text-muted-foreground">{image.alt}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Gallery;