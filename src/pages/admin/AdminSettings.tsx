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
import { supabase } from "@/lib/supabase"; // Import Supabase client

const passwordSchema = z.object({
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
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onPasswordSubmit = async (values: z.infer<typeof passwordSchema>) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      toast.error("You must be logged in to change your password.");
      console.error("Error getting user session:", userError);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: values.newPassword,
    });

    if (error) {
      toast.error("Failed to update password: " + error.message);
      console.error("Error updating password:", error);
    } else {
      toast.success("Password updated successfully!");
      passwordForm.reset();
    }
  };

  // Placeholder for theme settings
  const themes = ["Light", "Dark", "System"];
  const [selectedTheme, setSelectedTheme] = React.useState("System");

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    // In a real application, you would save this preference to a Supabase table
    // associated with the admin user, or to a global settings table.
    toast.info(`Theme set to ${theme} (client-side only). Persistence requires backend integration.`);
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">Admin Settings</h1>

      {/* Change Admin Password Card */}
      <Card>
        <CardHeader>
          <CardTitle>Change Admin Password</CardTitle>
          <CardDescription>Update the password for your administrator account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4 max-w-md">
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
              <Select value={selectedTheme} onValueChange={handleThemeChange}>
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
            <Button className="bg-gradient-to-r from-rose-300 to-amber-200 text-primary-foreground hover:from-rose-400 hover:to-amber-300 shadow-lg">
              Apply Theme
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Dynamic theme switching and persistence require backend integration (e.g., storing preference in Supabase) or a more advanced client-side state management.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;