import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-brand-cream pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-text mb-4">
            Get in Touch
          </h1>
          <p className="text-brand-muted max-w-2xl mx-auto">
            Have a question about our cookies? Want to place a bulk order? Or
            just want to say hi? We'd love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info Cards */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-custom-lg shadow-soft flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-brand-text mb-1">
                  Our Bakery
                </h3>
                <p className="text-brand-muted">
                  123 Baker Street, Sweet Town
                  <br />
                  Bangkok, Thailand 10110
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-custom-lg shadow-soft flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-secondary/30 text-brand-text rounded-full flex items-center justify-center shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-brand-text mb-1">
                  Call Us
                </h3>
                <p className="text-brand-muted">
                  +66 12 345 678
                  <br />
                  Mon - Fri, 9am - 6pm
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-custom-lg shadow-soft flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-accent/20 text-brand-accent rounded-full flex items-center justify-center shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-brand-text mb-1">
                  Email Us
                </h3>
                <p className="text-brand-muted">
                  hello@softcookiebrand.com
                  <br />
                  orders@softcookiebrand.com
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-custom-lg shadow-soft">
            <h3 className="font-serif text-2xl font-bold text-brand-text mb-6">
              Send us a message
            </h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-brand-muted mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-muted mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    placeholder="081-xxx-xxxx"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-brand-muted mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-brand-muted mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="button"
                className="w-full py-4 bg-brand-primary text-white font-bold rounded-lg shadow-md hover:bg-brand-primary/90 transition-all flex items-center justify-center gap-2"
              >
                <Send size={20} /> Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-12 rounded-custom-lg overflow-hidden shadow-soft h-[300px] bg-gray-200 flex items-center justify-center">
          <p className="text-brand-muted font-bold text-lg uppercase tracking-widest flex items-center gap-2">
            <MapPin /> Google Maps Embed
          </p>
        </div>
      </div>
    </main>
  );
}
