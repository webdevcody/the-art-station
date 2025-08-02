import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { CartButton } from "@/components/CartButton";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, Sparkles, Heart, Palette, Info, HelpCircle, Mail, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Header() {
  const { data: sessionData } = authClient.useSession();

  const handleSignOut = () => {
    authClient.signOut();
  };

  return (
    <header className="border-b border-purple-200/30 dark:border-purple-800/30 bg-gradient-to-r from-pink-50/60 via-purple-50/40 to-blue-50/60 dark:from-pink-950/20 dark:via-purple-950/20 dark:to-blue-950/20 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-3 hover:scale-105 transition-all duration-300 group"
        >
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Addie's Art Station
            </span>
            <span className="text-xs text-muted-foreground -mt-1">Where magic meets art ✨</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-2">
          <Link
            to="/browse"
            className="group flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-200/50 dark:border-purple-800/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Palette className="h-4 w-4 text-purple-500 group-hover:animate-pulse" />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:to-pink-700">
              Gallery
            </span>
            <Sparkles className="h-3 w-3 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link
            to="/about"
            className="group flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-blue-200/50 dark:border-blue-800/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Info className="h-4 w-4 text-blue-500 group-hover:animate-pulse" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-purple-700">
              About Addie
            </span>
            <Heart className="h-3 w-3 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link
            to="/faq"
            className="group flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 hover:from-green-500/20 hover:to-blue-500/20 border border-green-200/50 dark:border-green-800/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <HelpCircle className="h-4 w-4 text-green-500 group-hover:animate-pulse" />
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent group-hover:from-green-700 group-hover:to-blue-700">
              Questions
            </span>
            <Star className="h-3 w-3 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link
            to="/contact"
            className="group flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 hover:from-pink-500/20 hover:to-purple-500/20 border border-pink-200/50 dark:border-pink-800/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Mail className="h-4 w-4 text-pink-500 group-hover:animate-pulse" />
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent group-hover:from-pink-700 group-hover:to-purple-700">
              Say Hi
            </span>
            <Sparkles className="h-3 w-3 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <CartButton />
          {sessionData && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={sessionData.user.image || undefined}
                      alt={sessionData.user.name || "User avatar"}
                    />
                    <AvatarFallback>
                      {sessionData.user.name
                        ? sessionData.user.name.charAt(0).toUpperCase()
                        : sessionData.user.email?.charAt(0).toUpperCase() ||
                          "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                {(sessionData.user as any).isAdmin && (
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/admin">
                      <Settings className="mr-2 h-4 w-4" />
                      Admin Panel
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
