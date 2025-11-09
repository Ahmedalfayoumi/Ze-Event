"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const passwordSchema = z.object({
  currentPassword: z.string().min(1, { message: "Current password is required." }),
  newPassword: z.string().min(8, { message: "New password must be at least 8 characters." }),
  confirmNewPassword: z.string().min(8, { message: "Please confirm your new password." }),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "New passwords do not match.",
  path: ["confirmNewPassword"],
});

const AdminSettings = () => {
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onPasswordSubmit = (values: z.infer<typeof passwordSchema>) => {
    // This is a client-side check for demonstration purposes only.
    // In a real application, this would involve an API call to a secure backend.
    if (values.currentPassword === "admin") { // Hardcoded check for the demo admin password
      toast.success("Admin password updated (client-side only).");
      console.log("Password change attempt:", values);
      passwordForm.reset();
    } else {
      passwordForm.setError("currentPassword", { message: "Incorrect current password." });
      toast.error("Failed to update password: Incorrect current password.");
    }
  };

  // Placeholder for theme settings
  const themes = ["Light", "Dark", "System"];
  const [selectedTheme, setSelectedTheme] = React.useState("System");

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">Admin Settings</h1>

      {/* Change Admin Password Card */}
      <Card>
        <CardHeader>
          <CardTitle>Change Admin Password</CardTitle>
          <CardDescription>Update the password for the administrator account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4 max-w-md">
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter current password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-gradient-to-r from-rose-300 to-amber-200 text-primary-foreground hover:from-rose-400 hover:to-amber-300 shadow-lg">
                Update Password
              </Button>
            </form>
          </Form>
          <p className="mt-4 text-sm text-red-500">
            **Important:** This password change is for demonstration only. A secure backend is required for actual password updates and secure authentication.
          </p>
        </CardContent>
      </Card>

      {/* Theme Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle>Theme Settings</CardTitle>
          <CardDescription>Customize the visual theme of the website.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-w-md">
            <FormItem>
              <FormLabel>Select Theme</FormLabel>
              <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme} value={theme}>
                      {theme}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
            <Button disabled className="bg-gradient-to-r from-rose-300 to-amber-200 text-primary-foreground hover:from-rose-400 hover:to-amber-300 shadow-lg">
              Apply Theme (Placeholder)
            </Button>
            <p className="mt-4 text-sm text-red-500">
              **Important:** Dynamic theme switching and persistence require backend integration or a more advanced client-side state management.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;