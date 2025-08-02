import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateArtwork } from "@/routes/-hooks/use-update-artwork";
import { Artwork } from "@/db/schema";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required"),
  image: z.instanceof(File).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface EditArtworkFormProps {
  artwork: Artwork & { user?: { id: string; name: string; email: string } | null };
  children: React.ReactNode;
}

export function EditArtworkForm({ artwork, children }: EditArtworkFormProps) {
  const [open, setOpen] = useState(false);
  const updateArtworkMutation = useUpdateArtwork();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: artwork.title,
      description: artwork.description || "",
      price: artwork.price.toString(),
      image: undefined,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const price = parseFloat(data.price);
      if (isNaN(price) || price < 0) {
        form.setError("price", { message: "Please enter a valid price" });
        return;
      }

      let imageData: string | undefined;
      let imageMimeType: string | undefined;

      if (data.image) {
        // Validate image file
        if (!data.image.type.startsWith('image/')) {
          form.setError("image", { message: "Please select a valid image file" });
          return;
        }

        // Convert image to base64
        const reader = new FileReader();
        const imageBase64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(data.image!);
        });

        imageData = imageBase64;
        imageMimeType = data.image.type;
      }

      await updateArtworkMutation.mutateAsync({
        data: {
          id: artwork.id,
          title: data.title,
          description: data.description,
          price,
          imageData,
          imageMimeType,
        }
      });

      toast.success("Artwork updated successfully!");
      setOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update artwork");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Artwork</DialogTitle>
          <DialogDescription>
            Update the details for "{artwork.title}". Changes will be saved immediately.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter artwork title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter artwork description (optional)"
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a brief description of the artwork.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the price in dollars (e.g., 25.50).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>Artwork Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        onChange(file);
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload a new image to replace the current one (optional).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
                disabled={updateArtworkMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={updateArtworkMutation.isPending}
              >
                {updateArtworkMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update Artwork
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}