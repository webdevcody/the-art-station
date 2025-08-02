import { createFileRoute } from "@tanstack/react-router";
import {
  Heart,
  Sparkles,
  Star,
  Palette,
  Gift,
  Smile,
  Rainbow,
  Wand2,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/40 via-purple-50/30 to-blue-50/40 dark:from-pink-950/15 dark:via-purple-950/15 dark:to-blue-950/15 relative overflow-hidden">
      {/* Magical floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-16 animate-float">
          <Palette className="h-20 w-20 text-purple-300/40 dark:text-purple-600/40 rotate-12" />
        </div>
        <div className="absolute top-48 right-20 animate-float-delayed">
          <Heart className="h-16 w-16 text-pink-300/50 dark:text-pink-600/50" />
        </div>
        <div className="absolute bottom-64 left-12 animate-float">
          <Star className="h-14 w-14 text-yellow-300/40 dark:text-yellow-600/40" />
        </div>
        <div className="absolute bottom-32 right-24 animate-float-delayed">
          <Sparkles className="h-18 w-18 text-blue-300/40 dark:text-blue-600/40" />
        </div>
        <div className="absolute top-96 left-1/3 animate-float">
          <Rainbow className="h-12 w-12 text-green-300/40 dark:text-green-600/40 rotate-45" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="flex items-center gap-4">
                  <Heart className="h-12 w-12 text-pink-500 animate-pulse" />
                  <div className="text-6xl">👋</div>
                  <Sparkles className="h-12 w-12 text-purple-500 animate-pulse delay-150" />
                </div>
                <Star className="absolute -top-4 left-1/2 transform -translate-x-1/2 h-10 w-10 text-yellow-400 animate-bounce" />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              About Addie's Art Station ✨
            </h1>
          </div>

          <div className="space-y-16">
            <section className="text-center">
              <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-3xl p-12 border-2 border-purple-200/50 dark:border-purple-800/30 shadow-2xl">
                <div className="relative mb-8">
                  <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
                    <span className="text-white font-bold text-5xl">A</span>
                  </div>
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-3">
                    <Sparkles className="h-8 w-8 text-white animate-pulse" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full p-3">
                    <Heart className="h-8 w-8 text-white animate-pulse delay-150" />
                  </div>
                </div>
                <p className="text-2xl text-muted-foreground leading-relaxed">
                  Hi! I'm Addie and I love making art. Welcome to my magical art
                  station! 🎨✨
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-center gap-4 mb-12">
                <Smile className="h-10 w-10 text-yellow-500 animate-bounce" />
                <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Hi, I'm Addie! 👧✨
                </h2>
                <Heart className="h-10 w-10 text-pink-500 animate-pulse" />
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl p-8 border-2 border-pink-200/50 dark:border-pink-800/30 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <Palette className="h-8 w-8 text-purple-500" />
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      My Story
                    </span>
                    <Sparkles className="h-6 w-6 text-pink-500 animate-pulse" />
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                    I'm 7 years old and I really love to draw and paint! I make
                    all kinds of art - colorful paintings, funny drawings, and
                    cool designs. Every picture I make is special and I can only
                    make it once, so each one is totally unique! 🌟
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    I love using lots of colors and drawing things that make me
                    happy. Sometimes I draw animals, sometimes flowers, and
                    sometimes I just make up fun shapes and patterns! 🌈🦋
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-100/80 to-pink-100/80 dark:from-purple-900/40 dark:to-pink-900/40 backdrop-blur-sm p-10 rounded-2xl border-2 border-purple-200/50 dark:border-purple-800/30 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <Heart className="h-8 w-8 text-pink-500 animate-pulse" />
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      Why I Love Art 💖
                    </h3>
                    <Star className="h-6 w-6 text-yellow-500 animate-pulse delay-150" />
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Art is super fun! I can make anything I want and use any
                    colors I like. When I draw, I feel really happy and excited
                    to see what I'm going to create next! It's like magic when
                    colors come together! ✨🎨
                  </p>
                  <div className="mt-6 flex justify-center">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-4">
                      <Wand2 className="h-8 w-8 text-white animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-center gap-4 mb-12">
                <Palette className="h-10 w-10 text-purple-500 animate-pulse" />
                <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  My Magical Art ✨🎨
                </h2>
                <Rainbow className="h-10 w-10 text-green-500 animate-pulse delay-150" />
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl p-8 border-2 border-yellow-200/50 dark:border-yellow-800/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="text-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto shadow-xl">
                        <Star className="h-10 w-10 text-white animate-pulse" />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full p-2">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                      One of a Kind ✨
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Every picture I make is the only one like it in the whole
                      world! I can't make the exact same one again, even if I
                      try. That makes each one super special! 🌟
                    </p>
                  </div>
                </div>

                <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl p-8 border-2 border-pink-200/50 dark:border-pink-800/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="text-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto shadow-xl">
                        <Heart className="h-10 w-10 text-white animate-pulse" />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-2">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      Made with Love 💖
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      I put lots of love and care into every piece I create.
                      Each one takes time and I always try my very best! Love
                      makes art even more beautiful! 💕
                    </p>
                  </div>
                </div>

                <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl p-8 border-2 border-green-200/50 dark:border-green-800/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="text-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center mx-auto shadow-xl">
                        <Rainbow className="h-10 w-10 text-white animate-pulse" />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full p-2">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      Lots of Colors 🌈
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      I love using bright, happy colors in my art! Sometimes I
                      use every color I have because they all look so pretty
                      together. Colors make everything magical! 🎨
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white p-12 rounded-3xl shadow-2xl border-4 border-white/20">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="flex items-center gap-4">
                    <Gift className="h-12 w-12 text-white animate-bounce" />
                    <div className="text-5xl">🎨</div>
                    <Sparkles className="h-12 w-12 text-white animate-bounce delay-150" />
                  </div>
                  <Star className="absolute -top-4 left-1/2 transform -translate-x-1/2 h-10 w-10 text-yellow-300 animate-pulse" />
                </div>
              </div>

              <h2 className="text-4xl font-bold mb-6">
                Want to See My Art? ✨
              </h2>
              <p className="mb-10 text-xl opacity-95 max-w-2xl mx-auto leading-relaxed">
                Come look at all the magical pictures I've made! Maybe you'll
                find one that makes you smile and want to take it home to make
                your room more colorful! 🌈💖
              </p>
              <a
                href="/browse"
                className="inline-flex items-center gap-4 bg-white text-purple-600 py-4 px-10 rounded-2xl hover:bg-gray-100 transition-all duration-300 font-bold text-xl shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <Palette className="h-8 w-8" />
                See My Magical Gallery
                <Wand2 className="h-6 w-6 animate-pulse" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
