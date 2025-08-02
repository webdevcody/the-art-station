import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface JourneyMilestone {
  age: string;
  title: string;
  description: string;
  highlight: string;
  icon: string;
}

function TimelineItem({ milestone, isLast = false }: { milestone: JourneyMilestone; isLast?: boolean }) {
  return (
    <div className="relative">
      <div className="flex items-start gap-6">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
            {milestone.age}
          </div>
          {!isLast && (
            <div className="w-0.5 h-16 bg-gradient-to-b from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 mt-4" />
          )}
        </div>
        
        <div className="flex-1 pb-8">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{milestone.icon}</span>
                <h3 className="text-lg font-semibold">{milestone.title}</h3>
                <Badge variant="secondary" className="ml-auto">Age {milestone.age}</Badge>
              </div>
              
              <p className="text-muted-foreground mb-3 leading-relaxed">
                {milestone.description}
              </p>
              
              <div className="bg-muted/30 rounded-lg p-3 border-l-4 border-purple-500">
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  "{milestone.highlight}"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function ArtistJourney() {
  const milestones: JourneyMilestone[] = [
    {
      age: "3",
      title: "The Great Handprint Era",
      description: "It started with handprints on everything - walls, windows, Dad's work shirt (sorry, Dad). Every surface was a canvas waiting to be discovered. We learned quickly that washable paint was our best friend.",
      highlight: "Look! I made the wall pretty!",
      icon: "👋"
    },
    {
      age: "5",
      title: "Rainbow Obsession Phase",
      description: "Every drawing had exactly 47 rainbows because 'you can never have too many rainbows, Mom.' This was also when she discovered that mixing all the colors together doesn't actually make a super-rainbow, just brown.",
      highlight: "Why did my rainbow turn into mud?",
      icon: "🌈"
    },
    {
      age: "6",
      title: "The Storytelling Breakthrough",
      description: "Art became more than just colors on paper - every piece started telling elaborate stories. Dragons had feelings, flowers had adventures, and every squiggly line had a purpose in the grand narrative.",
      highlight: "This isn't just a dog, it's a space dog visiting Earth!",
      icon: "📚"
    },
    {
      age: "7",
      title: "Discovery of Emotions in Art",
      description: "She discovered that feelings have colors, that happiness looks different on rainy days, and that sometimes the best art happens when you accidentally knock over the water cup. Every 'mistake' became a beautiful surprise.",
      highlight: "I can paint how I feel when I miss Grandma",
      icon: "💝"
    },
    {
      age: "8",
      title: "The Artist Emerges",
      description: "Now she approaches each blank canvas like it's full of endless possibilities. Her confidence has grown, her stories have deepened, and her technique continues to evolve. The kitchen table has officially become her studio.",
      highlight: "I don't know what I'm going to paint yet, but it's going to be beautiful",
      icon: "🎨"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-purple-50/30 to-pink-50/30 dark:from-purple-950/10 dark:to-pink-950/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            From Finger Paints to Masterpieces
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <em>(Well, they were always masterpieces to us)</em>
          </p>
          <Separator className="w-24 mx-auto mt-6 bg-gradient-to-r from-purple-500 to-pink-500" />
        </div>
        
        <div className="max-w-4xl mx-auto">
          {milestones.map((milestone, index) => (
            <TimelineItem 
              key={index} 
              milestone={milestone} 
              isLast={index === milestones.length - 1}
            />
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50">
            <CardContent className="p-8">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-3">What's Next?</h3>
              <p className="text-muted-foreground">
                Every day brings new discoveries, new techniques, and new stories waiting to be told. 
                The journey continues, one colorful adventure at a time.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}