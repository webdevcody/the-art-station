import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Sparkles, Heart, Star, Palette, Wand2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-transparent via-purple-50/20 to-pink-50/20 dark:via-purple-950/10 dark:to-pink-950/10 overflow-hidden">
      {/* Magical background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-float">
          <Palette className="h-16 w-16 text-purple-300/40 dark:text-purple-600/40 rotate-12" />
        </div>
        <div className="absolute top-32 right-20 animate-float-delayed">
          <Star className="h-12 w-12 text-yellow-300/50 dark:text-yellow-600/50 animate-pulse" />
        </div>
        <div className="absolute bottom-32 left-20 animate-float">
          <Heart className="h-14 w-14 text-pink-300/40 dark:text-pink-600/40 -rotate-12" />
        </div>
        <div className="absolute bottom-20 right-16 animate-float-delayed">
          <Wand2 className="h-10 w-10 text-blue-300/40 dark:text-blue-600/40 rotate-45" />
        </div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="flex items-center gap-4">
              <Sparkles className="h-12 w-12 text-purple-500 animate-pulse" />
              <div className="text-6xl">🎨</div>
              <Sparkles className="h-12 w-12 text-pink-500 animate-pulse delay-150" />
            </div>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Star className="h-8 w-8 text-yellow-400 animate-bounce" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
          <span className="block text-2xl md:text-3xl font-semibold text-muted-foreground mb-2 animate-fade-in">
            ✨ Step into the magical world of ✨
          </span>
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient-shift">
            Addie's Art Station
          </span>
          <div className="flex justify-center mt-4 space-x-4">
            <Heart className="h-8 w-8 text-pink-500 animate-pulse" />
            <Sparkles className="h-8 w-8 text-purple-500 animate-pulse delay-75" />
            <Star className="h-8 w-8 text-yellow-500 animate-pulse delay-150" />
          </div>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          🌟 Where imagination comes to life! Discover amazing artwork created by Addie, 
          a young artist with a big heart and endless creativity. Each masterpiece is filled 
          with love, dreams, and magical stories waiting to brighten your world! 🌈✨
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button size="lg" className="px-10 py-4 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105" asChild>
            <Link to="/browse">
              <Palette className="w-6 h-6 mr-3" />
              Explore the Magic Gallery
              <Sparkles className="w-5 h-5 ml-3 animate-pulse" />
            </Link>
          </Button>
          
          <Button size="lg" className="px-10 py-4 text-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border-2 border-blue-200 dark:border-blue-800 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl" variant="outline" asChild>
            <Link to="/about">
              <Heart className="w-6 h-6 mr-3 text-pink-500" />
              Meet the Artist
              <Star className="w-5 h-5 ml-3 text-yellow-500 animate-pulse" />
            </Link>
          </Button>
        </div>
        
        <div className="mt-16 flex justify-center">
          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-200/50 dark:border-purple-800/30 shadow-xl max-w-md">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Wand2 className="h-6 w-6 text-purple-500" />
              <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Did You Know?
              </span>
              <Sparkles className="h-6 w-6 text-pink-500" />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Every artwork comes with a special story and certificate of authenticity! 
              You're not just buying art - you're supporting a young artist's dreams! 🌟
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
