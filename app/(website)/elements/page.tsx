import { ChevronRight } from "lucide-react";

export default function Elements() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-bellaria-light-pink py-20 md:py-28 scalloped-bottom overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-6 flex items-center justify-center gap-2 text-bellaria-dark">
            <a href="/" className="hover:text-bellaria-teal">Home</a>
            <ChevronRight size={18} />
            <span className="font-semibold">Content Elements</span>
          </div>
          <h1 className="bellaria-h1 text-bellaria-dark mb-6">Content Elements</h1>
          <p className="bellaria-subtitle text-bellaria-dark max-w-2xl mx-auto">
            Explore all the design elements used throughout Bellaria
          </p>
        </div>
      </section>

      {/* Info Boxes */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="bellaria-h2 text-bellaria-dark mb-12 text-center">Info Boxes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '📦', title: 'Free Shipping', description: 'On all orders over $50' },
              { icon: '🎁', title: 'Gift Wrapping', description: 'Beautiful packaging available' },
              { icon: '⏱️', title: 'Fresh Delivery', description: 'Same day delivery option' },
            ].map((box) => (
              <div key={box.title} className="bg-bellaria-cream rounded-lg p-8 text-center">
                <div className="text-5xl mb-4">{box.icon}</div>
                <h3 className="bellaria-h3 text-bellaria-dark mb-2">{box.title}</h3>
                <p className="text-gray-600">{box.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="py-20 md:py-28 bg-bellaria-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="bellaria-h2 text-bellaria-dark mb-12 text-center">Button Styles</h2>

          <div className="space-y-12">
            {/* Primary Buttons */}
            <div>
              <h3 className="bellaria-h3 text-bellaria-dark mb-6">Primary Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn-primary">Primary Button</button>
                <button className="px-6 py-2 bg-bellaria-teal text-white rounded-full text-sm font-medium hover:opacity-90">Small</button>
                <button className="px-12 py-4 bg-bellaria-teal text-white rounded-full font-medium hover:opacity-90">Large</button>
              </div>
            </div>

            {/* Secondary Buttons */}
            <div>
              <h3 className="bellaria-h3 text-bellaria-dark mb-6">Secondary Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn-secondary">Secondary Button</button>
                <button className="px-6 py-2 bg-bellaria-pink text-white rounded-full text-sm font-medium hover:opacity-90">Small</button>
                <button className="px-12 py-4 bg-bellaria-pink text-white rounded-full font-medium hover:opacity-90">Large</button>
              </div>
            </div>

            {/* Outline Buttons */}
            <div>
              <h3 className="bellaria-h3 text-bellaria-dark mb-6">Outline Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="btn-outline">Outline Button</button>
                <button className="px-6 py-2 border-2 border-bellaria-teal text-bellaria-teal rounded-full text-sm font-medium hover:bg-bellaria-teal hover:text-white">Small</button>
                <button className="px-12 py-4 border-2 border-bellaria-teal text-bellaria-teal rounded-full font-medium hover:bg-bellaria-teal hover:text-white">Large</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Badges & Labels */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="bellaria-h2 text-bellaria-dark mb-12 text-center">Badges & Labels</h2>

          <div className="flex flex-wrap gap-4 justify-center">
            {['New', 'Featured', 'Best Seller', 'Limited', 'Sale', 'Premium'].map((badge) => (
              <span key={badge} className="px-4 py-2 bg-bellaria-teal text-white rounded-full text-sm font-medium">
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            {['New', 'Featured', 'Best Seller', 'Limited', 'Sale', 'Premium'].map((badge) => (
              <span key={badge} className="px-4 py-2 bg-bellaria-pink text-white rounded-full text-sm font-medium">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-20 md:py-28 bg-bellaria-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="bellaria-h2 text-bellaria-dark mb-12 text-center">Card Styles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bellaria-card overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-bellaria-light-teal to-bellaria-light-pink" />
                <div className="p-6">
                  <h3 className="bellaria-h3 text-bellaria-dark mb-2">Card Title</h3>
                  <p className="text-gray-600 mb-4">
                    This is a card component with an image placeholder and text content.
                  </p>
                  <button className="btn-primary text-sm">Learn More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="bellaria-h2 text-bellaria-dark mb-12 text-center">Tabs & Accordions</h2>

          <div className="max-w-2xl mx-auto space-y-6">
            {/* Accordion 1 */}
            <details className="border-2 border-bellaria-teal rounded-lg">
              <summary className="px-6 py-4 font-semibold text-bellaria-teal cursor-pointer hover:bg-bellaria-cream transition-colors">
                What are your delivery options?
              </summary>
              <div className="px-6 py-4 border-t border-bellaria-teal text-gray-600">
                <p>We offer standard and express delivery options. Orders can be picked up at our bakery or delivered to your location.</p>
              </div>
            </details>

            {/* Accordion 2 */}
            <details className="border-2 border-bellaria-pink rounded-lg">
              <summary className="px-6 py-4 font-semibold text-bellaria-pink cursor-pointer hover:bg-bellaria-light-pink transition-colors">
                Can you customize cakes for special occasions?
              </summary>
              <div className="px-6 py-4 border-t border-bellaria-pink text-gray-600">
                <p>Absolutely! We specialize in custom cake designs. Please contact us at least a week in advance for custom orders.</p>
              </div>
            </details>

            {/* Accordion 3 */}
            <details className="border-2 border-bellaria-teal rounded-lg">
              <summary className="px-6 py-4 font-semibold text-bellaria-teal cursor-pointer hover:bg-bellaria-cream transition-colors">
                Do you have gluten-free or vegan options?
              </summary>
              <div className="px-6 py-4 border-t border-bellaria-teal text-gray-600">
                <p>Yes! We offer gluten-free and vegan alternatives for most of our products. Please inquire about availability.</p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Dividers */}
      <section className="py-20 md:py-28 bg-bellaria-cream scalloped-bottom">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="bellaria-h2 text-bellaria-dark mb-12 text-center">Dividers</h2>

          <div className="space-y-8">
            <div className="text-center">
              <p className="mb-6 text-gray-600">Simple Line Divider</p>
              <div className="h-px bg-gray-300 my-6" />
            </div>

            <div className="text-center">
              <p className="mb-6 text-gray-600">Colored Divider</p>
              <div className="h-1 bg-gradient-to-r from-bellaria-teal via-bellaria-pink to-bellaria-teal my-6" />
            </div>

            <div className="text-center">
              <p className="mb-6 text-gray-600">Dotted Divider</p>
              <div className="border-t-2 border-dashed border-bellaria-teal my-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Progress Bars */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="bellaria-h2 text-bellaria-dark mb-12 text-center">Progress Bars</h2>

          <div className="max-w-2xl mx-auto space-y-8">
            {[
              { label: 'Cupcakes', value: 85 },
              { label: 'Cakes', value: 70 },
              { label: 'Macarons', value: 95 },
              { label: 'Pastries', value: 60 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-bellaria-dark">{item.label}</span>
                  <span className="text-bellaria-teal font-semibold">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-bellaria-teal to-bellaria-pink h-3 rounded-full transition-all duration-500"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="py-20 md:py-28 bg-bellaria-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="bellaria-h2 text-bellaria-dark mb-12 text-center">Typography</h2>

          <div className="max-w-4xl mx-auto space-y-12">
            <div className="bg-white rounded-lg p-8">
              <h1 className="bellaria-h1 text-bellaria-dark mb-2">Heading 1</h1>
              <p className="text-gray-600">font-serif, 3rem, font-bold</p>
            </div>

            <div className="bg-white rounded-lg p-8">
              <h2 className="bellaria-h2 text-bellaria-dark mb-2">Heading 2</h2>
              <p className="text-gray-600">font-serif, 2rem, font-bold</p>
            </div>

            <div className="bg-white rounded-lg p-8">
              <h3 className="bellaria-h3 text-bellaria-dark mb-2">Heading 3</h3>
              <p className="text-gray-600">font-serif, 1.5rem, font-bold</p>
            </div>

            <div className="bg-white rounded-lg p-8">
              <p className="text-lg text-gray-700 mb-2">Large Paragraph (1.125rem)</p>
              <p className="text-gray-600">This is a large paragraph used for introduction and important content sections.</p>
            </div>

            <div className="bg-white rounded-lg p-8">
              <p className="text-base text-gray-700 mb-2">Regular Paragraph (1rem)</p>
              <p className="text-gray-600">This is a regular paragraph used for body text throughout the site.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
