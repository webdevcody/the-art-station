import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function AboutArtist() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Meet the Artist
              </h2>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-sm">Age 8</Badge>
                <Badge variant="secondary" className="text-sm">Full-Time Dreamer</Badge>
                <Badge variant="secondary" className="text-sm">Part-Time Artist</Badge>
              </div>
            </div>
            
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardContent className="p-6 space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  When she isn't busy being the world's most enthusiastic collector of interesting rocks 
                  or teaching her stuffed animals about dinosaurs, you'll find her at the kitchen table 
                  with paint-covered fingers and a head full of stories waiting to become art.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Every piece you see here started with a <em>"Mom, can I paint the feeling of when it rains on sunny days?"</em> 
                  or <em>"What if unicorns had rainbow shadows?"</em> Her imagination doesn't have an off switch, 
                  and honestly, we wouldn't want it any other way.
                </p>
                
                <div className="pt-4 border-t border-muted/30">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-foreground">Favorite Colors:</strong>
                      <span className="text-muted-foreground ml-1">All of them</span>
                    </div>
                    <div>
                      <strong className="text-foreground">Art Supplies Destroyed:</strong>
                      <span className="text-muted-foreground ml-1">Countless</span>
                    </div>
                    <div>
                      <strong className="text-foreground">Inspiration Sources:</strong>
                      <span className="text-muted-foreground ml-1">Dreams & rainy days</span>
                    </div>
                    <div>
                      <strong className="text-foreground">Studio Location:</strong>
                      <span className="text-muted-foreground ml-1">Kitchen table</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-3xl">🎨</span>
                </div>
                <p className="text-sm">Artist photo coming soon!</p>
                <p className="text-xs mt-1">Currently creating her next masterpiece</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}