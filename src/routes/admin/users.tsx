import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, UserPlus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/admin/users")({
  component: UsersManagement,
});

function UsersManagement() {
  const mockUsers = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Artist",
      status: "Active",
      joinDate: "2024-01-15",
      artworks: 12,
      avatar: null,
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      role: "Collector",
      status: "Active",
      joinDate: "2024-02-20",
      artworks: 0,
      avatar: null,
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@example.com",
      role: "Artist",
      status: "Pending",
      joinDate: "2024-03-10",
      artworks: 5,
      avatar: null,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage user accounts, roles, and permissions across the platform.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search users..." 
            className="pl-10" 
          />
        </div>
        <Button variant="outline">Filter</Button>
        <Button variant="outline">Export</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={user.avatar || undefined} />
                    <AvatarFallback>
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm font-medium">{user.artworks}</p>
                    <p className="text-xs text-muted-foreground">Artworks</p>
                  </div>
                  
                  <Badge variant={user.role === "Artist" ? "default" : "secondary"}>
                    {user.role}
                  </Badge>
                  
                  <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                    {user.status}
                  </Badge>
                  
                  <div className="text-sm text-muted-foreground">
                    Joined {user.joinDate}
                  </div>
                  
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Users</span>
                <span className="font-medium">1,234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Active Artists</span>
                <span className="font-medium">456</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Collectors</span>
                <span className="font-medium">778</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="font-medium">15 new users</p>
                <p className="text-muted-foreground">This week</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">42 new users</p>
                <p className="text-muted-foreground">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Bulk Email Users
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Export User Data
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Manage Permissions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}