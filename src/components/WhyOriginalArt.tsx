import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Palette, Star, Gift, Home } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
}

function BenefitCard({ icon, title, description, highlight }: BenefitProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>
        <Badge variant="outline" className="text-xs">
          {highlight}
        </Badge>
      </CardContent>
    </Card>
  );
}

export function WhyOriginalArt() {
  const benefits: BenefitProps[] = [
    {
      icon: <Sparkles className="h-8 w-8 text-purple-600" />,
      title: "Completely One-of-a-Kind",
      description:
        "Each piece is absolutely unique - she couldn't recreate it even if she tried. When inspiration strikes, magic happens, and that magic can never be duplicated.",
      highlight: "Truly irreplaceable",
    },
    {
      icon: <Heart className="h-8 w-8 text-pink-600" />,
      title: "Pure, Unfiltered Creativity",
      description:
        "Child artists don't worry about 'rules' or 'technique'. They paint what they feel, creating art that's authentic, joyful, and refreshingly honest.",
      highlight: "No creative boundaries",
    },
    {
      icon: <Palette className="h-8 w-8 text-blue-600" />,
      title: "Stories Come to Life",
      description:
        "Every piece tells a story. When she paints a sunset, it's not just orange and pink - it's 'the color of happiness when the day says goodnight.'",
      highlight: "Imagination made visible",
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-600" />,
      title: "Conversation Starters",
      description:
        "These pieces bring instant joy and curiosity to any space. Guests can't help but smile and ask about the story behind each colorful creation.",
      highlight: "Guaranteed smiles",
    },
    {
      icon: <Gift className="h-8 w-8 text-green-600" />,
      title: "Perfect Unique Gifts",
      description:
        "Nothing says 'I thought of you' like original art created by young hands. These pieces make meaningful presents that recipients treasure forever.",
      highlight: "Unforgettable presents",
    },
    {
      icon: <Home className="h-8 w-8 text-orange-600" />,
      title: "Brightens Any Space",
      description:
        "Original child art has a special power to make any room feel warmer, more welcoming, and full of possibility. It's happiness you can hang on your wall.",
      highlight: "Instant joy boost",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Why Choose Art Made by Small Hands?
          </h2>
          <div className="max-w-4xl mx-auto space-y-4 text-lg text-muted-foreground">
            <p>
              Because when she paints a sunset, it's not just orange and pink -
              it's{" "}
              <em>"the color of happiness when the day says goodnight."</em>
              When she draws a house, the chimney smoke swirls with stories
              about the family of mice who live in the walls.
            </p>
            <p>
              Child artists don't paint what they see - they paint what they
              feel. They don't worry about "rules" or "technique." They worry
              about whether their purple elephant looks friendly enough and if
              their rainbow has enough stripes to make people smile.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>

        <div className="text-center">
          <Card className="max-w-3xl mx-auto border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50">
            <CardContent className="p-8">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold mb-4">
                A Reminder That Imagination Has No Limits
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Every piece is a window into a world where anything is possible,
                where colors have feelings, and where the most beautiful art
                comes from the heart. When you bring one of these pieces home,
                you're not just buying art - you're bringing home a little bit
                of wonder.
              </p>
              <Link to="/browse">
                <Button size="lg" className="px-8">
                  Shop Our Collection
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
