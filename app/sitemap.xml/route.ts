import { getMenus } from "@/lib/fetch";

export async function GET() {
    const baseUrl = "https://dookiees.vercel.app";
    const cookies = await getMenus();

    const productUrls = cookies
        .map((c) => `
  <url>
    <loc>${baseUrl}/product/${c.slug}</loc>
    <lastmod>${c.created_at}</lastmod>
  </url>`)
        .join("");

    const staticRoutes = [
        "",
        "/menu",
        "/story",
        "/reviews",
        "/faq",
        "/contact",
    ]
        .map((route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`)
        .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes}
  ${productUrls}
</urlset>`;

    return new Response(xml, {
        headers: { 'Content-Type': 'application/xml' },
    });
}
