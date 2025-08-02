import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About Addie's Art Station</h1>
        
        <div className="space-y-12">
          <section className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-gradient-primary to-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-3xl">A</span>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Hi! I'm Addie and I love making art. Welcome to my art station!
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Hi, I'm Addie!</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I'm 7 years old and I really love to draw and paint! I make all kinds of art - 
                  colorful paintings, funny drawings, and cool designs. Every picture I make is special 
                  and I can only make it once, so each one is totally unique!
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I love using lots of colors and drawing things that make me happy. Sometimes I draw 
                  animals, sometimes flowers, and sometimes I just make up fun shapes and patterns!
                </p>
              </div>
              <div className="bg-muted/50 p-8 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Why I Love Art</h3>
                <p className="text-muted-foreground">
                  Art is super fun! I can make anything I want and use any colors I like. 
                  When I draw, I feel really happy and excited to see what I'm going to create next!
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">My Art</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-gradient-primary to-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">✨</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">One of a Kind</h3>
                <p className="text-muted-foreground">
                  Every picture I make is the only one like it in the whole world! 
                  I can't make the exact same one again, even if I try.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-gradient-primary to-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">🎨</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">Made with Love</h3>
                <p className="text-muted-foreground">
                  I put lots of love and care into every piece I create. Each one takes time 
                  and I always try my very best!
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-gradient-primary to-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">🌈</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">Lots of Colors</h3>
                <p className="text-muted-foreground">
                  I love using bright, happy colors in my art! Sometimes I use every color 
                  I have because they all look so pretty together.
                </p>
              </div>
            </div>
          </section>

          <div className="text-center bg-gradient-to-r from-gradient-primary to-gradient-secondary text-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Want to See My Art?</h2>
            <p className="mb-6 opacity-90">
              Come look at all the pictures I've made! Maybe you'll find one you really like!
            </p>
            <a
              href="/browse"
              className="inline-block bg-white text-gray-900 py-3 px-6 rounded-md hover:bg-gray-100 transition-colors font-medium"
            >
              See My Art Gallery
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}