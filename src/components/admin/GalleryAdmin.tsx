
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Edit, Trash2, Image as ImageIcon, X } from "lucide-react";

interface GalleryPhoto {
  id: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string;
  display_order: number;
  is_featured: boolean;
  created_at: string;
}

const GalleryAdmin = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string[]>([]);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    is_featured: false
  });

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
      toast({
        title: "Error",
        description: "Failed to fetch gallery photos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMultipleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadProgress([]);
    
    try {
      const uploadedFiles: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgress(prev => [...prev, `Uploading ${file.name}...`]);
        
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${i}.${fileExt}`;
        const filePath = `gallery/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('gallery-images')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`);
        }

        const { data: { publicUrl } } = supabase.storage
          .from('gallery-images')
          .getPublicUrl(filePath);

        const photoTitle = formData.title || `Photo ${photos.length + uploadedFiles.length + 1}`;
        
        const { error: insertError } = await supabase
          .from('gallery_photos')
          .insert({
            title: photoTitle,
            description: formData.description || null,
            category: 'Gallery', // Default category
            image_url: publicUrl,
            display_order: photos.length + uploadedFiles.length,
            is_featured: formData.is_featured
          });

        if (insertError) {
          console.error('Insert error:', insertError);
          throw new Error(`Failed to save ${file.name}: ${insertError.message}`);
        }

        uploadedFiles.push(file.name);
        setUploadProgress(prev => prev.map((msg, idx) => 
          idx === i ? `✓ ${file.name} uploaded successfully` : msg
        ));
      }

      toast({
        title: "Success",
        description: `Successfully uploaded ${uploadedFiles.length} photo(s)`,
      });

      setFormData({
        title: "",
        description: "",
        is_featured: false
      });

      // Clear the file input
      event.target.value = '';
      
      fetchPhotos();
    } catch (error) {
      console.error('Error uploading photos:', error);
      toast({
        title: "Upload Error",
        description: error instanceof Error ? error.message : "Failed to upload photos",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setUploadProgress([]);
    }
  };

  const handleEdit = async () => {
    if (!editingPhoto) return;

    try {
      const { error } = await supabase
        .from('gallery_photos')
        .update({
          title: formData.title,
          description: formData.description || null,
          display_order: editingPhoto.display_order,
          is_featured: formData.is_featured
        })
        .eq('id', editingPhoto.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Photo updated successfully",
      });

      setEditingPhoto(null);
      setIsDialogOpen(false);
      fetchPhotos();
    } catch (error) {
      console.error('Error updating photo:', error);
      toast({
        title: "Error",
        description: "Failed to update photo",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (photoId: string, imageUrl: string) => {
    try {
      // Extract file path from URL
      const urlParts = imageUrl.split('/');
      const filePath = `gallery/${urlParts[urlParts.length - 1]}`;

      // Delete from storage
      await supabase.storage
        .from('gallery-images')
        .remove([filePath]);

      // Delete from database
      const { error } = await supabase
        .from('gallery_photos')
        .delete()
        .eq('id', photoId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Photo deleted successfully",
      });

      fetchPhotos();
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast({
        title: "Error",
        description: "Failed to delete photo",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (photo: GalleryPhoto) => {
    setEditingPhoto(photo);
    setFormData({
      title: photo.title,
      description: photo.description || "",
      is_featured: photo.is_featured
    });
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="text-white">Loading gallery photos...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Photos (Multiple files supported)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Title (optional - will auto-generate if empty)"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured-upload"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="featured-upload" className="text-sm text-white">Mark as featured</label>
            </div>
          </div>
          <Textarea
            placeholder="Description (optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-gray-700 border-gray-600 text-white"
          />
          <div className="space-y-4">
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleMultipleFileUpload}
              disabled={uploading}
              className="bg-gray-700 border-gray-600 text-white file:bg-blue-600 file:text-white"
            />
            {uploading && (
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-white font-medium mb-2">Upload Progress:</h4>
                {uploadProgress.map((progress, index) => (
                  <div key={index} className="text-sm text-gray-300 mb-1">
                    {progress}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Gallery Photos ({photos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {photos.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No photos uploaded yet. Upload your first photos above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="bg-gray-700 rounded-lg overflow-hidden">
                  <div className="aspect-square relative">
                    <img 
                      src={photo.image_url} 
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                    {photo.is_featured && (
                      <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                        FEATURED
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="text-white font-medium truncate">{photo.title}</h3>
                    <p className="text-gray-400 text-sm">{photo.category}</p>
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(photo)}
                        className="flex-1"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(photo.id, photo.image_url)}
                        className="flex-1"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Edit Photo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Photo title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
            />
            <Textarea
              placeholder="Photo description (optional)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="featured" className="text-sm">Featured photo</label>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700 flex-1">
                Save Changes
              </Button>
              <Button onClick={() => setIsDialogOpen(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryAdmin;
