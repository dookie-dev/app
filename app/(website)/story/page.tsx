import Link from "next/link";
import LazyImage from "@/components/ui/LazyImage";
import CTAOrder from "@/components/shared/CTAOrder";
import { Heart, ChefHat, Sparkles } from "lucide-react";
import { ABOUT_IMAGES } from "@/lib/image-data";

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-20 text-center">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-brand-text mb-6">
          Our Sweet Journey
        </h1>
        <p className="text-xl text-brand-muted max-w-3xl mx-auto leading-relaxed">
          From a small home kitchen to your favorite Dookiee.s. <br />
          This is the story of how we bake a little bit of magic into every
          bite.
        </p>
      </div>

      {/* Content 1 */}
      <div className="container mx-auto px-4 mb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-brand-secondary/20 rounded-custom-lg transform translate-x-4 translate-y-4 -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform" />
            <LazyImage
              src={ABOUT_IMAGES[0]}
              alt="Baking in the kitchen"
              width={600}
              height={400}
              className="rounded-custom-lg shadow-soft w-full"
            />
          </div>
          <div className="space-y-6">
            <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center text-brand-primary mb-4">
              <Heart size={32} />
            </div>
            <h2 className="font-serif text-3xl font-bold text-brand-text">
              Started with Love
            </h2>
            <p className="text-brand-muted text-lg leading-relaxed">
              It all began in 2020, during a quiet weekend at home. We wanted to
              bake the perfect soft cookie—crispy on the edges, chewy in the
              middle, and not too sweet. After hundreds of batches (and many
              happy taste testers!), we finally found <strong>The One</strong>.
            </p>
            <p className="text-brand-muted text-lg leading-relaxed">
              What started as a hobby quickly turned into a passion project, and
              then a full-time dream. We believe that a good cookie can turn a
              bad day around, and we want to share that joy with you.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-brand-cream py-20 mb-20 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="bg-white p-8 rounded-custom-lg shadow-sm">
              <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mx-auto mb-6">
                <ChefHat size={32} />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-text mb-3">
                Premium Ingredients
              </h3>
              <p className="text-brand-muted">
                We use only pure New Zealand butter, Belgian chocolate, and real
                vanilla bean. No shortcuts, just quality.
              </p>
            </div>
            <div className="bg-white p-8 rounded-custom-lg shadow-sm">
              <div className="w-16 h-16 bg-brand-secondary/30 rounded-full flex items-center justify-center text-brand-text mx-auto mb-6">
                <Heart size={32} />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-text mb-3">
                Baked Fresh Daily
              </h3>
              <p className="text-brand-muted">
                Our cookies are baked every morning. We ensure you get the
                freshest, softest experience possible.
              </p>
            </div>
            <div className="bg-white p-8 rounded-custom-lg shadow-sm">
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center text-brand-accent mx-auto mb-6">
                <Sparkles size={32} />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-text mb-3">
                Community First
              </h3>
              <p className="text-brand-muted">
                We love our community! We actively support local ingredient
                suppliers and sustainable packaging.
              </p>
            </div>
          </div>
        </div>
      </div>

      <CTAOrder
        title="Join Our Story"
        subtitle="Be a part of our sweet journey. Taste the difference today."
        buttonText="Order Cookies"
      />
    </main>
  );
}
