"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminPages = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">Page Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Manage Website Pages</CardTitle>
          <CardDescription>Add, edit, or remove pages from your website.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This section will allow you to add, edit, and remove pages.
            Implementing this fully requires a backend database to store page content and structure,
            and an API to interact with it.
          </p>
          <div className="flex gap-4">
            <Button className="bg-gradient-to-r from-rose-300 to-amber-200 text-primary-foreground hover:from-rose-400 hover:to-amber-300 shadow-lg">
              Add New Page (Placeholder)
            </Button>
            <Button variant="outline">
              Edit Existing Page (Placeholder)
            </Button>
          </div>
          <p className="mt-4 text-sm text-red-500">
            **Important:** Current functionality is for demonstration only. A backend is needed for persistent changes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPages;