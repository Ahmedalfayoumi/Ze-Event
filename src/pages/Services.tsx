"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartHandshake, CalendarCheck, Users, MapPin, BriefcaseBusiness } from "lucide-react";

const services = [
  {
    icon: HeartHandshake,
    title: "Full Planning",
    description: "From concept to execution, we manage every detail, ensuring a seamless and stress-free journey to your dream wedding.",
  },
  {
    icon: CalendarCheck,
    title: "Partial Planning",
    description: "Perfect for couples who have started planning but need expert guidance and support to bring their vision to life.",
  },
  {
    icon: Users,
    title: "Day-of Coordination",
    description: "Enjoy your special day without a worry. We handle all logistics, vendor management, and timelines on your wedding day.",
  },
  {
    icon: MapPin,
    title: "Venue Sourcing",
    description: "Let us find the perfect backdrop for your celebration, matching your style, guest count, and budget with ideal venues.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Vendor Management",
    description: "We connect you with top-tier vendors, negotiate contracts, and coordinate all services to ensure a cohesive event.",
  },
  {
    icon: HeartHandshake, // Reusing icon for variety, or could add more icons
    title: "Custom Packages",
    description: "Tailored services designed to meet your unique needs and preferences, ensuring every detail is just as you imagined.",
  },
];

const Services = () => {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-primary">Our Services</h1>
      <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Ze Events offers a comprehensive range of wedding planning services designed to make your special day truly unforgettable.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <service.icon className="h-12 w-12 text-rose-400 mb-4" />
              <CardTitle className="text-2xl font-semibold text-primary">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Services;