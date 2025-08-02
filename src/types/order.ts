export interface OrderWithItems {
  id: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  totalAmount: number;
  stripePaymentIntentId: string | null;
  status: "new" | "processed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
  orderItems: Array<{
    id: string;
    quantity: number;
    priceAtTime: number;
    artwork: {
      id: string;
      title: string;
      imageData: string | null;
      user: {
        name: string;
      } | null;
    };
  }>;
}