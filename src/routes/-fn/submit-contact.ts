import { contact } from "~/db/schema";
import { z } from "zod";
import { generateId } from "lucia";
import { createServerFn } from "@tanstack/react-start";
import { database } from "~/db";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200, "Subject is too long"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(2000, "Message is too long"),
});

export const submitContact = createServerFn({
  method: "POST",
})
  .validator(contactFormSchema)
  .handler(async ({ data }) => {
    const result = contactFormSchema.safeParse(data);

    if (!result.success) {
      throw new Error(
        "Invalid form data: " +
          result.error.errors.map((e) => e.message).join(", ")
      );
    }

    const { name, email, subject, message } = result.data;

    try {
      await database.insert(contact).values({
        id: generateId(15),
        name,
        email,
        subject,
        message,
        createdAt: new Date(),
      });

      return {
        success: true,
        message: "Thank you for your message! We'll get back to you soon.",
      };
    } catch (error) {
      console.error("Error submitting contact form:", error);
      throw new Error("Failed to submit contact form. Please try again.");
    }
  });
