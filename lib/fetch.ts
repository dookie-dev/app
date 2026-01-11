import { createClient } from "@/lib/supabase/server";
import { Cookie, Review } from "@/types";

// Helper to check if Supabase is configured
const isSupabaseConfigured = () => {
    return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
};

export async function getMenus(): Promise<Cookie[]> {
    if (!isSupabaseConfigured()) return [];

    const supabase = createClient();
    try {
        const { data, error } = await supabase
            .from('menus')
            .select('*, gallery(*)')
            .eq('status', 'available') // Only show available on frontend
            .order('sort_order', { ascending: true });

        if (error || !data) {
            console.error("Error fetching menus:", error);
            return [];
        }

        // Map DB structure to Cookie Type
        return data.map((item: any) => {
            const images = [];

            // 1. Add Main Image
            if (item.image_url) {
                images.push({
                    id: 'main',
                    cookie_id: item.id,
                    image_url: item.image_url,
                    is_main: true,
                    alt: item.name
                });
            }

            // 2. Add Gallery Images
            if (item.gallery && Array.isArray(item.gallery)) {
                // Filter only 'gallery' type if mixed types exist in table, though menu_id usually links specific images
                const galleryImages = item.gallery
                    .filter((g: any) => g.type === 'gallery')
                    .map((g: any) => ({
                        id: g.id,
                        cookie_id: item.id,
                        image_url: g.image_url,
                        is_main: false,
                        alt: g.title || item.name
                    }));
                images.push(...galleryImages);
            }

            return {
                id: item.id,
                slug: item.id, // Using ID as slug for now
                name: item.name,
                description: item.description,
                price: item.price,
                category: item.category,
                rating: 5, // Default for now
                stock: 100, // Default infinite
                is_best_seller: item.is_best_seller,
                created_at: item.created_at,
                images: images,
                tags: item.tags || []
            };
        });
    } catch (e) {
        console.error("Exception fetching menus:", e);
        return [];
    }
}

export async function getFeaturedProducts(): Promise<Cookie[]> {
    const menus = await getMenus();
    return menus.filter(c => c.is_best_seller);
}

export async function getProductBySlug(slug: string): Promise<Cookie | undefined> {
    const menus = await getMenus();
    // Match by "slug" (which is currently ID in mapping) or ID directly partial logic
    return menus.find(c => c.slug === slug || c.id === slug);
}

export async function getGallery(): Promise<{ id: string; image_url: string; type: string }[]> {
    if (!isSupabaseConfigured()) return [];

    const supabase = createClient();
    const { data } = await supabase
        .from('gallery')
        .select('*')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

    return data || [];
}

export async function getReviews(): Promise<Review[]> {
    if (!isSupabaseConfigured()) return [];

    const supabase = createClient();
    const { data } = await supabase
        .from('gallery')
        .select('*')
        .eq('type', 'review')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

    if (!data) return [];

    return data.map((item: any) => ({
        id: item.id,
        cookie_id: "general",
        customer_name: item.customer_name || "Anonymous",
        rating: item.rating || 5,
        comment: item.caption || "",
        created_at: item.created_at
    }));
}

export async function getSiteSettings() {
    if (!isSupabaseConfigured()) return null;

    const supabase = createClient();
    const { data } = await supabase
        .from('site_settings')
        .select('*')
        .single();

    return data;
}
