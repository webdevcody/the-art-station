import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { Alert, AlertDescription } from "~/components/ui/alert";
import {
  useSubmitContact,
  type ContactFormData,
} from "./-hooks/use-submit-contact";
import { CheckCircle, AlertCircle, Loader2, Heart, Sparkles, Star, Mail, Send, Palette } from "lucide-react";

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

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const submitContactMutation = useSubmitContact();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitStatus("idle");
      const result = await submitContactMutation.mutateAsync(data);
      setSubmitStatus("success");
      setSubmitMessage(result.message);
      reset();
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/40 via-purple-50/30 to-blue-50/40 dark:from-pink-950/15 dark:via-purple-950/15 dark:to-blue-950/15 relative overflow-hidden">
      {/* Magical floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-float">
          <Mail className="h-12 w-12 text-purple-300/40 dark:text-purple-600/40 rotate-12" />
        </div>
        <div className="absolute top-40 right-20 animate-float-delayed">
          <Heart className="h-10 w-10 text-pink-300/50 dark:text-pink-600/50" />
        </div>
        <div className="absolute bottom-32 left-16 animate-float">
          <Star className="h-8 w-8 text-yellow-300/40 dark:text-yellow-600/40" />
        </div>
        <div className="absolute bottom-20 right-24 animate-float-delayed">
          <Sparkles className="h-14 w-14 text-blue-300/40 dark:text-blue-600/40" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="flex items-center gap-4">
                  <Mail className="h-12 w-12 text-purple-500 animate-pulse" />
                  <div className="text-5xl">💌</div>
                  <Sparkles className="h-12 w-12 text-pink-500 animate-pulse delay-150" />
                </div>
                <Star className="absolute -top-3 left-1/2 transform -translate-x-1/2 h-8 w-8 text-yellow-400 animate-bounce" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Say Hello! 👋
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              ✨ We'd love to hear from you! Send us a message and let's chat about art, dreams, or anything magical! 🌟
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl p-8 border-2 border-purple-200/50 dark:border-purple-800/30 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="h-8 w-8 text-pink-500" />
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Let's Connect!
                  </h2>
                  <Sparkles className="h-6 w-6 text-purple-500 animate-pulse" />
                </div>
                <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                  🎨 Whether you have questions about Addie's amazing artwork, need help with your order, 
                  or just want to share some kindness, we're here for you! Every message brings a smile to our faces! 😊
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-100/50 to-pink-100/50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl border border-purple-200/50 dark:border-purple-800/30">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Email Us
                      </h3>
                      <p className="text-muted-foreground">hello@artstation.com</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-100/50 to-purple-100/50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6 border border-blue-200/50 dark:border-blue-800/30">
                    <div className="flex items-center gap-3 mb-3">
                      <Palette className="h-6 w-6 text-blue-500" />
                      <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Fun Fact!
                      </span>
                      <Star className="h-5 w-5 text-yellow-500 animate-pulse" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Addie personally reads every message! She loves hearing from art lovers around the world. 
                      Your words might even inspire her next masterpiece! 🌈✨
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl p-8 border-2 border-pink-200/50 dark:border-pink-800/30 shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <Send className="h-8 w-8 text-pink-500" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Send Your Message ✨
                </h2>
                <Heart className="h-6 w-6 text-pink-500 animate-pulse" />
              </div>

              {submitStatus === "success" && (
                <Alert className="mb-6 border-green-300 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-800 dark:text-green-300 rounded-xl">
                  <CheckCircle className="h-5 w-5 animate-pulse" />
                  <AlertDescription className="font-semibold">
                    🎉 {submitMessage} We can't wait to read your message!
                  </AlertDescription>
                </Alert>
              )}

              {submitStatus === "error" && (
                <Alert className="mb-6 border-red-300 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 text-red-800 dark:text-red-300 rounded-xl">
                  <AlertCircle className="h-5 w-5" />
                  <AlertDescription className="font-semibold">
                    💔 Oops! {submitMessage}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2 text-lg font-semibold mb-3">
                    <Star className="h-5 w-5 text-yellow-500" />
                    What should we call you? ✨
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your magical name..."
                    {...register("name")}
                    className={`h-12 text-lg border-2 rounded-xl transition-all duration-300 ${
                      errors.name 
                        ? "border-red-400 bg-red-50/50 dark:bg-red-950/20" 
                        : "border-purple-200/50 dark:border-purple-800/30 bg-white/50 dark:bg-gray-800/50 focus:border-purple-400 focus:bg-white dark:focus:bg-gray-800"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 text-lg font-semibold mb-3">
                    <Mail className="h-5 w-5 text-purple-500" />
                    How can we reach you? 💌
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.magical@email.com"
                    {...register("email")}
                    className={`h-12 text-lg border-2 rounded-xl transition-all duration-300 ${
                      errors.email 
                        ? "border-red-400 bg-red-50/50 dark:bg-red-950/20" 
                        : "border-purple-200/50 dark:border-purple-800/30 bg-white/50 dark:bg-gray-800/50 focus:border-purple-400 focus:bg-white dark:focus:bg-gray-800"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="subject" className="flex items-center gap-2 text-lg font-semibold mb-3">
                    <Sparkles className="h-5 w-5 text-pink-500" />
                    What's your message about? 🌟
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Art questions, compliments, or just saying hi!"
                    {...register("subject")}
                    className={`h-12 text-lg border-2 rounded-xl transition-all duration-300 ${
                      errors.subject 
                        ? "border-red-400 bg-red-50/50 dark:bg-red-950/20" 
                        : "border-purple-200/50 dark:border-purple-800/30 bg-white/50 dark:bg-gray-800/50 focus:border-purple-400 focus:bg-white dark:focus:bg-gray-800"
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message" className="flex items-center gap-2 text-lg font-semibold mb-3">
                    <Heart className="h-5 w-5 text-pink-500" />
                    Share your thoughts! 💭
                  </Label>
                  <Textarea
                    id="message"
                    rows={6}
                    placeholder="Tell us about your favorite artwork, ask questions, or just share some kindness! We love hearing from you... ✨"
                    {...register("message")}
                    className={`text-lg border-2 rounded-xl transition-all duration-300 resize-none ${
                      errors.message 
                        ? "border-red-400 bg-red-50/50 dark:bg-red-950/20" 
                        : "border-purple-200/50 dark:border-purple-800/30 bg-white/50 dark:bg-gray-800/50 focus:border-purple-400 focus:bg-white dark:focus:bg-gray-800"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-xl"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                      Sending your magical message... ✨
                    </>
                  ) : (
                    <>
                      <Send className="mr-3 h-6 w-6" />
                      Send Message with Love 💌
                      <Sparkles className="ml-3 h-5 w-5 animate-pulse" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
