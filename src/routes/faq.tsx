import { createFileRoute } from "@tanstack/react-router";
import { HelpCircle, Sparkles, Star, Heart, MessageCircle, Gift } from "lucide-react";

export const Route = createFileRoute("/faq")({
  component: FAQPage,
});

function FAQPage() {
  const faqs = [
    {
      question: "How do I buy a picture? 🎨",
      answer: "First you look at all the super cool art! When you find one you REALLY like, you click on it and put it in your cart. Then your mom or dad helps you pay for it with their credit card. After that, we wrap it up nice and send it to your house! 📦✨"
    },
    {
      question: "What can my parents use to pay? 💳",
      answer: "Your mom and dad can use their credit card, debit card, or even their phone to pay! We use something called Stripe which keeps all their money info super safe and secure! 🔒"
    },
    {
      question: "How long until my art gets to my house? 🚚",
      answer: "If you live in America, it takes about 5-7 days for your art to get to you - that's like one whole week! If you live far away in another country, it takes 10-14 days which is like 2 weeks. Your parents can pay extra to make it come faster if they want! 🏃‍♂️💨"
    },
    {
      question: "Are these real paintings that kids made? 🖼️",
      answer: "YES! Every single picture is made by real kids just like you! Each one is totally unique and special - there's only ONE of each picture in the whole world! We even give you a special paper that says it's real! 🌟"
    },
    {
      question: "What if I don't like my picture when it comes? 😔",
      answer: "Don't worry! If you get your picture and it's not what you thought it would be, your parents can send it back within 30 days and get ALL their money back. But it has to still look perfect like when we sent it! 💝"
    },
    {
      question: "How do you make sure my picture doesn't get broken? 📮",
      answer: "We wrap your picture up like a present! We put lots of soft stuff around it and put it in a super strong box so it stays safe on its journey to your house. We're really careful! 🎁"
    },
    {
      question: "Can you send pictures to other countries? 🌍",
      answer: "YES! We can send pictures anywhere in the whole world! But it costs more money and takes longer to get there. Sometimes your parents might have to pay extra taxes to their country too. 🌎✈️"
    },
    {
      question: "Can I ask an artist to make me a special picture? 🎭",
      answer: "Maybe! Sometimes our artists can make a special picture just for you! Your parents would need to ask us first and tell us what you want. We'll see if one of our artists wants to make it! 🎪"
    },
    {
      question: "How do I know if I can still buy a picture? 🤔",
      answer: "Our website is magic! It always knows right away if someone else already bought a picture. If you can put it in your cart, you can still buy it! But if someone else really likes it too, they might buy it first, so don't wait too long! 🏃‍♀️"
    },
    {
      question: "What if my picture gets hurt in the mail? 😱",
      answer: "That almost never happens because we pack it so well! But if your picture does get hurt, tell your parents to take photos and contact us RIGHT AWAY. We'll fix the problem super fast - we might send you a new one or give your parents their money back! 🩹💪"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/40 via-purple-50/30 to-blue-50/40 dark:from-pink-950/15 dark:via-purple-950/15 dark:to-blue-950/15 relative overflow-hidden">
      {/* Magical floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-12 animate-float">
          <HelpCircle className="h-16 w-16 text-purple-300/40 dark:text-purple-600/40 rotate-12" />
        </div>
        <div className="absolute top-64 right-16 animate-float-delayed">
          <Star className="h-12 w-12 text-yellow-300/50 dark:text-yellow-600/50" />
        </div>
        <div className="absolute bottom-48 left-20 animate-float">
          <Heart className="h-14 w-14 text-pink-300/40 dark:text-pink-600/40 -rotate-12" />
        </div>
        <div className="absolute bottom-32 right-12 animate-float-delayed">
          <Sparkles className="h-10 w-10 text-blue-300/40 dark:text-blue-600/40" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="flex items-center gap-4">
                  <HelpCircle className="h-12 w-12 text-purple-500 animate-pulse" />
                  <div className="text-5xl">🤔</div>
                  <Sparkles className="h-12 w-12 text-pink-500 animate-pulse delay-150" />
                </div>
                <Star className="absolute -top-3 left-1/2 transform -translate-x-1/2 h-8 w-8 text-yellow-400 animate-bounce" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Questions Kids Ask A Lot! 🤔💭
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              ✨ Here are all the things curious minds want to know about our magical art world! 🌟
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl p-8 border-2 border-purple-200/50 dark:border-purple-800/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3 flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                    {faq.question}
                  </h2>
                  <Sparkles className="h-6 w-6 text-pink-400 animate-pulse flex-shrink-0 mt-1" />
                </div>
                <div className="ml-16">
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl p-12 border-2 border-pink-200/50 dark:border-pink-800/30 shadow-xl">
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="flex items-center gap-4">
                    <Star className="h-10 w-10 text-yellow-500 animate-pulse" />
                    <div className="text-4xl">🙋‍♀️🙋‍♂️</div>
                    <Heart className="h-10 w-10 text-pink-500 animate-pulse delay-150" />
                  </div>
                  <Sparkles className="absolute -top-2 left-1/2 transform -translate-x-1/2 h-6 w-6 text-purple-400 animate-bounce" />
                </div>
              </div>
              
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Still have more questions? 🙋‍♀️🙋‍♂️
              </h2>
              <p className="text-muted-foreground mb-8 text-xl max-w-2xl mx-auto leading-relaxed">
                Can't find what you want to know? Don't worry - we're here to help you and your parents! 
                Ask us anything about art, shipping, or just say hello! 😊✨
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 px-8 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Gift className="h-6 w-6" />
                Ask Us Anything! 📝✨
                <Sparkles className="h-5 w-5 animate-pulse" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}