"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase"; // Import Supabase client
import { PlusCircle, Edit, Trash2 } from "lucide-react";

// Define schema for a page
const pageSchema = z.object({
  title: z.string().min(1, { message: "Page title is required." }),
  content: z.string().min(10, { message: "Page content must be at least 10 characters." }),
});

// Define type for a page
interface Page {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

const AdminPages = () => {
  const [pages, setPages] = React.useState<Page[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [editingPage, setEditingPage] = React.useState<Page | null>(null);

  const form = useForm<z.infer<typeof pageSchema>>({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const fetchPages = React.useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('pages').select('*').order('created_at', { ascending: false });
    if (error) {
      toast.error("Failed to fetch pages: " + error.message);
      console.error("Error fetching pages:", error);
    } else {
      setPages(data as Page[]);
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const onSubmit = async (values: z.infer<typeof pageSchema>) => {
    if (editingPage) {
      // Update existing page
      const { error } = await supabase
        .from('pages')
        .update({ title: values.title, content: values.content })
        .eq('id', editingPage.id);

      if (error) {
        toast.error("Failed to update page: " + error.message);
        console.error("Error updating page:", error);
      } else {
        toast.success("Page updated successfully!");
        form.reset();
        setEditingPage(null);
        fetchPages();
      }
    } else {
      // Add new page
      const { error } = await supabase.from('pages').insert([values]);

      if (error) {
        toast.error("Failed to add page: " + error.message);
        console.error("Error adding page:", error);
      } else {
        toast.success("Page added successfully!");
        form.reset();
        fetchPages();
      }
    }
  };

  const handleEdit = (page: Page) => {
    setEditingPage(page);
    form.reset({
      title: page.title,
      content: page.content,
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this page?")) {
      const { error } = await supabase.from('pages').delete().eq('id', id);
      if (error) {
        toast.error("Failed to delete page: " + error.message);
        console.error("Error deleting page:", error);
      } else {
        toast.success("Page deleted successfully!");
        fetchPages();
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">Page Management</h1>

      {/* Add/Edit Page Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingPage ? "Edit Page" : "Add New Page"}</CardTitle>
          <CardDescription>
            {editingPage ? `Editing page: ${editingPage.title}` : "Create a new page for your website."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Our Story" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write your page content here..." rows={8} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-rose-300 to-amber-200 text-primary-foreground hover:from-rose-400 hover:to-amber-300 shadow-lg"
                >
                  {editingPage ? "Update Page" : "Add Page"}
                </Button>
                {editingPage && (
                  <Button variant="outline" onClick={() => {
                    setEditingPage(null);
                    form.reset();
                  }}>
                    Cancel Edit
                  </Button>
                )}
              </div>
            </form>
          </Form>
          <p className="mt-4 text-sm text-red-500">
            **Important:** This functionality requires a Supabase project with a `pages` table (columns: `id`, `title`, `content`, `created_at`) for persistent storage.
          </p>
        </CardContent>
      </Card>

      {/* Existing Pages List */}
      <Card>
        <CardHeader>
          <CardTitle>Existing Pages</CardTitle>
          <CardDescription>Manage your current website pages.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading pages...</p>
          ) : pages.length === 0 ? (
            <p className="text-muted-foreground">No pages found. Add a new page above!</p>
          ) : (
            <div className="space-y-4">
              {pages.map((page) => (
                <div key={page.id} className="flex items-center justify-between border-b pb-2 last:border-b-0">
                  <div>
                    <h3 className="font-semibold text-primary">{page.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{page.content}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(page)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(page.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPages;