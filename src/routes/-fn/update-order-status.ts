import { createServerFn } from "@tanstack/react-start";
import { database } from "@/db";
import { order } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "~/utils/auth";
import { getWebRequest } from "@tanstack/react-start/server";
import { z } from "zod";

const updateOrderStatusSchema = z.object({
  orderId: z.string(),
  status: z.enum(["new", "processed", "cancelled"]),
});

export const updateOrderStatus = createServerFn({ method: "POST" })
  .validator(updateOrderStatusSchema)
  .handler(async ({ data }) => {
    const request = getWebRequest();
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.isAdmin) {
      throw new Error("Unauthorized: Admin access required");
    }

    const updatedOrder = await database
      .update(order)
      .set({
        status: data.status,
        updatedAt: new Date(),
      })
      .where(eq(order.id, data.orderId))
      .returning();

    if (updatedOrder.length === 0) {
      throw new Error("Order not found");
    }

    return updatedOrder[0];
  });