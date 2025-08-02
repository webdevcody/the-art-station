import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useGetArtworkById } from "../../-hooks/use-get-artwork-by-id";
import { authClient } from "~/lib/auth-client";
import { isAdminFn } from "~/routes/-hooks/use-is-admin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
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
import { useUpdateArtwork } from "@/routes/-hooks/use-update-artwork";
import { ArtworkWithUser } from "@/types/artwork";

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

interface EditArtworkFormProps {
  artwork: ArtworkWithUser;
  fromAdmin?: boolean;
}

function EditArtworkForm({ artwork, fromAdmin }: EditArtworkFormProps) {
  const updateArtworkMutation = useUpdateArtwork();
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: artwork.title,
      description: artwork.description || "",
      price: artwork.price.toString(),
      image: undefined,
      isForSale: artwork.isForSale,
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

      await updateArtworkMutation.mutateAsync({
        data: {
          id: artwork.id,
          title: data.title,
          description: data.description,
          price,
          imageData,
          imageMimeType,
          isForSale: data.isForSale,
        },
      });

      toast.success("Artwork updated successfully!");

      // Redirect back to where the user came from
      if (fromAdmin) {
        navigate({ to: "/admin" });
      } else {
        navigate({
          to: "/artworks/$artworkId",
          params: { artworkId: artwork.id },
        });
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update artwork"
      );
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    rows={4}
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
                  Upload a new image to replace the current one (optional).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={updateArtworkMutation.isPending}
              className="flex-1"
            >
              {updateArtworkMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update Artwork
            </Button>
            <Link
              to={fromAdmin ? "/admin" : "/artworks/$artworkId"}
              params={fromAdmin ? {} : { artworkId: artwork.id }}
            >
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}

export const Route = createFileRoute("/artworks/$artworkId/edit")({
  component: EditArtwork,
  validateSearch: (search: Record<string, unknown>) => ({
    from: search.from as string | undefined,
  }),
  beforeLoad: async () => {
    const isAdmin = await isAdminFn();
    if (!isAdmin) {
      throw redirect({
        to: "/unauthorized",
      });
    }
  },
});

function EditArtwork() {
  const { artworkId } = Route.useParams();
  const search = Route.useSearch();
  const { data: artwork, isLoading, error } = useGetArtworkById(artworkId);
  const { data: sessionData } = authClient.useSession();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <p className="text-muted-foreground">Loading artwork...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-foreground">
              Error Loading Artwork
            </h1>
            <p className="text-muted-foreground mb-6">
              There was an error loading the artwork: {error.message}
            </p>
            <Link to="/browse">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Browse
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-foreground">
              Artwork Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The artwork you're looking for doesn't exist.
            </p>
            <Link to="/browse">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Browse
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to={search.from === "admin" ? "/admin" : "/artworks/$artworkId"}
            params={search.from === "admin" ? {} : { artworkId }}
          >
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {search.from === "admin" ? "Back to Admin" : "Back to Artwork"}
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">
            Edit Artwork
          </h1>
          <p className="text-muted-foreground">
            Update the details for "{artwork.title}"
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="w-full h-96 bg-muted relative overflow-hidden">
                  {artwork.imageData ? (
                    <img
                      src={artwork.imageData}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-muted flex items-center justify-center">
                      <p className="text-muted-foreground">
                        No image available
                      </p>
                    </div>
                  )}
                </div>
              </CardHeader>
            </Card>
          </div>

          <div>
            <EditArtworkForm
              artwork={artwork}
              fromAdmin={search.from === "admin"}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
