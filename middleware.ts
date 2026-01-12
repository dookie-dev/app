import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) return response

    try {
        const supabase = createServerClient(
            supabaseUrl,
            supabaseKey,
            {
                cookies: {
                    get(name: string) {
                        return request.cookies.get(name)?.value
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        request.cookies.set({ name, value, ...options })
                    },
                    remove(name: string, options: CookieOptions) {
                        request.cookies.set({ name, value: '', ...options })
                    },
                },
            }
        )

        const { data: { user } } = await supabase.auth.getUser()
        const pathname = request.nextUrl.pathname

        if (pathname.startsWith('/admin') && !user) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        if (pathname.startsWith('/login') && user) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }

    } catch (e) {
        // No-op
    }

    return response
}

export const config = {
    matcher: ['/admin/:path*', '/login'],
}
