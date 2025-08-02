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
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAddArtwork } from "@/routes/-hooks/use-add-artwork";

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required"),
  image: z.instanceof(File).optional(),
  isForSale: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

interface AddArtworkFormProps {
  children: React.ReactNode;
}

export function AddArtworkForm({ children }: AddArtworkFormProps) {
  const [open, setOpen] = useState(false);
  const addArtworkMutation = useAddArtwork();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      image: undefined,
      isForSale: true,
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
        if (!data.image.type.startsWith("image/")) {
          form.setError("image", {
            message: "Please select a valid image file",
          });
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

      await addArtworkMutation.mutateAsync({
        title: data.title,
        description: data.description || undefined,
        price,
        imageData,
        imageMimeType,
        isForSale: data.isForSale,
      });

      toast.success("Artwork added successfully!");
      setOpen(false);
      form.reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add artwork"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Add New Artwork</DialogTitle>
          <DialogDescription>
            Add a new piece of artwork to your gallery. Fill out the details
            below.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 pr-4 h-0">
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
                name="isForSale"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Available for Sale
                      </FormLabel>
                      <FormDescription>
                        Toggle whether this artwork is available for purchase.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
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
                      Upload an image of the artwork (JPG, PNG, etc.).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter className="flex-shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={addArtworkMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={addArtworkMutation.isPending}
            onClick={form.handleSubmit(onSubmit)}
          >
            {addArtworkMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Add Artwork
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
