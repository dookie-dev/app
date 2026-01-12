import { MetadataRoute } from 'next'
import { getMenus } from '@/lib/fetch'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://dookiees.vercel.app'
    const menus = await getMenus()

    const productUrls = menus.map((c) => ({
        url: `${baseUrl}/product/${c.slug}`,
        lastModified: c.created_at,
    }))

    const staticRoutes = [
        '',
        '/menu',
        '/story',
        '/reviews',
        '/faq',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
    }))

    return [...staticRoutes, ...productUrls]
}
