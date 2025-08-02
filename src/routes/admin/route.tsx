import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ArtworkManagement } from "./-components/ArtworkManagement";
import { OrdersManagement } from "./-components/OrdersManagement";
import { isAdminFn } from "../-hooks/use-is-admin";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
  beforeLoad: async () => {
    const isAdmin = await isAdminFn();
    if (!isAdmin) {
      throw redirect({
        to: "/unauthorized",
      });
    }
  },
});

function AdminDashboard() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage artworks and orders for the Art Station gallery
        </p>
      </div>

      <Tabs defaultValue="artworks" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="artworks">Artwork Management</TabsTrigger>
          <TabsTrigger value="orders">Orders Management</TabsTrigger>
        </TabsList>

        <TabsContent value="artworks">
          <ArtworkManagement />
        </TabsContent>

        <TabsContent value="orders">
          <OrdersManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
