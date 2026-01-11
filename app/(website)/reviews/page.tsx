import { getReviews } from "@/lib/fetch";
import ReviewCard from "@/components/shared/ReviewCard";
import CTAOrder from "@/components/shared/CTAOrder";
import { Star } from "lucide-react";

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <main className="min-h-screen bg-brand-cream pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-text mb-4">
            Customer Love
          </h1>
          <p className="text-brand-muted max-w-2xl mx-auto mb-8">
            Read what our cookie lovers have to say. Join the community of happy
            snackers!
          </p>

          <div className="flex flex-col items-center justify-center gap-2 bg-white p-6 rounded-custom-lg shadow-sm w-fit mx-auto">
            <div className="flex items-center gap-2">
              <span className="text-5xl font-bold text-brand-text">4.9</span>
              <div className="flex flex-col text-left">
                <div className="flex text-brand-secondary">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={24} fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm text-brand-muted">out of 5.0</span>
              </div>
            </div>
            <p className="text-brand-muted font-medium">
              Based on 1,200+ Reviews
            </p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {reviews.map((review, i) => (
            <div
              key={review.id}
              className="animate-in scale-95 fade-in duration-500"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <ReviewCard review={review} featured={i === 0 || i === 4} />
            </div>
          ))}
        </div>

        {/* Submit Review CTA (Mock) */}
        <div className="bg-white p-12 rounded-custom-lg shadow-soft text-center max-w-3xl mx-auto mb-20">
          <h3 className="font-serif text-3xl font-bold text-brand-text mb-4">
            Have you tasted our cookies?
          </h3>
          <p className="text-brand-muted mb-8">
            We'd love to hear your feedback! Share your moment of sweetness with
            us.
          </p>
          <button className="px-8 py-3 border-2 border-brand-primary text-brand-primary rounded-full font-bold hover:bg-brand-primary hover:text-white transition-all">
            Write a Review
          </button>
        </div>

        <CTAOrder
          title="Ready for your own box?"
          subtitle="Order now and see why everyone loves them!"
        />
      </div>
    </main>
  );
}
