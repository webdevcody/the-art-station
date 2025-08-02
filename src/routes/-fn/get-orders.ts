import { createServerFn } from "@tanstack/react-start";
import { database } from "@/db";
import { order, orderItem, artwork, user } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { auth } from "~/utils/auth";
import { getWebRequest } from "@tanstack/react-start/server";
import { OrderWithItems } from "~/types/order";

export const getOrders = createServerFn({ method: "GET" })
  .handler(async () => {
    const request = getWebRequest();
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.isAdmin) {
      throw new Error("Unauthorized: Admin access required");
    }

    // Get orders with their items and artwork details
    const orders = await database
      .select({
        orderId: order.id,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerAddress: order.customerAddress,
        totalAmount: order.totalAmount,
        stripePaymentIntentId: order.stripePaymentIntentId,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        orderItemId: orderItem.id,
        quantity: orderItem.quantity,
        priceAtTime: orderItem.priceAtTime,
        artworkId: artwork.id,
        artworkTitle: artwork.title,
        artworkImageData: artwork.imageData,
        artistName: user.name,
      })
      .from(order)
      .leftJoin(orderItem, eq(order.id, orderItem.orderId))
      .leftJoin(artwork, eq(orderItem.artworkId, artwork.id))
      .leftJoin(user, eq(artwork.userId, user.id))
      .orderBy(desc(order.createdAt));

    // Group order items by order
    const groupedOrders = orders.reduce((acc, row) => {
      const orderId = row.orderId;
      
      if (!acc[orderId]) {
        acc[orderId] = {
          id: row.orderId,
          customerName: row.customerName,
          customerEmail: row.customerEmail,
          customerAddress: row.customerAddress,
          totalAmount: row.totalAmount,
          stripePaymentIntentId: row.stripePaymentIntentId,
          status: row.status as "new" | "processed" | "cancelled",
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
          orderItems: [],
        };
      }

      if (row.orderItemId) {
        acc[orderId].orderItems.push({
          id: row.orderItemId,
          quantity: row.quantity || 1,
          priceAtTime: row.priceAtTime || 0,
          artwork: {
            id: row.artworkId || '',
            title: row.artworkTitle || '',
            imageData: row.artworkImageData,
            user: row.artistName ? { name: row.artistName } : null,
          },
        });
      }

      return acc;
    }, {} as Record<string, any>);

    return Object.values(groupedOrders) as OrderWithItems[];
  });