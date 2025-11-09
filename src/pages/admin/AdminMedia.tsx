"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminMedia = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">Media Library</h1>
      <Card>
        <CardHeader>
          <CardTitle>Manage Website Media</CardTitle>
          <CardDescription>Upload, organize, and delete images and other media files.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This section will allow you to manage your images and other media files.
            Full implementation requires a backend for file storage (e.g., cloud storage) and an API to manage uploads and deletions.
          </p>
          <Button className="bg-gradient-to-r from-rose-300 to-amber-200 text-primary-foreground hover:from-rose-400 hover:to-amber-300 shadow-lg">
            Upload Media (Placeholder)
          </Button>
          <p className="mt-4 text-sm text-red-500">
            **Important:** Current functionality is for demonstration only. A backend is needed for persistent storage.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMedia;