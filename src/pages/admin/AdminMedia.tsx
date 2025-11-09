"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase"; // Import Supabase client
import { Upload, Image as ImageIcon, Trash2 } from "lucide-react";

interface MediaFile {
  name: string;
  url: string;
  id: string; // Supabase storage items don't have a direct 'id', but we can use name or path
}

const AdminMedia = () => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [mediaFiles, setMediaFiles] = React.useState<MediaFile[]>([]);
  const [loading, setLoading] = React.useState(true);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const BUCKET_NAME = "media-assets"; // You'll need to create this bucket in Supabase Storage

  const fetchMediaFiles = React.useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.storage.from(BUCKET_NAME).list('', {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    });

    if (error) {
      toast.error("Failed to fetch media files: " + error.message);
      console.error("Error fetching media files:", error);
    } else {
      const filesWithUrls = data.map(file => ({
        name: file.name,
        url: supabase.storage.from(BUCKET_NAME).getPublicUrl(file.name).data.publicUrl,
        id: file.name, // Using name as a unique identifier for display
      }));
      setMediaFiles(filesWithUrls);
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    fetchMediaFiles();
  }, [fetchMediaFiles]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    const file = selectedFile;
    const filePath = `${file.name}`; // Or a more structured path like `images/${file.name}`

    const { error } = await supabase.storage.from(BUCKET_NAME).upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      toast.error("Failed to upload media: " + error.message);
      console.error("Error uploading media:", error);
    } else {
      toast.success("Media uploaded successfully!");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the file input
      }
      fetchMediaFiles(); // Refresh the list
    }
  };

  const handleDelete = async (fileName: string) => {
    if (window.confirm(`Are you sure you want to delete "${fileName}"?`)) {
      const { error } = await supabase.storage.from(BUCKET_NAME).remove([fileName]);

      if (error) {
        toast.error("Failed to delete media: " + error.message);
        console.error("Error deleting media:", error);
      } else {
        toast.success("Media deleted successfully!");
        fetchMediaFiles(); // Refresh the list
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">Media Library</h1>

      {/* Upload Media Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upload New Media</CardTitle>
          <CardDescription>Upload images and other media files to your website.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="flex-1"
            />
            <Button
              onClick={handleUpload}
              disabled={!selectedFile}
              className="bg-gradient-to-r from-rose-300 to-amber-200 text-primary-foreground hover:from-rose-400 hover:to-amber-300 shadow-lg"
            >
              <Upload className="h-4 w-4 mr-2" /> Upload
            </Button>
          </div>
          {selectedFile && (
            <p className="text-sm text-muted-foreground">Selected: {selectedFile.name}</p>
          )}
        </CardContent>
      </Card>

      {/* Existing Media List */}
      <Card>
        <CardHeader>
          <CardTitle>Existing Media</CardTitle>
          <CardDescription>Browse and manage your uploaded media files.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading media files...</p>
          ) : mediaFiles.length === 0 ? (
            <p className="text-muted-foreground">No media files found. Upload some above!</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {mediaFiles.map((file) => (
                <div key={file.id} className="relative group overflow-hidden rounded-md shadow-sm border">
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-2 text-sm truncate text-muted-foreground">{file.name}</div>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDelete(file.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMedia;