import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { AddArtworkForm } from "@/routes/-components/AddArtworkForm";
import { EditArtworkForm } from "./EditArtworkForm";
import { useGetArtworks } from "@/routes/-hooks/use-get-artworks";
import { useDeleteArtwork } from "@/routes/-hooks/use-delete-artwork";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export function ArtworkManagement() {
  const { data: artworks = [], isLoading } = useGetArtworks();
  const deleteArtwork = useDeleteArtwork();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArtworks = artworks.filter(
    (artwork) =>
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (artworkId: string, title: string) => {
    try {
      await deleteArtwork.mutateAsync({ data: artworkId });
      toast.success(`"${title}" has been deleted successfully`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete artwork"
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Artworks</h2>
          <p className="text-muted-foreground mt-1">
            Manage all artwork submissions, including adding, editing, and
            removing pieces.
          </p>
        </div>
        <AddArtworkForm>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Artwork
          </Button>
        </AddArtworkForm>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search artworks by title or artist..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">Loading artworks...</p>
          </div>
        ) : filteredArtworks.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">
              {searchTerm
                ? "No artworks match your search."
                : "No artworks found. Add your first artwork!"}
            </p>
          </div>
        ) : (
          filteredArtworks.map((artwork) => (
            <Card key={artwork.id} className="overflow-hidden">
              <div className="aspect-square bg-muted relative">
                {artwork.imageData ? (
                  <img
                    src={artwork.imageData}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 opacity-20">
                    <div className="flex items-center justify-center h-full">
                      <Eye className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{artwork.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      by {artwork.user?.name || "Unknown"}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <EditArtworkForm artwork={artwork}>
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="cursor-pointer"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      </EditArtworkForm>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                            className="cursor-pointer text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Artwork</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{artwork.title}"?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleDelete(artwork.id, artwork.title)
                              }
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex justify-between items-center mb-3">
                  <Badge variant="default">Published</Badge>
                  <span className="font-semibold text-lg">
                    ${artwork.price.toFixed(2)}
                  </span>
                </div>

                <div className="text-xs text-muted-foreground">
                  Created {new Date(artwork.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
