import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Package, Clock, CheckCircle2, Eye } from "lucide-react";
import { useGetOrders } from "@/routes/-hooks/use-get-orders";
import { useUpdateOrderStatus } from "@/routes/-hooks/use-update-order-status";
import { OrderWithItems } from "~/types/order";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export function OrdersManagement() {
  const { data: orders = [], isLoading } = useGetOrders();
  const updateOrderStatus = useUpdateOrderStatus();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter(order => 
    order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.orderItems.some(item => 
      item.artwork.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const newOrders = filteredOrders.filter(order => order.status === "new");
  const processedOrders = filteredOrders.filter(order => order.status === "processed");

  const handleStatusUpdate = async (orderId: string, newStatus: "new" | "processed") => {
    try {
      await updateOrderStatus.mutateAsync({ data: { orderId, status: newStatus } });
      toast.success(`Order ${newStatus === "processed" ? "marked as processed" : "marked as new"}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update order status");
    }
  };

  const OrderTable = ({ orders: tableOrders }: { orders: OrderWithItems[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableOrders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-mono text-sm">
              {order.id.slice(-8)}
            </TableCell>
            <TableCell>
              <div>
                <div className="font-medium">{order.customerName}</div>
                <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col gap-1">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    {item.artwork.imageData && (
                      <img 
                        src={item.artwork.imageData} 
                        alt={item.artwork.title}
                        className="w-8 h-8 object-cover rounded"
                      />
                    )}
                    <span className="text-sm">{item.artwork.title}</span>
                    {item.quantity > 1 && (
                      <Badge variant="secondary" className="text-xs">×{item.quantity}</Badge>
                    )}
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell className="font-semibold">
              ${(order.totalAmount / 100).toFixed(2)}
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {new Date(order.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <Badge variant={order.status === "new" ? "default" : "secondary"}>
                {order.status === "new" ? "New" : "Processed"}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Order Details</DialogTitle>
                      <DialogDescription>
                        Order ID: {order.id}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Customer Information</h4>
                          <div className="space-y-1 text-sm">
                            <div><strong>Name:</strong> {order.customerName}</div>
                            <div><strong>Email:</strong> {order.customerEmail}</div>
                            <div><strong>Address:</strong> {order.customerAddress}</div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Order Information</h4>
                          <div className="space-y-1 text-sm">
                            <div><strong>Total:</strong> ${(order.totalAmount / 100).toFixed(2)}</div>
                            <div><strong>Status:</strong> <Badge variant={order.status === "new" ? "default" : "secondary"}>{order.status}</Badge></div>
                            <div><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Items Ordered</h4>
                        <div className="space-y-2">
                          {order.orderItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 p-2 border rounded">
                              {item.artwork.imageData && (
                                <img 
                                  src={item.artwork.imageData} 
                                  alt={item.artwork.title}
                                  className="w-16 h-16 object-cover rounded"
                                />
                              )}
                              <div className="flex-1">
                                <div className="font-medium">{item.artwork.title}</div>
                                <div className="text-sm text-muted-foreground">
                                  Quantity: {item.quantity} × ${(item.priceAtTime / 100).toFixed(2)} = ${((item.quantity * item.priceAtTime) / 100).toFixed(2)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusUpdate(order.id, order.status === "new" ? "processed" : "new")}
                  disabled={updateOrderStatus.isPending}
                >
                  {order.status === "new" ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Mark Processed
                    </>
                  ) : (
                    <>
                      <Clock className="h-4 w-4 mr-1" />
                      Mark New
                    </>
                  )}
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Orders</h2>
          <p className="text-muted-foreground mt-1">
            Manage customer orders and track purchase history.
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by customer or artwork..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-xs text-muted-foreground">
              All time orders
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Orders</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{newOrders.length}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting processing
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${orders.reduce((sum, order) => sum + order.totalAmount, 0) > 0 
                ? (orders.reduce((sum, order) => sum + order.totalAmount, 0) / 100).toFixed(2) 
                : '0.00'}
            </div>
            <p className="text-xs text-muted-foreground">
              Total sales
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="new" className="space-y-4">
            <TabsList>
              <TabsTrigger value="new" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                New Orders ({newOrders.length})
              </TabsTrigger>
              <TabsTrigger value="processed" className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Processed Orders ({processedOrders.length})
              </TabsTrigger>
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                All Orders ({filteredOrders.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="new">
              {isLoading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading orders...</p>
                </div>
              ) : newOrders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No new orders found.</p>
                </div>
              ) : (
                <OrderTable orders={newOrders} />
              )}
            </TabsContent>
            
            <TabsContent value="processed">
              {isLoading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading orders...</p>
                </div>
              ) : processedOrders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No processed orders found.</p>
                </div>
              ) : (
                <OrderTable orders={processedOrders} />
              )}
            </TabsContent>
            
            <TabsContent value="all">
              {isLoading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading orders...</p>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    {searchTerm ? "No orders match your search." : "No orders found."}
                  </p>
                </div>
              ) : (
                <OrderTable orders={filteredOrders} />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}