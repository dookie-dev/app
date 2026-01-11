export function GET() {
    return new Response(`User-agent: *
Allow: /
Sitemap: https://dookiees.vercel.app/sitemap.xml`, {
        headers: { 'Content-Type': 'text/plain' },
    })
}
