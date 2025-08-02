import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Plus, Search, Filter, Eye } from "lucide-react";

export const Route = createFileRoute("/admin/artworks")({
  component: ArtworksManagement,
});

function ArtworksManagement() {
  const mockArtworks = [
    {
      id: 1,
      title: "Sunset Dreams",
      artist: "Alice Johnson",
      status: "Published",
      price: "$125",
      views: 1234,
      likes: 89,
      createdAt: "2024-01-20",
      thumbnail: "/api/placeholder/150/150",
    },
    {
      id: 2,
      title: "Ocean Waves",
      artist: "Carol Davis",
      status: "Pending Review",
      price: "$75",
      views: 456,
      likes: 23,
      createdAt: "2024-02-15",
      thumbnail: "/api/placeholder/150/150",
    },
    {
      id: 3,
      title: "Mountain Vista",
      artist: "Alice Johnson",
      status: "Draft",
      price: "$200",
      views: 0,
      likes: 0,
      createdAt: "2024-03-01",
      thumbnail: "/api/placeholder/150/150",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Artworks Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage artwork submissions, reviews, and featured pieces across the gallery.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Artwork
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search artworks..." 
            className="pl-10" 
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline">Export</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockArtworks.map((artwork) => (
          <Card key={artwork.id} className="overflow-hidden">
            <div className="aspect-square bg-muted relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Eye className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{artwork.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">by {artwork.artist}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex justify-between items-center mb-3">
                <Badge 
                  variant={
                    artwork.status === "Published" ? "default" : 
                    artwork.status === "Pending Review" ? "secondary" : 
                    "outline"
                  }
                >
                  {artwork.status}
                </Badge>
                <span className="font-semibold text-lg">{artwork.price}</span>
              </div>
              
              <div className="flex justify-between text-sm text-muted-foreground mb-3">
                <span>{artwork.views} views</span>
                <span>{artwork.likes} likes</span>
              </div>
              
              <div className="text-xs text-muted-foreground">
                Created {artwork.createdAt}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Artworks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">567</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">23</div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Featured</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">8</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently featured
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">$12,450</div>
            <p className="text-xs text-muted-foreground mt-1">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              Review Pending Submissions
            </Button>
            <Button variant="outline" className="justify-start">
              Update Featured Artworks
            </Button>
            <Button variant="outline" className="justify-start">
              Generate Sales Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}