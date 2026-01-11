import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";

interface FooterProps {
  settings?: any;
}

export default function Footer({ settings }: FooterProps) {
  const footerLinks = {
    shop: [
      { label: "All Cookies", href: "/menu" },
      { label: "Best Sellers", href: "/menu?category=best-seller" },
      { label: "Gift Boxes", href: "/menu?category=gifts" },
      { label: "Check Order Status", href: "/track" },
    ],
    support: [
      { label: "FAQ", href: "/faq" },
      { label: "Shipping & Returns", href: "/shipping" },
      { label: "Contact Us", href: "/contact" },
      { label: "Wholesale", href: "/wholesale" },
    ],
  };

  return (
    <footer className="bg-brand-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-16 px-4 py-8 bg-white/10 rounded-custom-lg backdrop-blur-sm">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-3xl font-bold mb-2">
              Join our Cookie Club
            </h3>
            <p className="text-white/80">
              Get exclusive offers and a sweet surprise on your birthday!
            </p>
          </div>
          <form className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-custom-md border-none text-brand-text w-full md:w-80 outline-none focus:ring-2 focus:ring-brand-secondary"
            />
            <button className="bg-brand-secondary text-brand-text px-6 py-3 rounded-custom-md font-bold hover:bg-brand-secondary/90 transition-colors">
              Join
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/20 pb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="relative w-12 h-12">
                  <Image
                    src="/images/dookie-logo.png"
                    alt="Dookiee.s"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-serif font-bold text-white tracking-tight">
                  {settings?.site_name || "Dookiee.s"}
                </span>
              </Link>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed">
              Handcrafted soft cookies made with premium ingredients and lots of
              love. Perfect for your cozy moments.
            </p>
            <div className="flex gap-4">
              {(settings?.facebook_url || !settings) && (
                <a
                  href={
                    settings?.facebook_url ||
                    "https://www.facebook.com/profile.php?id=61576478708290"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-secondary hover:text-brand-text transition-all"
                >
                  <Facebook size={18} />
                </a>
              )}
              {(settings?.instagram_url || !settings) && (
                <a
                  href={
                    settings?.instagram_url ||
                    "https://www.instagram.com/dookiee.s"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-secondary hover:text-brand-text transition-all"
                >
                  <Instagram size={18} />
                </a>
              )}
              <a
                href={`https://line.me/R/ti/p/${
                  settings?.line_oa || "@531abdxp"
                }?oat_content=url`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-secondary hover:text-brand-text transition-all"
              >
                {/* LINE Icon SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0c4.411 0 8 2.912 8 6.492 0 1.433-.555 2.723-1.515 3.745-.096.102-.355.543-.415.996-.048.362.195 1.488.223 1.627.021.111.059.398-.242.484-.301.087-.93-.162-2.859-1.076-.442.062-.897.095-1.362.095C2.825 12.363.385 10.155.385 6.492.385 2.912 3.974 0 8 0z" />
                </svg>
              </a>
              {(settings?.tiktok_url || !settings) && (
                <a
                  href={
                    settings?.tiktok_url || "https://www.tiktok.com/@dookiee.s"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-secondary hover:text-brand-text transition-all"
                >
                  {/* TikTok Icon SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-brand-secondary">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-brand-secondary">
              Customer Care
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-brand-secondary">
              Visit Us
            </h4>
            <p className="text-white/70 mb-4">
              123 Baker Street,
              <br />
              Sweet Town, ST 12345
            </p>
            <p className="text-white/70 mb-4">Mon - Sun: 9:00 AM - 8:00 PM</p>
            <a
              href={`tel:${settings?.phone || "+6612345678"}`}
              className="text-brand-secondary font-bold text-lg hover:underline"
            >
              {settings?.phone || "+66 12 345 678"}
            </a>
          </div>
        </div>

        <div className="pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-white/50 text-sm">
          <p>
            © 2024 {settings?.site_name || "Dookiee.s"}. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Serivce
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
