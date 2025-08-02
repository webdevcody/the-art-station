import { createFileRoute } from "@tanstack/react-router";

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
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Questions Kids Ask A Lot! 🤔💭</h1>
        
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border pb-6">
              <h2 className="text-xl font-semibold mb-4">{faq.question}</h2>
              <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Still have more questions? 🙋‍♀️🙋‍♂️</h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you want to know? Don't worry - we're here to help you and your parents! 😊
          </p>
          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-gradient-primary to-gradient-secondary text-white py-2 px-6 rounded-md hover:opacity-90 transition-opacity"
          >
            Ask Us Anything! 📝✨
          </a>
        </div>
      </div>
    </div>
  );
}