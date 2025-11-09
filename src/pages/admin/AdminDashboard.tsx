"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">Admin Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to the Control Panel!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Use the sidebar to navigate through different administration sections.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;