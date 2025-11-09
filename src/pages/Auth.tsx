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
import { Chrome, Apple } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

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

  const onSignUpSubmit = (values: z.infer<typeof signUpFormSchema>) => {
    console.log("Sign Up Submitted:", values);
    toast.success("Account created successfully! Redirecting to proposal selection.");
    signUpForm.reset();
    navigate("/proposal-selection");
  };

  const onSignInSubmit = (values: z.infer<typeof signInFormSchema>) => {
    console.log("Sign In Submitted:", values);
    toast.success("Logged in successfully! Redirecting to proposal selection.");
    signInForm.reset();
    navigate("/proposal-selection");
  };

  const handleOAuthLogin = (provider: string) => {
    // In a real application, this would initiate the OAuth flow.
    // For this MVP, we'll simulate a successful login.
    toast.success(`Logged in successfully with ${provider}!`);
    console.log(`Simulating login with ${provider}`);
    navigate("/client-info"); // Redirect to client info form after simulated login for missing details
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
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="signin">Sign In</TabsTrigger>
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
          </Tabs>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full py-6 text-lg flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition-shadow"
            onClick={() => handleOAuthLogin("Google")}
          >
            <Chrome className="h-6 w-6" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full py-6 text-lg flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition-shadow"
            onClick={() => handleOAuthLogin("Apple")}
          >
            <Apple className="h-6 w-6" />
            Continue with Apple
          </Button>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            By continuing, you agree to our <Link to="#" className="underline hover:text-primary">Privacy Policy</Link>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;