"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase"; // Import Supabase client

const countryCodes = [
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "India" },
  { code: "+61", country: "Australia" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+81", country: "Japan" },
  { code: "+86", country: "China" },
  { code: "+55", country: "Brazil" },
  { code: "+27", country: "South Africa" },
];

const signUpFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full Name is required and must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  mobileCountryCode: z.string().min(1, { message: "Please select a country code." }),
  mobileNumber: z.string().regex(/^\d{7,15}$/, { message: "Please enter a valid mobile number (7-15 digits)." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
});

const signInFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const adminLoginFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const Auth = () => {
  const navigate = useNavigate();

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobileCountryCode: "+1",
      mobileNumber: "",
      password: "",
    },
  });

  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const adminLoginForm = useForm<z.infer<typeof adminLoginFormSchema>>({
    resolver: zodResolver(adminLoginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSignUpSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
    const { email, password, fullName, mobileCountryCode, mobileNumber } = values;
    const fullPhoneNumber = `${mobileCountryCode}${mobileNumber}`;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone_number: fullPhoneNumber,
        },
      },
    });

    if (error) {
      toast.error("Sign up failed: " + error.message);
      console.error("Supabase Sign Up Error:", error);
    } else if (data.user) {
      toast.success("Account created successfully! Please check your email to verify your account. Redirecting to proposal selection.");
      signUpForm.reset();
      navigate("/proposal-selection");
    } else if (data.session === null && data.user === null) {
      // This case happens if email confirmation is required
      toast.success("Account created! Please check your email to verify your account before signing in. Redirecting to proposal selection.");
      signUpForm.reset();
      navigate("/proposal-selection");
    }
  };

  const onSignInSubmit = async (values: z.infer<typeof signInFormSchema>) => {
    const { email, password } = values;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Sign in failed: " + error.message);
      console.error("Supabase Sign In Error:", error);
    } else {
      toast.success("Logged in successfully! Redirecting to proposal selection.");
      signInForm.reset();
      navigate("/proposal-selection");
    }
  };

  const onAdminLoginSubmit = (values: z.infer<typeof adminLoginFormSchema>) => {
    if (values.username === "admin" && values.password === "admin") {
      toast.success("Admin login successful! Redirecting to Control Panel.");
      adminLoginForm.reset();
      navigate("/control-panel");
    } else {
      toast.error("Invalid admin credentials.");
    }
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
          <Tabs defaultValue="signup" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="admin">Control Panel</TabsTrigger>
            </TabsList>
            <TabsContent value="signup" className="mt-6">
              <Form {...signUpForm}>
                <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-4">
                  <FormField
                    control={signUpForm.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Your Full Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex space-x-2">
                    <FormField
                      control={signUpForm.control}
                      name="mobileCountryCode"
                      render={({ field }) => (
                        <FormItem className="w-1/3">
                          <FormLabel>Code <span className="text-red-500">*</span></FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countryCodes.map((cc) => (
                                <SelectItem key={cc.code} value={cc.code}>
                                  {cc.code}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
                      name="mobileNumber"
                      render={({ field }) => (
                        <FormItem className="w-2/3">
                          <FormLabel>Mobile Number <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="e.g., 1234567890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={signUpForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="********" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-rose-300 to-amber-200 text-primary-foreground hover:from-rose-400 hover:to-amber-300 shadow-lg py-6 text-lg"
                    disabled={!signUpForm.formState.isValid}
                  >
                    Sign Up
                  </Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="signin" className="mt-6">
              <Form {...signInForm}>
                <form onSubmit={signInForm.handleSubmit(onSignInSubmit)} className="space-y-4">
                  <FormField
                    control={signInForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={signInForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="********" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-rose-300 to-amber-200 text-primary-foreground hover:from-rose-400 hover:to-amber-300 shadow-lg py-6 text-lg"
                    disabled={!signInForm.formState.isValid}
                  >
                    Sign In
                  </Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="admin" className="mt-6">
              <Form {...adminLoginForm}>
                <form onSubmit={adminLoginForm.handleSubmit(onAdminLoginSubmit)} className="space-y-4">
                  <FormField
                    control={adminLoginForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Admin Username <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="admin" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={adminLoginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Admin Password <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="admin" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-rose-300 to-amber-200 text-primary-foreground hover:from-rose-400 hover:to-amber-300 shadow-lg py-6 text-lg"
                    disabled={!adminLoginForm.formState.isValid}
                  >
                    Admin Login
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            By continuing, you agree to our <Link to="#" className="underline hover:text-primary">Privacy Policy</Link>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;