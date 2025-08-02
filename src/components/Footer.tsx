import { authClient } from "@/lib/auth-client";
import { Link } from "@tanstack/react-router";
import { Heart, Sparkles, Star, Palette, Mail, HelpCircle, Shield, FileText, LogIn } from "lucide-react";

export function Footer() {
  const { data: sessionData } = authClient.useSession();

  const handleSignIn = () => {
    authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <footer className="border-t-2 border-purple-200/30 dark:border-purple-800/30 bg-gradient-to-br from-pink-50/60 via-purple-50/40 to-blue-50/60 dark:from-pink-950/20 dark:via-purple-950/20 dark:to-blue-950/20 backdrop-blur-sm relative overflow-hidden">
      {/* Magical floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-8 left-16 animate-float">
          <Heart className="h-8 w-8 text-pink-300/30 dark:text-pink-600/30" />
        </div>
        <div className="absolute top-12 right-20 animate-float-delayed">
          <Star className="h-6 w-6 text-yellow-300/40 dark:text-yellow-600/40" />
        </div>
        <div className="absolute bottom-8 left-24 animate-float">
          <Sparkles className="h-7 w-7 text-purple-300/30 dark:text-purple-600/30" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-pulse" />
              </div>
              <div>
                <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Addie's Art Station
                </span>
                <div className="text-xs text-muted-foreground mt-1">
                  Where magic meets art ✨
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Supporting young artists and bringing unique, magical artwork to collectors
              worldwide. Every piece tells a story! 🌟
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Palette className="h-5 w-5 text-purple-500" />
              <h3 className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Magical Gallery ✨
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/browse" className="flex items-center gap-2 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:translate-x-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Explore Art Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center gap-2 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 hover:translate-x-1">
                  <Heart className="h-4 w-4 text-pink-500" />
                  Meet Addie
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-5 w-5 text-pink-500" />
              <h3 className="font-bold text-lg bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Get Help 💖
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/contact" className="flex items-center gap-2 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:translate-x-1">
                  <Mail className="h-4 w-4 text-purple-500" />
                  Say Hello
                </Link>
              </li>
              <li>
                <Link to="/faq" className="flex items-center gap-2 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 hover:translate-x-1">
                  <HelpCircle className="h-4 w-4 text-pink-500" />
                  Questions
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  Shipping Magic
                </Link>
              </li>
              {!sessionData && (
                <li>
                  <button
                    onClick={handleSignIn}
                    className="flex items-center gap-2 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 hover:translate-x-1 text-left"
                  >
                    <LogIn className="h-4 w-4 text-green-500" />
                    Sign In
                  </button>
                </li>
              )}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-blue-500" />
              <h3 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Safe & Secure 🛡️
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link to="/privacy" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
                  <Shield className="h-4 w-4 text-blue-500" />
                  Privacy Promise
                </Link>
              </li>
              <li>
                <Link to="/terms" className="flex items-center gap-2 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 hover:translate-x-1">
                  <FileText className="h-4 w-4 text-purple-500" />
                  Our Rules
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-purple-200/30 dark:border-purple-800/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-pink-500 animate-pulse" />
                <p className="text-sm text-muted-foreground">
                  © 2025 Addie's Art Station. Made with love and magic! ✨
                </p>
                <Sparkles className="h-5 w-5 text-purple-500 animate-pulse delay-150" />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-purple-100/50 to-pink-100/50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl px-4 py-2 border border-purple-200/50 dark:border-purple-800/30">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 animate-pulse" />
                  <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Spreading joy through art! 🌟
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
