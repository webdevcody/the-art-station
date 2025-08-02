import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  ShoppingCart, 
  DollarSign,
  Calendar,
  Download
} from "lucide-react";

export const Route = createFileRoute("/admin/analytics")({
  component: AnalyticsDashboard,
});

function AnalyticsDashboard() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "vs last month",
    },
    {
      title: "Page Views",
      value: "234,567",
      change: "+8.3%",
      trend: "up",
      icon: Eye,
      description: "vs last month",
    },
    {
      title: "Active Users",
      value: "12,345",
      change: "-2.4%",
      trend: "down",
      icon: Users,
      description: "vs last month",
    },
    {
      title: "Conversion Rate",
      value: "3.45%",
      change: "+0.8%",
      trend: "up",
      icon: ShoppingCart,
      description: "vs last month",
    },
  ];

  const topArtworks = [
    { title: "Sunset Dreams", views: 12500, sales: 8, revenue: "$1,000" },
    { title: "Ocean Waves", views: 9800, sales: 6, revenue: "$450" },
    { title: "Mountain Vista", views: 8900, sales: 4, revenue: "$800" },
    { title: "City Lights", views: 7600, sales: 5, revenue: "$625" },
    { title: "Forest Path", views: 6400, sales: 3, revenue: "$225" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Track platform performance, user engagement, and sales metrics.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown;
          const trendColor = metric.trend === "up" ? "text-green-600" : "text-red-600";
          
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center mt-1">
                  <TrendIcon className={`h-3 w-3 mr-1 ${trendColor}`} />
                  <span className={`text-xs ${trendColor}`}>
                    {metric.change}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    {metric.description}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Traffic Chart Placeholder</p>
                <p className="text-sm text-muted-foreground">
                  Interactive chart showing daily/weekly/monthly traffic trends
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
              <div className="text-center">
                <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Revenue Chart Placeholder</p>
                <p className="text-sm text-muted-foreground">
                  Sales performance and revenue breakdown analysis
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Artworks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topArtworks.map((artwork, index) => (
                <div key={artwork.title} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{artwork.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {artwork.views.toLocaleString()} views
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{artwork.revenue}</p>
                    <p className="text-sm text-muted-foreground">
                      {artwork.sales} sales
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Average Session Duration</span>
                <span className="font-medium">4m 32s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Bounce Rate</span>
                <span className="font-medium">23.4%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Pages per Session</span>
                <span className="font-medium">3.8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Return Visitor Rate</span>
                <span className="font-medium">64.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Mobile vs Desktop</span>
                <span className="font-medium">60% / 40%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Peak Traffic Hours</h3>
              <p className="text-sm text-muted-foreground">
                Most activity between 2-4 PM EST
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">User Demographics</h3>
              <p className="text-sm text-muted-foreground">
                Primary age group: 25-45 years
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <ShoppingCart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Popular Categories</h3>
              <p className="text-sm text-muted-foreground">
                Abstract and Landscape art lead sales
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}