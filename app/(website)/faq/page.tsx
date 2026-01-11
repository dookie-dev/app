import Link from "next/link";
import CTAOrder from "@/components/shared/CTAOrder";
import { Plus, Minus } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      q: "How long do the cookies stay fresh?",
      a: "Our cookies are baked fresh daily with no preservatives. They stay fresh for 5-7 days at room temperature in an airtight container, or up to 2 weeks in the refrigerator. For long-term storage, you can freeze them for up to 1 month!",
    },
    {
      q: "Do you ship nationwide?",
      a: "Yes! We ship all over Thailand using express delivery services. Your cookies are carefully packed to ensure they arrive in perfect condition, usually within 1-2 days.",
    },
    {
      q: "Can I warm up the cookies?",
      a: "Absolutely! We highly recommend it. Warm them in the microwave for 10-15 seconds or in an oven at 150°C for 2-3 minutes for that fresh-out-of-the-oven gooey experience.",
    },
    {
      q: "Are your cookies gluten-free or vegan?",
      a: "Currently, our standard recipe contains gluten, dairy, and eggs. However, we are working on special dietary options! Stay tuned for updates on our social media.",
    },
    {
      q: "Do you accept big orders for events?",
      a: "Yes, we love being part of your celebrations! For wedding favors, corporate gifts, or party sets, please contact us at least 1 week in advance for special pricing and customization.",
    },
  ];

  return (
    <main className="min-h-screen bg-brand-cream pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-text mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-brand-muted max-w-2xl mx-auto">
            Everything you need to know about our soft cookies, delivery, and
            care instructions.
          </p>
        </div>

        <div className="space-y-6 mb-20">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-custom-lg shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow cursor-default group"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-secondary/20 text-brand-text flex items-center justify-center font-bold text-sm shrink-0 mt-1">
                  Q
                </div>
                <div>
                  <h3 className="font-bold text-lg text-brand-text mb-3 group-hover:text-brand-primary transition-colors">
                    {item.q}
                  </h3>
                  <p className="text-brand-muted leading-relaxed">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-brand-primary/5 rounded-custom-lg p-10 text-center">
          <h3 className="font-serif text-2xl font-bold text-brand-text mb-4">
            Still have questions?
          </h3>
          <p className="text-brand-muted mb-6">
            Can't find the answer you're looking for? Please chat to our
            friendly team.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-white border border-gray-200 text-brand-text rounded-full font-bold hover:border-brand-primary hover:text-brand-primary transition-all"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}
