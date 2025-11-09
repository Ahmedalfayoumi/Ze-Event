"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const proposalFormSchema = z.object({
  weddingDate: z.string().min(1, { message: "Wedding date is required." }),
  guestCount: z.string().regex(/^\d+$/, { message: "Guest count must be a number." }).transform(Number),
  budget: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Budget must be a valid number." }).transform(Number),
  preferredServices: z.string().min(1, { message: "Please specify your preferred services." }),
  additionalNotes: z.string().optional(),
});

const ProposalSelection = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof proposalFormSchema>>({
    resolver: zodResolver(proposalFormSchema),
    defaultValues: {
      weddingDate: "",
      guestCount: 0,
      budget: 0,
      preferredServices: "",
      additionalNotes: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof proposalFormSchema>) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      toast.error("You must be logged in to submit a proposal.");
      navigate("/auth"); // Redirect to auth if not logged in
      return;
    }

    const { error } = await supabase.from('proposals').insert([
      {
        user_id: user.id,
        wedding_date: values.weddingDate,
        guest_count: values.guestCount,
        budget: values.budget,
        preferred_services: values.preferredServices,
        additional_notes: values.additionalNotes,
      },
    ]);

    if (error) {
      toast.error("Failed to submit proposal: " + error.message);
      console.error("Error submitting proposal:", error);
    } else {
      toast.success("Your wedding proposal has been submitted successfully! We'll be in touch soon.");
      form.reset();
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1 text-center">
          <Sparkles className="h-16 w-16 text-rose-400 mx-auto mb-4" />
          <CardTitle className="text-4xl font-bold text-primary">Your Dream Wedding Starts Here</CardTitle>
          <CardDescription className="text-xl text-muted-foreground">
            Tell us about your vision, and we'll craft a personalized proposal for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="weddingDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Wedding Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="guestCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Guests</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 150" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Budget ($)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="e.g., 25000.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferredServices"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Services</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Full planning, venue sourcing, catering, photography, decor..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="additionalNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes / Special Requests</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any other details you'd like us to know?"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-300 to-amber-200 text-primary-foreground hover:from-rose-400 hover:to-amber-300 shadow-lg py-6 text-lg"
                disabled={!form.formState.isValid}
              >
                Submit Proposal
              </Button>
            </form>
          </Form>
          <p className="mt-4 text-sm text-red-500 text-center">
            **Important:** This functionality requires a Supabase project with a `proposals` table (columns: `id`, `user_id`, `wedding_date`, `guest_count`, `budget`, `preferred_services`, `additional_notes`, `created_at`) for persistent storage.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProposalSelection;