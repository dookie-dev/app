import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { getSiteSettings } from "@/lib/fetch";

export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartDrawer />
      <main className="flex-grow pt-0">{children}</main>
      <Footer settings={settings} />
    </div>
  );
}
